var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../../middleware/Auth');

/* GET users listing. */
router.get('/', UserController.findAll);
router.get('/user/:uid', auth, UserController.findById);
router.post('/signup', UserController.create);
router.post('/login', UserController.login);
router.get('/logout', auth, UserController.logout);
module.exports = router;
