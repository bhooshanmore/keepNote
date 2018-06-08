var app = angular.module('keepNote',['ngMaterial','ui.router','ngCookies', 'ngFileUpload']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: 'app/notes/notes.html',
        controller: 'NotesCtrl',
    });
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('pink')
      .warnPalette('red')
      .backgroundPalette('grey')
});

app.run(function($rootScope, $state, User){
    $rootScope.$on('$stateChangeStart', function (event, toState) {

    });


    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
      console.log("error");
    });

});
