angular.module('keepNote')
.service('Notes',function($cookies,$http,$state,Header){
	this.notes = [];


	this.fetch = function(callback){
		var userid = Header.getUserId();
		var endpoint = "/api/users/"+userid+"/notes";
		var doc = this;
		var cb = callback || angular.noop;
		return $http.get(endpoint,Header.getTokenHeader()).success(function(response){
        doc.notes = response.data;
        cb(doc.notes);
    }).error(function(err){
        cb(null,err);
    });
	}

	this.get=function(opts){
		return this.notes;
	}

	this.add = function(note,callback){
		var userid = Header.getUserId();
		var endpoint = "/api/users/"+userid+"/notes";
		var doc = this;
		var cb = callback || angular.noop;

		$http.post(endpoint, note, Header.getTokenHeader() ).success(function(response){
			doc.notes.push(response.data);
	      	cb(response);
	    }).error(function(err){
	      	cb(null,err);
	    });
	}

	this.update = function(note,callback){
		var userid = Header.getUserId();
		var cb = callback || angular.noop;
	    var doc = this;
	    var endpoint = "/api/users/"+userid+"/notes/"+note.noteid;

	    return $http.put(endpoint, note, Header.getTokenHeader() ).success(function(response){
	    		for( var index in doc.notes){
	    			if(doc.notes[index] == note.noteid){
	    				doc.notes[index] = note;
	    				break;
	    			}
	    		}
	        cb(response);
	    }).error(function(err){
	        cb(null,err);
	    });
	}

	this.delete = function(note,callback){
		var userid = Header.getUserId();
		var cb = callback || angular.noop;
	    var doc = this;

	    var endpoint = "/api/users/"+userid+"/notes/"+note.noteid;

	    return $http.delete(endpoint, Header.getTokenHeader()).success(function(response){
	    	// remove item from array
	    	var item = _.find(doc.notes, {noteid: note.noteid});
	    	var index = _.indexOf(doc.notes, item);
	    	doc.notes.splice(index,1);

	        cb(response);
	    }).error(function(err){
	        cb(null,err);
	    });
	}
});
