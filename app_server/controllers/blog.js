var request = require('request');
var apiOptions = {
  server: "http://3.237.177.19"  // Change as needed
};

module.exports.index = function (req, res) {
  res.render('index', { title: 'Blog Index Page' });
};


/* GET blogs lists */
module.exports.list = function (req, res) {
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      res.render('list', {
        title: 'Blog List',
        blog: body
      });
    }
  );
};
/* Render the blog list page */
var renderListPage = function (req, res, responseBody) {
  res.render('list', {
    title: 'Blog List',
    blog: responseBody
  });
};

/* Blog Add */
module.exports.add = function (req, res) {
  res.render('add', { title: 'Add Blog' });
};
/* Blog Add Post */
module.exports.addPost = function (req, res) {
  var requestOptions, path, postdata;
  path = '/api/blogs/';

  postdata = {
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText,
    createdOn: req.body.createdOn
  };

  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/list');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Blog Edit */
module.exports.edit = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      renderEditPage(req, res, body);
    }
  );
};
/* Render the blog edit page */
var renderEditPage = function (req, res, responseBody) {
  res.render('edit', {
    title: 'Blog Edit',
    blog: responseBody
  });
};
/* Blog Edit Post */
module.exports.editPost = function (req, res) {
  var requestOptions, path, postdata;
  var id = req.params.blogid;
  path = '/api/blogs/' + id;

  postdata = {
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText
  };

  requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: postdata
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/list');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Blog Delete */
module.exports.delete = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      renderDeletePage(req, res, body);
    }
  );
};
/* Render the blook delete page */
var renderDeletePage = function (req, res, responseBody) {
  res.render('delete', {
    title: 'Blog Delete',
    pageHeader: {
      title: 'Blog Delete'
    },
    blog: responseBody
  });
};
/* Blog Delete Post */
module.exports.deletePost = function (req, res) {
  var requestOptions, path, postdata;
  var id = req.params.blogid;
  path = '/api/blogs/' + id;

  requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      if (response.statusCode === 204) {
        res.redirect('/list');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};




/* Blog Show */
module.exports.show = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      renderShowPage(req, res, body);
    }
  );
};
/* Render the blog show page */
var renderShowPage = function (req, res, responseBody) {
  res.render('show', {
    title: 'Blog show',
    pageHeader: {
      title: 'Blog Show'
    },
    blog: responseBody
  });
};
