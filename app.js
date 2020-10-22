var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./app_api/models/db');


//var indexRouter = require('./app_server/routes/index');
//var usersRouter = require('./app_server/routes/users');
var routesApi = require('./app_api/routes/index');

var app = express(); 

// view engine setup
//app.set('views', path.join(__dirname, '/app_server/views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//app.use('/angular', express.static(path.join(__dirname, 'app_client')));

app.use('/angular', express.static(path.join(__dirname, 'app_client')));


app.use('/angular', express.static(path.join(__dirname , 'node_modules', 'angular')));
app.use('/angular', express.static(path.join(__dirname , 'node_modules', 'angular-route'))); 
app.use('/angular', express.static(path.join(__dirname , 'node_modules', 'angular-ui-router', 'release'))); 





app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/webfonts', express.static(__dirname + '/public/fonts/webfonts/')); 



//app.use('/', indexRouter); 
app.use('/api', routesApi);


// Added per Lab 5 - Angular
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
