"use strict";

var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth/authController');
var usersRoute = require('./usersRoute');

//user login
router.post('/auth', authController.login);

// api route for users
router.use('/users', usersRoute);


router.get('/', function(req, res) {
	res.send('welcome to KeepNote API');
});


module.exports = router;