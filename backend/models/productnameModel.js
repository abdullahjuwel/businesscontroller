const mongoose = require('mongoose')

const productnameSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        default: 1,
        required: false,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('productnames', productnameSchema)