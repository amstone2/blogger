var express = require('express');
const { get } = require('jquery');
var router = express.Router();

var blogController = require('../controllers/blogs');


router.get('/blogs/:blogid', blogController.blogsReadOne);

router.get('/blogs', blogController.blogsList);

router.post('/blogs', blogController.blogsCreate);

router.put('/blogs/:blogid', blogController.blogsUpdateOne);

router.delete('/blogs/:blogid', blogController.blogsDeleteOne);



module.exports = router;



