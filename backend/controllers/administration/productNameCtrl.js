const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ProductName = require('../../models/productnameModel');

const productNameCtrl = {
    index: async(req, res) => {
        try {
            const productnames = await ProductName.find();
            res.json(productnames);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    store: async(req, res) => {
        try {
            const { productname } = req.body;
            if (productname == '') return res.status(400).json({ msg: "Product name is empty!" });
            const product_name = await ProductName.findOne({ productname });
            if (product_name) return res.status(400).json({ msg: "This product already exists." });

            const newProductName = new ProductName({ productname });

            await newProductName.save();
            res.json({ msg: "Product name created successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
}
module.exports = productNameCtrl;