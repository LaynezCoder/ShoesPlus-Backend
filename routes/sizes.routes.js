const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsSize, isExistsSizeById, isExistsSizeDetailById } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createSize, updateSize, deleteSize, getSizes, getSizeById, checkStockOfSize } = require('../controllers/size.controller')

const router = Router();

router.post('/create', [
    validateJWT,
    isAdmin,
    check('name', 'This name is required').not().isEmpty(),
    check('name', 'This needs to be a size number!').isNumeric(),
    check('name').custom(isExistsSize),
    validateFields,
], createSize);

router.put('/update/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsSizeById),
    check('name', 'This needs to be a size number!').isNumeric(),
    check('name').custom(isExistsSize),
    validateFields
], updateSize)

router.delete('/delete/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsSizeById),
    validateFields
], deleteSize)

router.get('/get', [
    validateJWT,
    withRole('ADMIN', 'USER'),
], getSizes)

router.get('/checkStockOfSize/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsSizeDetailById),
    validateFields
], checkStockOfSize);

router.get('/getById/:id', [
    validateJWT,
    withRole('ADMIN', 'USER'),
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsSizeById),
    validateFields
], getSizeById)




module.exports = router;