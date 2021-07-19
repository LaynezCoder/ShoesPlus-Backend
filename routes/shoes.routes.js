const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsCollectionById, isExistsSizeById, isExistsCategoryById, isExistsShoe, isExistsShoeById } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createShoe } = require('../controllers/shoe.controller')

const router = Router();

router.post(':idCA/:idC/:idS/create/', [
    check('name', 'This name is required').not().isEmpty(),
    check('barcode', 'This barcode is required').not().isEmpty(),
    check('barcode', 'This needs to be a barcode number!').not().isNumeric(),
    check('description', 'This description is required').not().isEmpty(),
    check('price', 'This price is required').not().isEmpty(),
    check('price', 'This needs to be a price!').not().isNumeric(),
    check('quantity', 'This quantity is required').not().isEmpty(),
    check('quantity', 'This needs to be number!').not().isNumeric(),
    check('idCA, idC, idS', 'This id is invalid').isMongoId(),
    check('idCA').custom(isExistsCategoryById),
    check('idC').custom(isExistsCollectionById),
    check('idS').custom(isExistsSizeById),
    check('name').custom(isExistsShoe),
    validateFields,
], createShoe);


module.exports = router;