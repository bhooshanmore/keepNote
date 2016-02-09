"use strict";

module.exports = function(grunt){
	grunt.initConfig({
		
		less: {
		  server:{
		  files: {
	          'public/app/app.css' : 'public/app/app.less'
	        }
	     }
	    },
		watch: {
		  	options:{
		  		livereload: false
		  	},
		  	less: {
        		files: [
          		'public/app/**/*.less'],
       			tasks: ['less']
      		},
	      	js: {
	       		files: ['public/app/*.js', '/public/app/**/*.js']
	      	},
	      	angularjs:{
	      		files: ['public/app/**/*.html', 'public/app/*.js', 'public/app/**/*.js']
	      	}
	    },
	    express: {
		    server: {
		      options: {
		      	server: './app.js',
		        port: 8080,
		        hostname: 'localhost',
		        bases: ['.'],
		        livereload: false
		      }
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');


	grunt.registerTask('default', ['less','express','watch']);
	grunt.registerTask('server', ['less','express','watch']);
}
