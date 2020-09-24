var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
    blogTitle : String,
    blogText : String,
    createdOn : Date
});                



mongoose.model('blogSchema', blogSchema);







