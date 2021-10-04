const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    cust_code: {
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
    area: {
        type: {},
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    previous_due: {
        type: String,
        default: 0
    },
    credit_limit: {
        type: Number,
        required: false,
    },
    cust_type: {
        type: String,
        default: 1 // 1 means retail customer, 2 means wholesale customer
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

module.exports = mongoose.model('customers', customerSchema)