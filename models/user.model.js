const { Schema, model } = require('mongoose');

const UserSchema = Schema({
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
    username: {
        type: String,
        required: [
            true,
            'The username is required'
        ]
    },
    password: {
        type: String,
        required: [
            true,
            'The password is required'
        ]
    },
    email: {
        type: String,
        required: [
            true,
            'The email is required'
        ]
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: [
            true,
            'The role is  required'
        ]
    },
    status: {
        type: Boolean,
        default: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    buyout: [{
        type: Schema.Types.ObjectId,
        ref: 'brand'
    }]
})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject()
    return user;
}

module.exports = model('user', UserSchema);