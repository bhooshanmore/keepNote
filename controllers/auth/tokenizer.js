var jwt = require('jsonwebtoken');
var config = require('../../config');
var TOKEN_EXPIRES_IN = 60*60*24; // 1 Day

/*
 * getToken		This token will be generated after successful user login
 */
exports.getToken = function(data) {
	return jwt.sign(data, config.API_SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN });
}


/*
 * verifyToken		Verify the encrypted token
 * @param callback,	function(err, decoded){ }
 */
exports.verifyToken = function(token, callback){
	jwt.verify(token, config.API_SECRET_KEY, callback);
}


