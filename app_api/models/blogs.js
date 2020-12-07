var mongoose = require('mongoose');
var dateNow = new Date().toLocaleString();
var blogSchema = new mongoose.Schema({
    blogTitle : String,
    blogText : String,
    blogName : String,
    blogEmail : String,
    createdOn : {
        type: String,
        "default": dateNow
    } 
});
mongoose.model('Blog', blogSchema);
