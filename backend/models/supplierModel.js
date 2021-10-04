const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    institute: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    previous_due: {
        type: Number,
        default: 0,
        required: false,
    },
    opening_balance: {
        type: Number,
        required: false,
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

module.exports = mongoose.model('suppliers', supplierSchema)