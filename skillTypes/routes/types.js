var express = require('express');
var router = express.Router();
const TypeController = require('../controllers/TypeController');

/* GET users listing. */
router.get('/', TypeController.findAll);
router.post('/create', TypeController.create);
module.exports = router;
