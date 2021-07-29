const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsCollection, isExistsCollectionById, isExistsBrandById } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { createCollection, updateCollection, deleteCollection, getCollections, getCollectionById } = require('../controllers/collection.controller')

const router = Router();

router.post('/create/:id', [
    validateJWT,
    isAdmin,
    check('name', 'This name is required').not().isEmpty(),
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsBrandById),
    check('name').custom(isExistsCollection),
    validateFields,
], createCollection);

router.put('/update/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsCollectionById),
    check('name', 'This name is required').not().isEmpty(),
    validateFields
], updateCollection)

router.delete('/delete/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsCollectionById),
    validateFields
], deleteCollection)

router.get('/get', getCollections);

router.get('/getById/:id', [
    validateJWT,
    withRole('ADMIN', 'USER'),
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsCollectionById),
    validateFields
], getCollectionById)


module.exports = router;