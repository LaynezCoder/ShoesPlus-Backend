const { Schema, model } = require('mongoose');

const ItemDetailSchema = Schema({
    shoe: {
        type: Schema.Types.ObjectId,
        ref: 'shoe',
        required: [
            true,
            'Shoe is required'
        ]
    },
    size_detail: {
        type: Schema.Types.ObjectId,
        ref: 'size_detail',
        required: [
            true,
            'The size is required'
        ]
    },
    quantity: {
        type: Number,
        required: [
            true,
            'The quantity is required'
        ]
    }
})

module.exports = model('item_detail', ItemDetailSchema)