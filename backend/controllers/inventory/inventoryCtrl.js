const Users = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Suppliers = require('../../models/supplierModel');
const Products = require('../../models/productModel');
const Stock = require('../../models/stockModel');

const inventoryCtrl = {
    productStock: async(req, res) => {
        const { data } = req.body;
        var stocklist;
        try {
            switch (data['stocktype']['typeId']) {
                case 'T':
                    stocklist = await Stock.find({});
                    res.json(stocklist);
                    break;
                case 'P':
                    stocklist = await Stock.find({ productid: data['product']['productid'] });
                    res.json(stocklist);
                    break;
                default:
                    console.log('its default');
                    break;
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}
module.exports = inventoryCtrl;