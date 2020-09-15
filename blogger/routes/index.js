var express = require('express');
var router = express.Router();

const blogAddController = require('../controllers/addController.js');
const blogListController = require('../controllers/listController');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
