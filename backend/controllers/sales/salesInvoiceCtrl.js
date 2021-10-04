const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customers = require('../../models/customerModel');
const Stock = require('../../models/stockModel');
const Products = require('../../models/productModel');
const SalesEntry = require('../../models/salesentryModel');

const salesInvoiceCtrl = {
    salesInvoiceData: async(req, res) => {
        const { invoiceNo } = req.body;
        var data = await SalesEntry.findOne({ invoiceno: invoiceNo });
        const previous_due = await Customers.find().where('_id', data['customer'].customerid).select('-_id previous_due');
        const object2 = Object.assign({
            previous_due: previous_due[0].previous_due
        }, { data });
        res.json(object2);
    },
    allSalesCode: async(req, res) => {
        const codes = await SalesEntry.find({}).select('-_id invoiceno');
        const arr = [];
        codes.forEach((code, i) => {
            arr.push(code);
        });
        // console.log(arr)
        res.json(arr);
    }
}
module.exports = salesInvoiceCtrl;