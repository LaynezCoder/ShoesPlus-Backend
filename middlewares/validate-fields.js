const { validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => msg;

const validateFields = (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0] });
    }

    next();
}

const notFoundValidate = (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(404).json({ message: errors.array()[0] });
    }

    next();
}

module.exports = {
    validateFields,
    notFoundValidate
}