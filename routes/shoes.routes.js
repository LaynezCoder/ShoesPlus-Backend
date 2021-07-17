const { Router } = require('express');
const { check } = require('express-validator');

const {} = require('../helpers/validators');

const { validateFields, validateJWT, isAdmin, withRole } = require('../middlewares')

const shoeController = require('../controllers/shoe.controller')

const router = Router();

router.post('/test', shoeController.test);
router.get('/getShoes', shoeController.getShoes);
router.post('/createSize', shoeController.createSize)

module.exports = router;