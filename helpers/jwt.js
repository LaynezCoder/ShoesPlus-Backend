const jwt = require('jsonwebtoken');

const EXAMPLE_SECRET_KEY = 'Shhhh';

const generateJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id: id };

        jwt.sign(payload, EXAMPLE_SECRET_KEY, { expiresIn: '4h' }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}