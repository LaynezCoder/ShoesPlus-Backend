const { Router } = require('express');
const { check } = require('express-validator');

const {} = require('../helpers/validators');

const { validateFields, validateJWT, withRole } = require('../middlewares')

const { createOrder, test } = require('../controllers/order.controller');

const router = Router();

router.post('/createOrder', createOrder);

router.get('/test', test);

module.exports = router;