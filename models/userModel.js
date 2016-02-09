"use strict";

var mongoose = require('mongoose');
var sha1 = require('sha1');
var bcrypt = require('bcrypt-nodejs');
var validator = require('../utils/validator')
var Schema = mongoose.Schema;

var User = new Schema({
	userid:{
		type : Number,
		unique : true
	},
	name:{
		type: String,
		required: true,
		trim: true,
		validate: [validator.isName, "Invalid name"]
	},
	email:{
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique : true,
		validate: [validator.isEmail, 'Invalid email address']

	},
	password:{
		type: String,
		required: true
	},
	profile_pic:{
		type: String
	},
	salt:{
		type: String
	},
	create_ts:{
		type: Date,
		required: true
	},
	last_update_ts:{
		type: Date,
		default : Date.now
	}
});


// Pre-Processing before saving the docemunet
User.pre('save', function(next) {
	var doc = this;
	if (!doc.isModified('last_update_ts')) 
		doc.last_update_ts = Date.now();
	
	var salt = bcrypt.genSaltSync(10);

	// encrypt password before save
	if (doc.isModified('password')){
		doc.salt = salt;
		doc.password = sha1(doc.password+salt);
	}
	
	next();
  });


User.methods.verifyPassword = function(password) {
  return this.password === sha1(password+this.salt);
}

module.exports = mongoose.model('User',User);
