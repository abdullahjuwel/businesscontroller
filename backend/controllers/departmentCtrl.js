const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const departmentCtrl = {
    index: async(req, res) => {
        const users = await Users.find({}).select('-password');
        // const users = await Users.findById({ _id: '607af22091829754d8f49490' });
        res.json({ users });
    },
}
module.exports = departmentCtrl;