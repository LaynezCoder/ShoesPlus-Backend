const { Schema, model } = require('mongoose');

const BrandSchema = Schema({
    name: {
        type: String,
        required: [
            true,
            'The name is required'
        ],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('brand', BrandSchema)