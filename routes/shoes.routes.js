const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsCollectionById, isExistsSizeById, isExistsCategoryById, isExistsShoe, isExistsBarcode, isExistsShoeById, validateIds, validateQuantity, isExistSizes, validateManyIds } = require('../helpers/validators');

const { validateFields, notFoundValidate, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createShoe, updateShoe, deleteShoe, getShoes, getSaleShoes, getShoesByReference, getShoeById, deleteSizes, sale, updateImageShoe, searchShoes } = require('../controllers/shoe.controller')

const router = Router();

router.post('/create/:idCat/:idCol', [
    validateJWT,
    isAdmin,
    check('sizes', 'This sizes is required').isArray(),
    check('name', 'This name is required').not().isEmpty(),
    check('barcode', 'This needs to be a barcode number!').not().isEmpty(),
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
    check('barcode', 'This needs to be a barcode number!').not().isEmpty(),
    check('description', 'This description is required').not().isEmpty(),
    check('price', 'This needs to be a price!').isNumeric(),
    validateFields
], updateShoe)

router.delete('/delete/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    validateFields
], deleteShoe)

router.get('/getAll', getShoes);

router.get('/getSale', getSaleShoes);

router.get('/search/:value', searchShoes);

router.get('/getShoesByReference/:id', [
    check('id', 'This id is invalid').isMongoId(),
    notFoundValidate
], getShoesByReference);

router.get('/getById/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    notFoundValidate
], getShoeById)

router.delete('/deleteSizes/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    check('sizes').custom(validateManyIds),
    validateFields
], deleteSizes)

router.put('/sale/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    check('new_price', 'The new price is required!').isNumeric(),
    validateFields
], sale)

router.put('/saveImages/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsShoeById),
    check('images', 'The images is required').isArray(),
    check('images', 'The images is required').isArray().not().isEmpty(),
    validateFields,
], updateImageShoe)

module.exports = router;