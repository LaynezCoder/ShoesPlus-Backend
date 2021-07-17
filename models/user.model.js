const { Schema, model } = require('mongoose');

const UserSchema = Schema({

})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject()
    return user;
}

module.exports = model('user', UserSchema);