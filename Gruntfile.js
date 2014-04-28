/* © 2014 NauStud.io
 * @author Thanh Tran
 */
/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Project configuration
	grunt.initConfig({
		config: {
			dist: 'dist'
		},

		pkg: grunt['package'],

		// Metadata
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n',
		// Task configuration

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				root: './',
				dest: '<%= config.dist %>'
			},
			html: 'index.html'
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/img']
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/css/{,*/}*.css']
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: './',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'img/{,*/}*.{png,svg}',
						'{,*/}*.html',
						'css/fonts/{,*/}*.*',
						//some js files need to be specified explicitly
						'js/vendor/jquery-1.11.0.min.js',
						'css/normalize.css'
					]
				}]
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
			},
			dist: { // Target
				options: { // Target options
					style: 'compressed'
				},

				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.scss', '!foundation.scss'],
					dest: '<%= config.dist %>/css/',
					ext: '.css'
				}]
			}
		},

		// Generates a custom Modernizr build that includes only the tests you
		// reference in your app
		modernizr: {
			dist: {
				devFile: 'js/vendor/modernizr-2.7.2.js',
				outputFile: '<%= config.dist %>/js/vendor/modernizr.js',
				files: {
					src: [
						'<%= config.dist %>/js/{,*/}*.js',
						'<%= config.dist %>/css/{,*/}*.css',
						'!<%= config.dist %>/js/vendor/*'
					]
				},
				uglify: true
			}
		},

		jshint: {
			app: {
				src: ['js/**/*.js', '!js/vendor/*.js']
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		watch: {
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
					'src/**/*.js',
					'css/*.css'
				]
			}
		},
		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		}
	});

	// Common tasks
	grunt.registerTask('build', [
		'clean:dist',
		'sass:dist',
		'jshint',
		/*'qunit',*/
		'useminPrepare',
		'copy:dist',
		'modernizr',
		'concat',
		'uglify',
		'usemin'
	]);

	// Default task
	grunt.registerTask('default', ['sass:compile', 'watch']);
};
