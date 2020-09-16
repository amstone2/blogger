var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');
var addController = require('../controllers/addController');
var listController = require('../controllers/listController');

router.get('/', indexController.index);
router.get('/add', addController.add);
router.get('/list', listController.list);




module.exports = router;
