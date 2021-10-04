const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product: {
        type: {},
        required: true,
    },
    category: {
        type: {},
        required: true,
    },
    productunit: {
        type: {},
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('products', productSchema)