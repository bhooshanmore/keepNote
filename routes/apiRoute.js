"use strict";

var express = require('express');
var router = express.Router();

var usersRoute = require('./usersRoute');

router.use('/users', usersRoute);


router.get('/', function(req, res) {
	res.send('welcome to KeepNote API');
});


module.exports = router;