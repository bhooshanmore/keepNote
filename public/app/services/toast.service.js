angular.module('keepNote')
  .service('Toast', function($mdToast) {
    this.show=function(content,override){
  		var obj={
	      template: '<md-toast>'+content+'<span></md-toast>',
	      hideDelay: 0,
        parent:$(".ui-main-view")
	    };
      
      if(typeof override=='object')
	    	obj=_.assign(obj,override);
  		
       return $mdToast.show(obj);	
  	 };

  	 this.flash=function(content){
  	 	this.show(content,{
        template: '<md-toast>'+content+'</md-toast>',
        hideDelay:3000
      })
  	 }

  	 this.hide=function(){
  	 	return $mdToast.hide();	
  	 }

     this.showSpin=function(content){
        return this.show(content,{
          template: '<md-toast><span>'+content+'</span><span style="position: absolute;right: 14px;top: 18px;"><i class="fa fa-circle-o-notch fa-spin"></i></span></md-toast>',
        });
     }

     this.showAction=function(content){
      
        var toast=$mdToast.simple()
          .content(content)
          .action('OK')
          .hideDelay(0)
          .highlightAction(false)
        $mdToast.show(toast).then(function(response) {});
      
     }


  });
