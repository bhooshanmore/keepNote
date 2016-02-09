"use strict";

// URL validator
exports.isUrl = function(text){

	if(typeof text != "string")
		text = "";

	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

	return text.match(new RegExp(expression)) ? true:false;
}

// Email Validator
exports.isEmail = function(text){

	if(typeof text != "string")
		text = "";

	var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return text.match(new RegExp(expression)) ? true:false;
}

// Name validator
exports.isName = function(text){

	return text.length>3  && text.length<25;
}
// password validator
exports.isPassword = function(text){

	return text.length>4;
}