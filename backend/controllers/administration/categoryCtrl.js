const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Categories = require('../../models/categoryModel');

const categoryCtrl = {
    index: async(req, res) => {
        try {
            const categories = await Categories.find();
            res.json(categories);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    store: async(req, res) => {
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const { categoryname } = req.body;
            if (categoryname == '') return res.status(400).json({ msg: "Category name is empty!" });
            const category = await Categories.findOne({ categoryname });
            if (category) return res.status(400).json({ msg: "This category already exists." });

            const newCategory = new Categories({ categoryname });

            await newCategory.save();
            res.json({ msg: "Category created successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
}
module.exports = categoryCtrl;