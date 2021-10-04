const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Suppliers = require('../../models/supplierModel');
const Products = require('../../models/productModel');
const PurchaseEntry = require('../../models/purchaseentryModel');
const Stock = require('../../models/stockModel');
const SupplierLedger = require('../../models/supplierLedgerModel');

const purchaseEntryCtrl = {
    idwiseSupplierData: async(req, res) => {
        const { supplier } = req.body;
        const data = await Suppliers.findById({ _id: supplier.supplierid });
        res.json(data);
    },
    idwiseProductData: async(req, res) => {
        const { product } = req.body;

        const row = await Products.findById({ _id: product.productid });
        res.json({ purchaserate: row['product'].purchaserate, unit: row['productunit'].productunit });
    },
    purchaseEntry: async(req, res) => {
        const { data } = req.body;
        if (data.invoiceno === '') return res.status(404).json({ msg: 'Invoice no is missing!' });
        if (data.user === null) return res.status(404).json({ msg: 'User is missing!' });
        if (data.supplier.mobile === '') return res.status(404).json({ msg: 'Supplier is missing!' });
        if (data.purchasedate === '') return res.status(404).json({ msg: 'Purchase Date is missing!' });
        const currentdue = parseFloat(data.currentdue) + parseFloat(data.due);
        await Suppliers.findByIdAndUpdate({ _id: data.supplier.supplierid }, { previous_due: currentdue });

        const ledger = new SupplierLedger({
            ledger_code: 'LED-3214',
            ledger_date: data.purchasedate,
            supplierid: data.supplier.supplierid,
            description: 'Purchased - ' + data.invoiceno + ' - ' + 'Cash',
            bill: data.grandtotal,
            paid: data.paid,
            bill_due: data.due,
            balance: currentdue,
        })
        await ledger.save();


        const p = new PurchaseEntry({
            invoiceno: data.invoiceno,
            user: data.user,
            purchasedate: data.purchasedate,
            supplier: data.supplier,
            cart: data.cart,
            subtotal: data.subtotal,
            vat: data.vat,
            discount: data.discount,
            transportcost: data.transportcost,
            grandtotal: data.grandtotal,
            paid: data.paid,
            due: data.due,
        })
        await p.save();

        data['cart'].map(async(cart, i) => {
            const stock = await Stock.findOne({ productid: cart.productid });
            if (stock == null) {
                const stock_in = new Stock({
                    stock_code: 1234,
                    productid: cart.productid,
                    prod_name: cart.prod_name,
                    prod_category: '',
                    purchased: cart.qty,
                    unit: cart.unit,
                    p_return: 0,
                    production: 0,
                    damaged: 0,
                    sold: 0,
                    s_return: 0,
                    transferred: 0,
                    received: 0,
                    avg_rate: 0,
                    current_qty: cart.qty,
                    stock_value: 0
                })
                await stock_in.save();
            } else if (stock) {
                const purchased = parseInt(cart.qty) + parseInt(stock.purchased);
                const current_qty = parseInt(cart.qty) + parseInt(stock.purchased) + parseInt(stock.production) + parseInt(stock.s_return) + parseInt(stock.received) - parseInt(stock.p_return) - parseInt(stock.damaged) - parseInt(stock.sold) - parseInt(stock.transferred);
                await Stock.findOneAndUpdate({ productid: cart.productid }, { purchased: purchased, current_qty: current_qty });
            }
        });

        res.json({ msg: 'Purchased Successfully!' });
    },
    purchaseList: async(req, res) => {
        const { data } = req.body;
        var purchaselist;
        try {
            switch (data['searchtype']['typeId']) {
                case 'A':
                    purchaselist = await PurchaseEntry.find({ purchasedate: { $gte: data.fromdate, $lte: data.todate } });
                    res.json(purchaselist);
                    break;
                case 'S':
                    purchaselist = await PurchaseEntry.find({ purchasedate: { $gte: data.fromdate, $lte: data.todate }, "supplier.supplierid": data['supplier']['supplierid'] });
                    res.json(purchaselist);
                    break;
                case 'P':
                    purchaselist = await PurchaseEntry.find({ purchasedate: { $gte: data.fromdate, $lte: data.todate } });
                    res.json(purchaselist);
                    break;
                case 'U':
                    purchaselist = await PurchaseEntry.find({ purchasedate: { $gte: data.fromdate, $lte: data.todate }, "user.userid": data['user']['userid'] });
                    res.json(purchaselist);
                    break;
                default:
                    console.log('its default');
                    break;
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}
module.exports = purchaseEntryCtrl;