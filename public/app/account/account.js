angular.module('keepNote').
config(function($stateProvider, $urlRouterProvider) {    
      
  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'app/account/login/login.html',
      controller: 'LoginCtrl'
    });
  
  $stateProvider
    .state('signup',{
      url: '/signup',
      templateUrl: 'app/account/signup/signup.html',
      controller: 'SignupCtrl'
    }); 
})