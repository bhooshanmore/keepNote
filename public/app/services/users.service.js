'use strict';

angular.module('keepNote')
  .service('User', function ($http,$cookies,Header) {

   	// add new user
	  this.save = function(user,callback) {
	  	var cb = callback || angular.noop;
	  	var endpoint="/api/users";

	  	$http.post(endpoint,user,Header.getSimpleHeader()).success(function(response){
				cb(null,response);
			}).error(function(response){
				cb(response);
			});
	  }

	  // user login
	  this.login = function(user, callback) {
      var cb = callback || angular.noop;
      $http.post('/api/auth', user).success(function(data) {
        $cookies.put('token', data.token);
        $cookies.put('userid', data.data.userid);
        $cookies.put('name', data.data.name);
        $cookies.put('email', data.data.email);

        cb(null,data.data);
      }).error(function(err) {
        //this.logout();
        cb(err);
      });
    }

    this.getUser = function(){
      return {
        name: $cookies.get("name"),
        email: $cookies.get("email"),
        userid: $cookies.get("userid"),
      }
    }

    // logout user
    this.logout = function() {
      $cookies.remove('token');
      $cookies.remove('userid');
      location.reload();
    }

    // check if user is logged in
    this.isLoggedIn = function() {
      return angular.isDefined($cookies.get("userid")) && angular.isDefined($cookies.get("token"));
    }
  });
