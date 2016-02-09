"use strict";

var express = require('express');
var router = express.Router();

var heartbeatController = require('../controllers/heartbeatController');

router.use('/users', usersRoute);


router.get('/', function(req, res) {
	res.send('welcome to KeepNote API');
});


module.exports = router;