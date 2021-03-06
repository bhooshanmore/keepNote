"use strict";

var mongoose = require("mongoose");
var User = require("../models/userModel.js");
var dbHelper = require('../utils/dbHelper');
var sequence = dbHelper.sequenceGenerator('user');
var validator = require('../utils/validator');

exports.addUser = function(req,res,next){
	
	if(typeof req.body.email != "string") return next("Valid email address required");

	User.findOne({email: req.body.email.toLowerCase()},function(err, user) {
		if(user) return next("Email already exists");
			// get the next userid
	    sequence.next(function(nextSeq){
				var user = new User({
					userid: nextSeq,
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					create_ts: Date.now()
				});

				user.save(function(err) {
					if (err){
						console.log(err);

						// return the message for validationError
			    	if(err.name == 'ValidationError') return next(err.errors[Object.keys(err.errors)[0]].message);
			    	
			    	return next(err);
					}

					// exclude fields from response
					res.exclude(['data._id','data.__v', 'data.password', 'data.salt']);

			    res.status(200).json({status:200,message:"New user added",data: user});
				});
		});
	});
}

exports.updateUser = function(req,res,next){
	
	User.findOne({userid:req.params.userid},function(err,user){
		if (err) return next(err);
		if(!user) return next("User not found");

		if(user.name)
			user.name = req.body.name;

		if(req.body.password)
			user.password = req.body.password;

		user.last_update_ts = Date.now();

		user.save(function(err){
			if (err){
				console.log(err);
				// return the message for validationError
		    if(err.name == 'ValidationError') return next(err.errors[Object.keys(err.errors)[0]].message);
		    
	    	return next(err);
			}
			// exclude fields from response
			res.exclude(['data._id','data.__v', 'data.password', 'data.salt']);

	    res.status(200).json({status:200,message:"User details updated",data: user});
		});
	});
}

exports.changeProfilePic = function(req,res,next){
	User.findOne({userid:req.params.userid}, '-_id -__v -salt -password',function(err,user){

		if(err) return next(new Error(err));
		if(!user) return next("No user found");
		if(!validator.isUrl(req.body.profile_pic)) return next("Valid image url required");

		user.profile_pic = req.body.profile_pic;
		user.last_update_ts = Date.now();

		user.save(function(err){

			res.status(200).json({status:200, message:"User photo updated", data: user});
		});
	});
}


exports.getUser = function(req,res,next){

	User.findOne({userid:req.params.userid},'-_id -__v -salt -password',function(err, user) {
		if (err) return next(err);
		res.status(200).json({status:200,message:"User found",data:user});
	});
}



exports.deleteUser = function(req,res,next){
	
	User.remove({ userid:req.params.userid },function(err,doc){
		if(err) return next(err);
		if(doc.result.n<1) return next("Delete unsuccessful");
		res.status(200).json({status:200,message:"User deleted"});
	});
}

// search user by name or email address
exports.lookupUser = function(req,res,next){

	var regx =new RegExp(req.query.query,'i')
	var query = {$or: [{full_name: {$regex : regx} }, {email: {$regex : regx} }]};

	User.find(query, 'userid name email', {sort:{name:1}} ,function(err, users) {
		if (err) return next(err);
		res.status(200).json({status:200,message:"Users", data: users});
	});
}