var app = angular.module('keepNote');

app.controller('LoginCtrl', function ($scope,User,Toast,$mdDialog,$state,$cookies){
	if(User.isLoggedIn())
		$state.go("home");

	$scope.Login = function() {
		Toast.showSpin("Logging in");
		
		User.login($scope.user,function(err,user){
			Toast.hide();
			if(!err) return $state.go("home");

			// delay 1 second to show error message
			setTimeout(function(){
				return Toast.flash(err.error);
			},1000)

			
		});
	}
	
});