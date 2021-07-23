const { Router } = require('express');
const { check } = require('express-validator');

const { validateItems, validateQuantity } = require('../helpers/validators');

const { validateFields, validateJWT, withRole } = require('../middlewares')

const { createOrder, cancelOrder, deliverOrder, getCompletedOrders, getOnHoldOrders, getCanceledOrders } = require('../controllers/order.controller');

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
 * Check if the order exists and is valid mongodb
 */
router.put('/cancelOrder/:id', [
    validateJWT,
    withRole('USER')
], cancelOrder);

/**
 * Change role with: DELIVERY_MAN role
 * Check if the order exists and is valid mongodb if  
 */
router.put('/deliverOrder/:id', [
    validateJWT,
    withRole('USER')
], deliverOrder);

router.get('/getCompletedOrders', [
    validateJWT,
    withRole('ADMIN')
], getCompletedOrders);

/**
 * Add role: DELIVERY_MAN
 */
router.get('/getOnHoldOrders', [
    validateJWT,
    withRole('ADMIN')
], getOnHoldOrders);

router.get('/getCanceledOrders', [
    validateJWT,
    withRole('ADMIN')
], getCanceledOrders);

module.exports = router;