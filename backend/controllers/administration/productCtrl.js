const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Products = require('../../models/productModel');

const productCtrl = {
    index: async(req, res) => {
        try {
            const products = await Products.find();
            res.json(products);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    store: async(req, res) => {
        try {
            const { product, category, productunit } = req.body;
            if (product.productcode === 0) return res.status(400).json({ msg: "Product code is empty!" });
            if (product.productname === undefined) return res.status(400).json({ msg: "Product name is empty!" });
            if (!category.categoryname) return res.status(400).json({ msg: "Category name is empty!" });
            if (product.salerate === 0) return res.status(400).json({ msg: "Product price is empty!" });
            if (product.wholesalerate === 0) return res.status(400).json({ msg: "Product wholesale price is empty!" });

            const rows = await Products.find({});
            var flag = false;
            rows.map((row, i) => {
                if (product.productid === row['product'].productid) {
                    flag = true;
                    return res.status(400).json({ msg: "Product exists!" });
                }
            })
            if (!flag) {
                const newProduct = new Products({ product, category, productunit });
                await newProduct.save();
                res.json({ msg: "Product created successfully!" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}
module.exports = productCtrl;