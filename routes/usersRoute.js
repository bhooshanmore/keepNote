"use strict";

var express = require('express');
var router = express.Router();
var notesRoute = require('./notesRoute');
var userController = require('../controllers/userController');
var authController = require('../controllers/auth/authController');

var authenticate = authController.authenticate;



//user login
router.post('/auth', authController.login);

// add new user
router.post('/', userController.addUser);

// search user by name or email address
router.get('/lookup',userController.lookupUser);

// get , update and delete a user
router.get('/:userid', authenticate, userController.getUser);
router.put('/:userid', authenticate, userController.updateUser);
router.delete('/:userid', authenticate, userController.deleteUser);

router.put('/:userid/profilePhoto', authenticate, userController.changeProfilePic);



router.use('/:userid/notes', notesRoute);

module.exports = router;