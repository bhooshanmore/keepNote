"use strict";

var express = require('express');
var router = express.Router();
var notesRoute = require('./notesRoute');
var userController = require('../controllers/userController');
var authController = require('../controllers/auth/authController');
var authenticate = authController.authenticate;


// add new user
router.post('/', userController.addUser);

// search user by name or email address
router.get('/search',userController.lookupUser);

// get a specific user info
router.get('/:userid', authenticate, userController.getUser);

// update user profile
router.put('/:userid', authenticate, userController.updateUser);

// change user profile pic
router.put('/:userid/profilePhoto', authenticate, userController.changeProfilePic);

// delete a user
router.delete('/:userid', authenticate, userController.deleteUser);


// Routes for notes
router.use('/:userid/notes', notesRoute);

module.exports = router;