const { Router } = require('express');
const { check } = require('express-validator');

const { validateItems, validateQuantity } = require('../helpers/validators');

const { validateFields, validateJWT, withRole } = require('../middlewares')

const { createOrder, cancelOrder } = require('../controllers/order.controller');

const router = Router();

router.post('/createOrder', [
    validateJWT,
    withRole('USER'),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('phone', 'Phone is required').isNumeric(),
    check('nit', 'Nit is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('region', 'Region is required').not().isEmpty(),
    check('zip', 'Zip is required').not().isEmpty(),
    check('items', 'Items is required').isArray(),
    check('items', 'Items is required').isArray().not().isEmpty(),
    check('items').custom(validateQuantity),
    check('items').custom(validateItems),
    validateFields
], createOrder);

/**
 * Change role with: DELIVERY_MAN role
 * If order exits and is mongo id valid
 */
router.put('/cancelOrder/:id', [
    validateJWT,
    withRole('USER')
], cancelOrder);

module.exports = router;