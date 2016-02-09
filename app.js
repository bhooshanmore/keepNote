"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var colors = require('colors');
var mongoose = require('mongoose');
var bafMiddleware = require('before-and-after');
var config = require('./config');
var apiRoute = require('./routes/apiRoute');


// connect to  Database
mongoose.connect(config.MONGO_URI);
var db = mongoose.connection;
 
db.on('error', function (err) {
  console.log('Mongo connection error. Please check Mongo is running on the host');
  console.log(err);
});
db.once('open', function () {
  console.log('MongoDb connected.');
});

var app = express();

app.enable('trust proxy');
app.disable('x-powered-by');
app.disable('etag');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bafMiddleware);

// Enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With, token, Authorization');
  next();
});

// routes
app.use('/api', apiRoute);

// configure development env
if(app.get('env')==="development"){
  app.set('json spaces', 4);
}

/*****************************
 *
 *
 *     ERROR HANDLERS
 *
 *
 *****************************/



// User-end error handler
// intercept text error provided by next('some error message') // string message at next()
app.use(function(err, req, res, next) {
  if (typeof err === 'string'){
    // if resouce not found
    if(err.toLowerCase().indexOf("not found")>0) // example: return next("User not found");
      res.status(404).json({status:404, error:err});
    else
      res.status(400).json({status:400, error:err}); // example: return next("Invalid email address");
  }else{
    next(err);
  }
});


// Handle invalid url, 404
app.use(function(req, res) {
  res.status(404).json({status:404,error:"Page not found"});
});

// Handle unexpected internal server error
app.use(function(err, req, res, next) {
  console.log( colors.red("Internal Server Error!") );

  if (app.get('env') === 'development') {
    console.log( colors.red("Message:"+err.message) );
    console.log( colors.yellow(err.stack) );
  }

  res.status(500).json({status:500,error:  "An unexpected error occurred !"});
});



module.exports = app;

