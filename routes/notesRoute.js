"use strict";

var express = require('express');
var router = express.Router();

var noteController = require('../controllers/noteController');
var authController = require('../controllers/auth/authController');

var authenticate = authController.authenticate;


// add new note
router.post('/', noteController.addNote);

// get all notes of the user
router.get('/', noteController.getNotes);

// get one specific note
router.get('/:nodeid', noteController.getNote);

// update a note
router.put('/:userid', authenticate, noteController.updateNote);

// delete a note
router.delete('/:userid', authenticate, noteController.deleteNote);


module.exports = router;