module.exports.index = function (req, res) {
  res.render('index', { title: 'Blog Index Page' });
};
module.exports.add = function (req, res) {
  res.render('add', { title: 'Blog Add Page' });
};

module.exports.edit = function (req, res) {
  res.render('edit', { title: 'Edit Page' });
};
module.exports.delete = function (req, res) {
  res.render('delete', { title: 'Blog Delete Page' });
};

module.exports.list = function (req, res) {
  res.render('list', {
    title: 'Blog List',
    pageHeader: {
      title: 'Blog List',
      strapline: 'My blog entries…'
    },
    sidebar: 'empty',
    blogs: [
      {
        blogTitle: 'My first blog entry',
        blogText: 'This seems like a good place to express my thoughts.',
        createdOn: 1549529593,
        _id: '5564b6c11de315e733f173cf'
      },
      {
        blogTitle: 'What is the meaning of life?',
        blogText: 'That is the age-old question, is it not?  Why are we here?',
        createdOn: 1549629593,
        _id: '6564b6c11de315e733f173cf'
      },
      {
        blogTitle: 'I blog, therefore I am!',
        blogText: 'Wow, I seem to be getting very profound in my old age.',
        createdOn: 1549742828,
        _id: '7564b6c11de315e733f173cf'
      }
    ]
  });
};

