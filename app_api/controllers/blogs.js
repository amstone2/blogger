var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
//mongoose.set('useFindAndModify', false);

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST a new blog */
module.exports.blogsCreate = function (req, res) {
  console.log(req.body);
  Blog.create({
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText,
    createdOn: req.body.createdOn,
    blogName: req.body.blogName,
    blogEmail: req.body.blogEmail

  }, function (err, blog) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(blog);
      sendJSONresponse(res, 201, blog);
    }
  });
};

/* GET a blog by the id */
module.exports.blogsReadOne = function (req, res) {
  console.log('Finding blog details', req.params);
  if (req.params && req.params.blogid) {
    Blog
      .findById(req.params.blogid)
      .exec(function (err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};

/* GET a list of all blogs */
module.exports.blogsList = function (req, res) {
  console.log('Getting blogs list');
  Blog
    .find()
    .exec(function (err, results) {
      if (!results) {
        sendJSONresponse(res, 404, {
          "message": "no blogs found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(results);
      sendJSONresponse(res, 200, buildBlogList(req, res, results));
    });
};
var buildBlogList = function (req, res, results) {
  var blogs = [];
  results.forEach(function (obj) {
    blogs.push({
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      createdOn: obj.createdOn,
      blogName: obj.blogName,
      _id: obj._id
    });
  });
  return blogs;
};

/* Update one blog entry using PUT*/
module.exports.blogsUpdateOne = function (req, res) {
  console.log("Updating a blog entry with id of " + req.params.blogid);
  console.log(req.body);
    Blog
      .findOneAndUpdate(
        { _id: req.params.blogid },
        { $set: { "blogTitle": req.body.blogTitle, "blogText": req.body.blogText } },
        function (err, response) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            sendJSONresponse(res, 201, response);
          }
        }
      );
};

/* Delete one Book using DELETE*/
module.exports.blogsDeleteOne = function (req, res) {
  console.log("Deleting blog entry with id of " + req.params.blogid);
  console.log(req.body);
  Blog
    .findByIdAndRemove(req.params.blogid)
    .exec(
      function (err, response) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 204, null);
        }
      }
    );
};
