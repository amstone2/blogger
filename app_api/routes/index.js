var express = require('express');
const { get } = require('jquery');
var router = express.Router();

var blogController = require('../controllers/blogs'); 
var authController = require('../controllers/authentication');  // Lab 6
var tttController = require('../controllers/ttt');
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


router.get('/ttt/:player', tttController.tttGetByPlayer);
router.post('/ttt', auth, tttController.tttCreateByPlayers);
router.delete('/ttt/:player', auth, tttController.tttDeleteByPlayer);
router.put('/ttt/:gameId', auth, tttController.tttTakeTurnById);

module.exports = router;



