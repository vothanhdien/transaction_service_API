var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//mongo
var mongoose = require("mongoose");

var index = require('./routes/index');
var users = require('./routes/users');
var accountAPI = require('./routes/api/account');
var transactionAPI = require('./routes/api/transaction');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//connect mongoose
mongoose.connect("mongodb://dienvt:dien_123456@cluster0-shard-00-00-ep97f.mongodb.net:27017,cluster0-shard-00-01-ep97f.mongodb.net:27017,cluster0-shard-00-02-ep97f.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",{useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api/account',accountAPI);
app.use('/api/transaction',transactionAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
