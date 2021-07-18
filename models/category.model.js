const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
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
        ]
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('category', CategorySchema)