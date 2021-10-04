const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Customers = require('../../models/customerModel');
const Customers = require('../../models/customerModel');

const customerCtrl = {
    index: async(req, res) => {
        try {
            const customers = await Customers.find();
            res.json(customers);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    store: async(req, res) => {
        try {
            const { area, customer } = req.body;
            const isMatch = await Customers.findOne({ mobile: customer.mobile });
            if (isMatch) return res.status(400).json({ msg: "Customer already exists!" });
            if (customer.cust_code === '') return res.status(400).json({ msg: "Customer code is empty!" });
            if (customer.name === '') return res.status(400).json({ msg: "Customer name is empty!" });
            if (customer.address === '') return res.status(400).json({ msg: "Customer address is empty!" });
            if (customer.mobile === '') return res.status(400).json({ msg: "Customer mobile is empty!" });

            const newCustomer = new Customers({
                area,
                cust_code: customer.cust_code,
                name: customer.name,
                institute: customer.institute,
                address: customer.address,
                mobile: customer.mobile,
                previous_due: customer.previous_due,
                credit_limit: customer.credit_limit
            });
            await newCustomer.save();
            res.json({ msg: "Customer created successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
}
module.exports = customerCtrl;