"use strict";

var mongoose = require('mongoose');

var User = require('../../models/userModel');
var tokenizer = require('./tokenizer');


exports.login = function(req, res,next){

  User.findOne({ email: req.body.email }, function (err, user) {
    if(err) return next(err);
    if(!user) return next('No user found');
    if(!user.verifyPassword(req.body.password)) return next("Incorrect password");

    var signData = {
      userid: user.userid,
      name: user.name,
      email: user.email
    }
    // generate token
    var token = tokenizer.getToken(signData);

    // exclude fields from response
    res.exclude(['data._id','data.__v', 'data.password', 'data.salt']);

    res.status(200).json({status: 200,message: 'login success', data: user,token:token});
  });
}


/*
 * authenticate   Validate the authentication token
 * @param token   req.headers.token
 */
exports.authenticate = function(req,res,next){

  // validate authentication token
  if(!req.headers.token) return next('Authentication token required');
  
  tokenizer.verifyToken(req.headers.token, function(err, decoded) {

    if (err) {
      if(err.name == 'TokenExpiredError') return next('Token expired');
      return next('Invalid token');
    }

    // check if the user is not accesing another user resources
    if(req.params.userid && req.params.userid != decoded.userid)  return next('Unauthorized access');

    req.user = decoded;
    next();
  });
}
