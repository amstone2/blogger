var express = require('express');
var router = express.Router();

var blogController = require('../controllers/blog');



router.get('/', blogController.index);
router.get('/add', blogController.add);
router.get('/list', blogController.list);
router.get('/edit', blogController.edit);
router.get('/delete', blogController.delete);



module.exports = router;
