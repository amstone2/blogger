var express = require('express');
var router = express.Router();

var blogController = require('../controllers/blog');

router.get('/', blogController.index);
router.get('/list', blogController.list);

router.get('/add', blogController.add);
router.post('/add', blogController.addPost);

router.get('/edit/:blogid', blogController.edit);
router.post('/edit/:blogid', blogController.editPost);

router.get('/delete/:blogid', blogController.delete);
router.post('/delete/:blogid', blogController.deletePost);



module.exports = router;
