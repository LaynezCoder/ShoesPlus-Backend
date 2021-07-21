const { Schema, model } = require('mongoose');

const SizeDetailSchema = Schema({
    size: {
        type: Schema.Types.ObjectId,
        ref: 'size',
        required: [
            true,
            'The size is required'
        ]
    },
    color: {
        type: String,
        required: [
            true,
            'The color is required'
        ],
    },
    quantity: {
        type: Number,
        required: [
            true,
            'The quantity is required'
        ],
    }
})
module.exports = model('size_detail', SizeDetailSchema)