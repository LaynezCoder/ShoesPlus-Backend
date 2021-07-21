const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
    creation_date: {
        type: Date,
        default: Date.now
    },
    firstname: {
        type: String,
        required: [
            true,
            'The firstname is required'
        ]
    },
    lastname: {
        type: String,
        required: [
            true,
            'The lastname is required'
        ]
    },
    phone: {
        type: Number,
        required: [
            true,
            'Phone is required'
        ]
    },
    nit: {
        type: String,
        required: [
            true,
            'Nit is required'
        ]
    },
    address: {
        type: String,
        required: [
            true,
            'Address is required'
        ]
    },
    reference_address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: [
            true,
            'City is required'
        ]
    },
    region: {
        type: String,
        required: [
            true,
            'Region is required'
        ]
    },
    zip: {
        type: String,
        required: [
            true,
            'Zip is required'
        ]
    },
    express: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: true,
        enum: ['CANCEL', 'ON_HOLD', 'SUCCESS']
    },
    reason: {
        type: String,
        required: false
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'item_detail'
    }]
})

module.exports = model('order', OrderSchema);