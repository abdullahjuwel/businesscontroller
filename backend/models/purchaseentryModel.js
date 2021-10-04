const mongoose = require('mongoose')

const purchaseentrySchema = new mongoose.Schema({
    invoiceno: {
        type: String,
    },
    user: {
        type: {}
    },
    purchasedate: {
        type: String,
    },
    supplier: {
        type: {}
    },
    cart: {
        type: Array,
    },
    subtotal: {
        type: Number,
    },
    vat: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    transportcost: {
        type: Number,
    },
    grandtotal: {
        type: Number,
    },
    paid: {
        type: Number,
    },
    due: {
        type: Number,
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

module.exports = mongoose.model('purchaseentries', purchaseentrySchema)