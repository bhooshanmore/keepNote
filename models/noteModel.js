"use strict";

var mongoose = require('mongoose');
var sha1 = require('sha1');
var bcrypt = require('bcrypt-nodejs');
var validator = require('../utils/validator')
var Schema = mongoose.Schema;

var Note = new Schema({
	noteid:{
		type : Number,
		unique : true
	},
	title:{
		type: String,
		trim: true,
	},
	description:{
		type: String,
		required: true,
		trim: true,
		lowercase: true,
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

module.exports = mongoose.model('Note',Note);
