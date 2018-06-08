'use strict';

angular.module('keepNote')
  .controller('NavbarCtrl',function($scope,$mdDialog, User){

    $scope.logout = function(){
      User.logout();
    }

    $scope.user = User.getUser();

});
