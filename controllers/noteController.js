"use strict";

var mongoose = require("mongoose");
var Note = require("../models/noteModel.js");
var dbHelper = require('../utils/dbHelper');
var sequence = dbHelper.sequenceGenerator('note');


exports.addNote = function(req,res,next){

	// get the next noteid
    sequence.next(function(nextSeq){
		var note = new Note({
			noteid: nextSeq,
			title: req.body.title,
			description: req.body.description,
			create_ts: Date.now()
		});

		note.save(function(err) {
			if (err){
				console.log(err);
	    	if(err.name == 'ValidationError') return next('Invalid parameters');
	    	return next(err);
			}

	    res.status(200).json({status:200,message:"New note added",data: note});
		});
	});
}

exports.getNotes = function(req,res,next){
	Note.find({noteid:req.params.noteid},function(err, notes) {
		if (err) return next(err);
		res.status(200).json({status:200,message:"Notes",data:notes});
	});
}

exports.getNote = function(req,res,next){
	Note.findOne({noteid:req.params.noteid},function(err, notes) {
		if (err) return next(err);
		res.status(200).json({status:200,message:"Notes",data:notes});
	});
}

exports.updateNote = function(req,res,next){

	Note.findOne({noteid:req.params.noteid},function(err,note){
		if (err) return next(err);
		if(!note) if (err) return next("Note not found");

		note.title = req.body.tile;
		note.note = req.body.description;
		note.last_update_ts = Date.now();

		note.save(function(err){
			if (err){
				console.log(err);
				if(err.name == 'ValidationError') return next('Invalid parameters');	    		
		    	return next(err);
			}
	    res.status(200).json({status:200,message:"Note details updated",data: note});
		});
	});
}

exports.deleteNote = function(req,res,next){
	Note.remove({ noteid:req.params.noteid },function(err,doc){
		if(err) return next(err);
		if(doc.result.n<1) return next("Delete unsuccessful");
		res.status(200).json({status:200,message:"Note deleted"});
	});
}


