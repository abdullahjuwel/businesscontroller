const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Productunits = require('../../models/productunitModel');

const productUnitCtrl = {
    index: async(req, res) => {
        try {
            const units = await Productunits.find();
            res.json(units);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    store: async(req, res) => {
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const { unitname } = req.body;
            if (unitname == '') return res.status(400).json({ msg: "Unit name is empty!" });
            const unit_name = await Productunits.findOne({ unitname });
            if (unit_name) return res.status(400).json({ msg: "This unit already exists." });

            const newUnit = new Productunits({ unitname });

            await newUnit.save();
            res.json({ msg: "Product unit created successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
}
module.exports = productUnitCtrl;