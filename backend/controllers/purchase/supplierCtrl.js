const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Suppliers = require('../../models/supplierModel');
const SupplierLedger = require('../../models/supplierLedgerModel');

const supplierCtrl = {
    index: async(req, res) => {
        try {
            const suppliers = await Suppliers.find();
            res.json(suppliers);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    store: async(req, res) => {
        try {
            const { supplier } = req.body;
            const isMatch = await Suppliers.findOne({ mobile: supplier.mobile });
            if (isMatch) return res.status(400).json({ msg: "Supplier already exists!" });
            if (supplier.code === '') return res.status(400).json({ msg: "Supplier code is empty!" });
            if (supplier.name === '') return res.status(400).json({ msg: "Supplier name is empty!" });
            if (supplier.address === '') return res.status(400).json({ msg: "Supplier address is empty!" });
            if (supplier.mobile === '') return res.status(400).json({ msg: "Supplier mobile is empty!" });

            const newSupplier = new Suppliers({
                code: supplier.code,
                name: supplier.name,
                institute: supplier.institute,
                address: supplier.address,
                mobile: supplier.mobile,
                previous_due: supplier.previous_due,
                opening_balance: supplier.previous_due
            });
            await newSupplier.save();
            res.json({ msg: "Supplier added successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
    supplierLedger: async(req, res) => {
        const { data } = req.body;
        try {
            const ledgerlist = await SupplierLedger.find({ ledger_date: { $gte: data.fromdate, $lte: data.todate }, "supplierid": data['supplier']['supplierid'] });
            res.json(ledgerlist);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
}
module.exports = supplierCtrl;