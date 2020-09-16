module.exports.index = function(req, res){
    res.render('index', { title: 'Blog Index Page' }); 
  };
  module.exports.add = function(req, res){
    res.render('add', { title: 'Blog Add Page' }); 
  };
  module.exports.list = function(req, res){
    res.render('list', { title: 'Blog List Page' }); 
  };
  
  