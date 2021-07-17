const { Schema, model } = require('mongoose');

const ShoeSchema = Schema({
    barcode: {
        type: Number,
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
    images: [String],
    colors: [String],
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
    sizes: [
        {
            size: {
                type: Schema.Types.ObjectId,
                require: true,
                ref: 'size'
            },
            quantity: {
                type: Number,
                require: true,
            }
        }
    ]
})

module.exports = model('shoe', ShoeSchema)