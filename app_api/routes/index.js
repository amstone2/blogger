var express = require('express');
const { get } = require('jquery');
var router = express.Router();

var blogController = require('../controllers/blogs'); 
var authController = require('../controllers/authentication');  // Lab 6
var jwt = require('express-jwt'); 
var auth = jwt({   // Lab 6
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});


router.get('/blogs', blogController.blogsList);

router.get('/blogs/:blogid', blogController.blogsReadOne);  

router.post('/blogs', auth, blogController.blogsCreate);

router.put('/blogs/:blogid', auth,  blogController.blogsUpdateOne);

router.delete('/blogs/:blogid', auth, blogController.blogsDeleteOne);

router.post('/register', authController.register);  // Lab 6
router.post('/login', authController.login);  // Lab 6

module.exports = router;



