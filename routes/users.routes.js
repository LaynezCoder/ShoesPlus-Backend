const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsUsername, isExistsUserById } = require('../helpers/validators');

const { validateFields, validateJWT, withRole } = require('../middlewares')

const { signUp, login, updateProfile, deleteProfile, infoProfile, deleteUser, updateUser, createDeliveryMan, renewToken } = require('../controllers/user.controller');

const router = Router();

router.post('/signUp', [
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be greater than 6 characters').isLength({ min: 6 }),
    check('email', 'Email is required').isEmail(),
    check('username').custom(isExistsUsername),
    validateFields
], signUp);

router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post('/createDeliveryMan', [
    validateJWT,
    withRole('ADMIN'),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be greater than 6 characters').isLength({ min: 6 }),
    check('email', 'Email is required').isEmail(),
    check('username').custom(isExistsUsername),
    validateFields
], createDeliveryMan)

router.put('/updateProfile', [
    validateJWT,
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be greater than 6 characters').isLength({ min: 6 }),
    check('email', 'Email is required').isEmail(),
    validateFields
], updateProfile);

router.delete('/deleteProfile', [
    validateJWT,
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], deleteProfile);

router.get('/profile', validateJWT, infoProfile);

router.put('/update/:id', [
    validateJWT,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsUserById),
    check('role', 'Role is required').not().isEmpty(),
    withRole('ADMIN'),
    validateFields
], updateUser);

router.delete('/delete/:id', [
    validateJWT,
    check('id', 'This id is invalid').isMongoId(),
    check('id').custom(isExistsUserById),
    withRole('ADMIN'),
    validateFields
], deleteUser);

router.get('/renewToken', validateJWT, renewToken);


module.exports = router;