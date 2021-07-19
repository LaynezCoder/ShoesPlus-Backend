const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsBrand, isExistsBrandById } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createBrand, updateBrand, deleteBrand, getBrands, getBrandById } = require('../controllers/brand.controller')

const router = Router();

router.post('/create', [
    check('name', 'This name is required').not().isEmpty(),
    check('name').custom(isExistsBrand),
    validateFields,
], createBrand);

router.put('/update/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsBrandById),
    check('name', 'This name is required').not().isEmpty(),
    check('name').custom(isExistsBrand),
    validateFields
], updateBrand)

router.delete('/delete/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsBrandById),
    validateFields
], deleteBrand)

router.get('/get', getBrands)

router.get('/getById/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsBrandById),
    validateFields
], getBrandById)


module.exports = router;