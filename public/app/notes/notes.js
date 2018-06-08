'use strict';

angular.module('keepNote')
  .controller('NotesCtrl',function($scope,$state,$mdDialog,User, Notes){
    if ( !User.isLoggedIn()) $state.go("login");
    $scope.notes = [];

    Notes.fetch(function(result,err){
      $scope.notes = result;
      console.log(err,result);
    });

    $scope.updateNote = function(note){
      Notes.update(note);
      $mdDialog.hide();
    }

    $scope.deleteNote = function(note){
      Notes.delete(note);
      $mdDialog.hide();
    }

    $scope.addNote = function(){
      Notes.add({title: $scope.newTitle, description:$scope.newNote}, function(res, err){
        $scope.newTitle="";
        $scope.newNote="";
      });
    }

    $scope.showDialog=function(note)
    {
      $scope.selectedNote = note;
      console.log(note);
      $mdDialog.show({
        templateUrl: 'app/notes/noteDialog.tpl.html',
        clickOutsideToClose:true,
        scope: $scope,
        preserveScope: true
      });
    }



});
