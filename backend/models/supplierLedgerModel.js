const mongoose = require('mongoose')

const supplierLedgerSchema = new mongoose.Schema({
    ledger_code: {
        type: String
    },
    ledger_date: {
        type: String
    },
    supplierid: {
        type: String
    },
    description: {
        type: String
    },
    bill: {
        type: String
    },
    paid: {
        type: String,
        default: 0
    },
    bill_due: {
        type: String
    },
    returned: {
        type: String,
        default: 0
    },
    received: {
        type: String,
        default: 0
    },
    balance: {
        type: String
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

module.exports = mongoose.model('supplierledger', supplierLedgerSchema)