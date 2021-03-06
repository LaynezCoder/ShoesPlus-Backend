const { Schema, model } = require('mongoose');

const ShoeSchema = Schema({
    barcode: {
        type: String,
        required: [
            true,
            'The barcode is required'
        ],
        unique: true
    },
    name: {
        type: String,
        required: [
            true,
            'The name is required'
        ],
        unique: true
    },
    description: {
        type: String,
        required: [
            true,
            'The description is required'
        ],
    },
    price: {
        type: Number,
        required: [
            true,
            'The price is required'
        ]
    },
    sale: {
        type: Boolean,
        required: false
    },
    new_price: {
        type: Number,
        required: false
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true,
    },
    images: [String],
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand',
        required: [
            true,
            'The brand is required'
        ]
    },
    collection_shoe: {
        type: Schema.Types.ObjectId,
        ref: 'collection_shoe',
        required: [
            true,
            'The collection is required'
        ]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [
            true,
            'The category is required'
        ]
    },
    sizes: [{
        type: Schema.Types.ObjectId,
        ref: 'size_detail',
        required: [
            true,
            'The size_detail is required'
        ]
    }]
})

module.exports = model('shoe', ShoeSchema)