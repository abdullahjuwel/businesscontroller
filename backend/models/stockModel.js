const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    stock_code: {
        type: String,
    },
    productid: {
        type: String,
    },
    prod_name: {
        type: String,
    },
    prod_category: {
        type: String,
    },
    purchased: {
        type: String,
    },
    unit: {
        type: String,
    },
    p_return: {
        type: String,
    },
    production: {
        type: String,
    },
    damaged: {
        type: String,
    },
    sold: {
        type: String,
    },
    s_return: {
        type: String,
    },
    transferred: {
        type: String,
    },
    received: {
        type: String,
    },
    avg_rate: {
        type: String,
    },
    current_qty: {
        type: String,
    },
    stock_value: {
        type: String,
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

module.exports = mongoose.model('stocks', stockSchema)