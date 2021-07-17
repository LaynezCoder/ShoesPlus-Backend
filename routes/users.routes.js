const { Router } = require('express');
const { check } = require('express-validator');

const {} = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const router = Router();

module.exports = router;