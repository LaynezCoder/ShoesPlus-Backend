const { request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model')

const EXAMPLE_SECRET_KEY = 'Shhhh';

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send({ message: 'There is no token in the request' });
    }

    try {
        const { id } = jwt.verify(token, EXAMPLE_SECRET_KEY);

        const user = await User.findById(id);

        if (!user) {
            return res.status(401).send({ message: 'You dont have permissions' })
        }

        if (!user.status) {
            return res.status(401).send({ message: 'You dont have permissions' })
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid token' });
    }
}

module.exports = {
    validateJWT
}