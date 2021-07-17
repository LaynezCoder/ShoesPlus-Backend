const { Schema, model } = require('mongoose');

const CollectionSchema = Schema({
    name: {
        type: Number,
        required: [
            true,
            'The name is required'
        ],
        unique: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand',
        required: [
            true,
            'The brand is required'
        ]
    }
})

module.exports = model('collection_shoe', CollectionSchema)