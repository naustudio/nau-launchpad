/* © 2014 NauStud.io
 * @author Thanh Tran
 */
/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';
	// Project configuration
	grunt.initConfig({
		// Metadata
		banner: '/*! <%= package.name %> - v<%= package.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= package.homepage ? "* " + package.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= package.author.name %>;' +
			' Licensed <%= props.license %> */\n',
		// Task configuration
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['js/plugins.js', 'js/main.js'],
				dest: 'dist/js/main.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/js/main.min.js'
			}
		},
		sass: {
			compile: { // Target
				options: { // Target options
					style: 'expanded'
					// sourcemap: true //need SASS 3.3, install with: gem install sass --pre
				},

				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.scss', '!foundation.scss'],
					dest: 'css/',
					ext: '.css'
				}]
			}
		},
		jshint: {
			gruntfile: {
				src: 'gruntfile.js'
			},
			app: {
				src: ['js/**/*.js', '!js/vendor/*.js']
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			sass: {
				files: [
					'css/*.scss'
				],
				tasks: ['sass']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'*.html',
					'<%= jshint.app.src %>',
					'css/*.css'
				]
			}
		}
	});

	// These plugins provide necessary tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Default task
	grunt.registerTask('default', ['sass', 'jshint', 'qunit', 'concat', 'uglify']);
};
