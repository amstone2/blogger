var express = require('express');
var router = express.Router();

const addController = require('../controllers/addController.js');
const listController = require('../controllers/listController');


router.get('/', addController.add);
router.get('/', listController.list);


/* GET home page. */


module.exports = router;
