const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customers = require('../../models/customerModel');
const Stock = require('../../models/stockModel');
const Products = require('../../models/productModel');
const SalesEntry = require('../../models/salesentryModel');

const salesEntryCtrl = {
    idwiseCustomerData: async(req, res) => {
        const { customer } = req.body;
        const data = await Customers.findById({ _id: customer.customerid });
        res.json(data);
    },
    idwiseProductData: async(req, res) => {
        const { product } = req.body;
        var productData = {
            purchaserate: 0,
            productunit: '',
            stockqty: 0,
            salerate: 0
        };
        const row = await Products.findById({ _id: product.productid });
        const stockCheck = await Stock.findOne({ productid: product.productid });
        if (stockCheck) {
            productData.stockqty = stockCheck.current_qty;
        }
        productData.purchaserate = row['product']['purchaserate'];
        productData.productunit = row['productunit']['productunit'];
        productData.salerate = row['product']['salerate'];
        res.json(productData);
    },
    salesEntry: async(req, res) => {
        try {
            const { data } = req.body;
            var greaterQty = 0,
                notStock = 0,
                flag = 0;

            for (var i = 0; i < data['cart'].length; i++) {
                const stock = await Stock.findOne({ productid: data['cart'][i].productid });
                if (!stock) {
                    notStock++;
                } else {
                    if (parseInt(data['cart'][i]['qty']) > parseInt(stock.current_qty)) {
                        greaterQty++;
                    } else {
                        flag++;
                    }
                }
            }
            if (notStock == 0 && greaterQty == 0) {
                const sale = new SalesEntry({
                    invoiceno: data.invoiceno,
                    user: data.user,
                    saledate: data.saledate,
                    customer: data.customer,
                    cart: data.cart,
                    subtotal: data.subtotal,
                    vat: data.vat,
                    discount: data.discount,
                    transportcost: data.transportcost,
                    grandtotal: data.grandtotal,
                    paid: data.paid,
                    due: data.due,
                })
                await sale.save();

                for (var j = 0; j < data['cart'].length; j++) {
                    const stock = await Stock.findOne({ productid: data['cart'][j].productid });
                    const sold = parseInt(data['cart'][j].qty) + parseInt(stock.sold);
                    const current_qty = parseInt(stock.current_qty) - parseInt(data['cart'][j].qty);
                    await Stock.findOneAndUpdate({ productid: data['cart'][j].productid }, { sold: sold, current_qty: current_qty });
                }

                return res.json({ msg: 'Sold Successfully!', invoiceNo: data.invoiceno });
            } else if (notStock > 0) {
                return res.status(404).json({ msg: 'Dont Exist the product in Stock!' });
            } else if (greaterQty > 0) {
                return res.status(404).json({ msg: 'Quantity is greater than Stock!' });
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
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
module.exports = salesEntryCtrl;