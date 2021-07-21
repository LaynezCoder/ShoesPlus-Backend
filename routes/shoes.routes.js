const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsCollectionById, isExistsSizeById, isExistsCategoryById, isExistsShoe, isExistsBarcode, isExistsShoeById, validateIds, validateQuantity, isExistSizes } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createShoe } = require('../controllers/shoe.controller')

const router = Router();

router.post('/create/:idCat/:idCol', [
    check('sizes', 'This sizes is required').isArray(),
    check('name', 'This name is required').not().isEmpty(),
    check('barcode', 'This needs to be a barcode number!').isNumeric(),
    check('description', 'This description is required').not().isEmpty(),
    check('price', 'This needs to be a price!').isNumeric(),
    check('idCat', 'This id is invalid').isMongoId(),
    check('idCol', 'This id is invalid').isMongoId(),
    check('idCat').custom(isExistsCategoryById),
    check('idCol').custom(isExistsCollectionById),
    check('name').custom(isExistsShoe),
    check('barcode').custom(isExistsBarcode),
    check('sizes').custom(validateIds),
    check('sizes').custom(validateQuantity),
    check('sizes').custom(isExistSizes),
    validateFields,
], createShoe);


module.exports = router;