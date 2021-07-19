const { response } = require('express');

const isAdmin = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).send({ message: 'There is no token in the request' });
    }

    const { role, username } = req.user;

    if (role !== 'ADMIN') {
        return res.status(401).send({ message: `${username}, you dont have permissions for this route` })
    }

    next();
}

const withRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).send({ message: 'There is no token in the request' });
        }

        const { role, username } = req.user;

        if (!roles.includes(role)) {
            return res.status(401).send({ message: `${username}, you dont have permissions for this route` })
        }

        next();
    }
}

module.exports = {
    isAdmin,
    withRole
}