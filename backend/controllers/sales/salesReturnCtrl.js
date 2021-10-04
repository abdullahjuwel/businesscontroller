const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customers = require('../../models/customerModel');
const Products = require('../../models/productModel');
const SalesEntry = require('../../models/salesentryModel');
const Stock = require('../../models/stockModel');
const CustomerLedger = require('../../models/customerLedgerModel');

const salesReturnCtrl = {
    customerwiseSalesCode: async(req, res) => {
        const { customer } = req.body;
        var codes = [],
            flag = false;
        const rows = await SalesEntry.find({});
        rows.map((row, index) => {
            if (customer.customerid === row['customer']['customerid']) {
                codes.push(row['invoiceno']);
                flag = true;
            }
        })
        if (flag) {
            res.json(codes);
        }
    },
    invoicenowiseSalesData: async(req, res) => {
        try {
            const { code } = req.body;
            const row = await SalesEntry.find({ invoiceno: code });
            res.json(row)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    salesReturn: async(req, res) => {
        const { data } = req.body;
        // const row = await PurchaseEntry.findOne({ invoiceno: data.invoiceno });
        const stored_cart = await SalesEntry.findOne({ invoiceno: data.invoiceno });
        var temp = [],
            flag = false;
        var rest_qty;
        var returnqty;
        var s_return; // for stock management
        var returnamount;

        for (var i = 0; i < data.cart.length; i++) {
            if (data.cart[i].productid === stored_cart.cart[i].productid) {
                const stock = await Stock.findOne({ productid: stored_cart.cart[i].productid }); // for stock management
                if (data.cart[i]['returnqty'] == 0) {
                    returnqty = stored_cart.cart[i]['returnqty'];
                    rest_qty = stored_cart.cart[i]['rest_qty'];
                    s_return = stock['s_return']; // for stock management
                } else {
                    returnqty = parseInt(stored_cart.cart[i]['returnqty']) + parseInt(data.cart[i]['returnqty']);
                    rest_qty = parseInt(stored_cart.cart[i]['qty']) - parseInt(returnqty);
                    s_return = parseInt(data.cart[i]['returnqty']) + parseInt(stock.s_return); // for stock management

                    // For Customer Ledger
                    var customer = await Customers.findById({ _id: data.customer.customerid });
                    var balance = parseFloat(customer['previous_due']) - parseFloat(stored_cart.cart[i]['sale_rate'] * returnqty);
                    await Customers.findByIdAndUpdate({ _id: data.customer.customerid }, { previous_due: balance });
                    const ledger = new CustomerLedger({
                        ledger_code: 'LED-3214',
                        ledger_date: data.returndate,
                        customerid: data.customer.customerid,
                        description: 'Sales Returned - ' + data.invoiceno,
                        bill: 0,
                        paid: 0,
                        bill_due: 0,
                        returned: stored_cart.cart[i]['sale_rate'] * returnqty,
                        received: 0,
                        balance: balance,
                    })
                    await ledger.save();
                }
                returnamount = stored_cart.cart[i]['sale_rate'] * returnqty;

                const current_qty = parseInt(stock.current_qty) + parseInt(data.cart[i]['returnqty']); // for stock management

                await Stock.findOneAndUpdate({ productid: stored_cart.cart[i].productid }, { s_return: s_return, current_qty: current_qty }); // for stock management

                var object = {
                    productid: stored_cart.cart[i]['productid'],
                    prod_name: stored_cart.cart[i]['prod_name'],
                    sale_rate: stored_cart.cart[i]['sale_rate'],
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
        await SalesEntry.findOneAndUpdate({ invoiceno: data.invoiceno }, { cart: temp });
        res.json({ msg: 'Sales Returned Successfully!' });
    },
}
module.exports = salesReturnCtrl;