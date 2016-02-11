angular.module('keepNote')
.service('Header', function($cookies) {
  this.tokenHeader = {
    headers: {
      'Content-Type': 'application/json',
      'token':$cookies.get('token')
    }
  };
  
  this.simpleHeader = {
    headers: { 
        'Content-Type': 'application/json'
    }
  };

  this.onlyTokenHeader = {
    headers: {
      'token':$cookies.get('token')
    }
  };

  this.getTokenHeader=function(){
    if(angular.isUndefined(this.tokenHeader.headers.token))
      this.tokenHeader.headers.token =$cookies.get('token');
    
    return this.tokenHeader;  

  }

  this.getOnlyTokenHeader=function(){
    if(angular.isUndefined(this.onlyTokenHeader.headers.token))
      this.onlyTokenHeader.headers.token =$cookies.get('token');
    
    return this.onlyTokenHeader;  

  }
  
  this.getSimpleHeader=function(){
    return this.simpleHeader;  
  }

  this.getUserId = function(){
    return $cookies.get('userid');
  }
      
   
});