const mongoose = require('mongoose')

const productunitSchema = new mongoose.Schema({
    unitname: {
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

module.exports = mongoose.model('Productunits', productunitSchema)