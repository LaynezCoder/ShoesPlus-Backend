const { Router } = require('express');
const { check } = require('express-validator');

const { isExistsUsername } = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const { signUp, login, updateProfile, deleteProfile } = require('../controllers/user.controller');

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

module.exports = router;