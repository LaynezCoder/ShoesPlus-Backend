const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsSize, isExistsSizeById } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createSize, updateSize, deleteSize, getSizes, getSizeById } = require('../controllers/size.controller')

const router = Router();

router.post('/create', [
    check('name', 'This name is required').not().isEmpty(),
    check('name', 'This needs to be a size number!').not().isNumeric(),
    check('name').custom(isExistsSize),
    validateFields,
], createSize);

router.put('/update/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsSizeById),
    check('name', 'This name is required').not().isEmpty(),
    check('name', 'This needs to be a size number!').not().isNumeric(),
    check('name').custom(isExistsSize),
    validateFields
], updateSize)

router.delete('/delete/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsSizeById),
    validateFields
], deleteSize)

router.get('/get', getSizes)

router.get('/getById/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsSizeById),
    validateFields
], getSizeById)




module.exports = router;