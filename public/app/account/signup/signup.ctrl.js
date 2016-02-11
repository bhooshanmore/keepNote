var app = angular.module('keepNote');

app.controller('SignupCtrl',function ($scope,User,Toast,$state){

	$scope.signup=function(form){
	
		Toast.show("Signing up in progress");
		User.save($scope.user,function(err,response){

			Toast.hide();
			if(err) return Toast.flash(err.error);
			
			$state.go("login");
		});
		
	}

});