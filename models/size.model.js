const { Schema, model } = require('mongoose');

const SizeSchema = Schema({
    name: {
        type: Number,
        required: [
            true,
            'The name is required'
        ],
        unique: true
    }
})

module.exports = model('size', SizeSchema)