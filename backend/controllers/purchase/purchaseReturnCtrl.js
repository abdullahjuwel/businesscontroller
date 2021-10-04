const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Suppliers = require('../../models/supplierModel');
const Products = require('../../models/productModel');
const PurchaseEntry = require('../../models/purchaseentryModel');
const Stock = require('../../models/stockModel');
const SupplierLedger = require('../../models/supplierLedgerModel');

const purchaseReturnCtrl = {
    supplierwisePurchaseCode: async(req, res) => {
        const { supplier } = req.body;
        var codes = [],
            flag = false;
        const rows = await PurchaseEntry.find({});
        rows.map((row, index) => {
            if (supplier.supplierid === row['supplier']['supplierid']) {
                codes.push(row['invoiceno']);
                flag = true;
            }
        })
        if (flag) {
            res.json(codes);
        }
    },
    invoicenowisePurchaseData: async(req, res) => {
        try {
            const { code } = req.body;
            const row = await PurchaseEntry.find({ invoiceno: code });
            res.json(row)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    purchaseReturn: async(req, res) => {
        const { data } = req.body;
        // const row = await PurchaseEntry.findOne({ invoiceno: data.invoiceno });
        const stored_cart = await PurchaseEntry.findOne({ invoiceno: data.invoiceno });
        var temp = [],
            flag = false;
        var rest_qty;
        var returnqty;
        var p_return; // for stock management
        var returnamount;

        for (var i = 0; i < data.cart.length; i++) {
            if (data.cart[i].productid === stored_cart.cart[i].productid) {
                const stock = await Stock.findOne({ productid: stored_cart.cart[i].productid }); // for stock management
                if (data.cart[i]['returnqty'] == 0) {
                    returnqty = stored_cart.cart[i]['returnqty'];
                    rest_qty = stored_cart.cart[i]['rest_qty'];
                    p_return = stock['p_return']; // for stock management
                } else {
                    returnqty = parseInt(stored_cart.cart[i]['returnqty']) + parseInt(data.cart[i]['returnqty']);
                    rest_qty = parseInt(stored_cart.cart[i]['qty']) - parseInt(returnqty);
                    p_return = parseInt(data.cart[i]['returnqty']) + parseInt(stock.p_return); // for stock management

                    // For Supplier Ledger
                    var supplier = await Suppliers.findById({ _id: data.supplier.supplierid });
                    var balance = parseFloat(supplier['previous_due']) - parseFloat(stored_cart.cart[i]['purchase_rate'] * returnqty);
                    await Suppliers.findByIdAndUpdate({ _id: data.supplier.supplierid }, { previous_due: balance });
                    const ledger = new SupplierLedger({
                        ledger_code: 'LED-3214',
                        ledger_date: data.returndate,
                        supplierid: data.supplier.supplierid,
                        description: 'Purchased Returned - ' + data.invoiceno,
                        bill: 0,
                        paid: 0,
                        bill_due: 0,
                        returned: stored_cart.cart[i]['purchase_rate'] * returnqty,
                        received: 0,
                        balance: balance,
                    })
                    await ledger.save();
                }
                returnamount = stored_cart.cart[i]['purchase_rate'] * returnqty;

                const current_qty = parseInt(stock.purchased) - parseInt(p_return) + parseInt(stock.production) + parseInt(stock.s_return) + parseInt(stock.received) - parseInt(stock.damaged) - parseInt(stock.sold) - parseInt(stock.transferred); // for stock management

                await Stock.findOneAndUpdate({ productid: stored_cart.cart[i].productid }, { p_return: p_return, current_qty: current_qty }); // for stock management

                var object = {
                    productid: stored_cart.cart[i]['productid'],
                    prod_name: stored_cart.cart[i]['prod_name'],
                    purchase_rate: stored_cart.cart[i]['purchase_rate'],
                    unit: stored_cart.cart[i]['unit'],
                    qty: stored_cart.cart[i]['qty'],
                    rest_qty: rest_qty,
                    returnqty: returnqty,
                    price: stored_cart.cart[i]['price'],
                    returnamount: returnamount,
                };
                temp.push(object);
            }
        }
        await PurchaseEntry.findOneAndUpdate({ invoiceno: data.invoiceno }, { cart: temp });
        res.json({ msg: 'Purchase Returned Successfully!' });
    },
}
module.exports = purchaseReturnCtrl;