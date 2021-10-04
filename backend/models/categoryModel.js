const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryname: {
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

module.exports = mongoose.model('Categories', categorySchema)