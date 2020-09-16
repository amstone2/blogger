var express = require('express');
var router = express.Router();

var blogController = require('../controllers/blog');



router.get('/', blogController.index);
router.get('/add', blogController.add);
router.get('/list', blogController.list);



module.exports = router;
