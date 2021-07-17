const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsCategory, isExistsCategoryById } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require('../controllers/category.controller')

const router = Router();

router.post('/create', [
    check('name', 'This name is required').not().isEmpty(),
    check('description', 'This description is required').not().isEmpty(),
    check('name').custom(isExistsCategory),
    validateFields,
], createCategory);

router.put('/update/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsCategoryById),
    check('name', 'This name is required').not().isEmpty(),
    check('description', 'This description is required').not().isEmpty(),
    check('name').custom(isExistsCategory),
    validateFields
], updateCategory)

router.delete('/delete/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsCategoryById),
    validateFields
], deleteCategory)

router.get('/get', getCategories)

router.get('/getById/:id', [
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsCategoryById),
    validateFields
], getCategoryById)

module.exports = router;