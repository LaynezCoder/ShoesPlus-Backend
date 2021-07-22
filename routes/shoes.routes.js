const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsCollectionById, isExistsSizeById, isExistsCategoryById, isExistsShoe, isExistsBarcode, isExistsShoeById, validateIds, validateQuantity, isExistSizes } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createShoe, updateShoe, deleteShoe, getShoes, getShoeById } = require('../controllers/shoe.controller')

const router = Router();

router.post('/create/:idCat/:idCol', [
    validateJWT,
    isAdmin,
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

router.put('/update/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    check('name', 'This name is required').not().isEmpty(),
    check('barcode', 'This needs to be a barcode number!').isNumeric(),
    check('description', 'This description is required').not().isEmpty(),
    check('price', 'This needs to be a price!').isNumeric(),
    check('name').custom(isExistsShoe),
    check('barcode').custom(isExistsBarcode),
    validateFields
], updateShoe)

router.delete('/delete/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    validateFields
], deleteShoe)

router.get('/get', getShoes)

router.get('/getById/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    validateFields
], getShoeById)






module.exports = router;