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
				assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/img', '<%= config.dist %>/css']
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/css/{,*/}*.css']
		},

		filerev: {
			dist: {
				src: [
					'<%= config.dist %>/img/**/*.{jpg,jpeg,gif,png,webp,svg}',
					'<%= config.dist %>/css/**/*.{css,eot,ttf,woff}',
					'<%= config.dist %>/js/**/*.js'
				]
			}
		},

		copy: {
			html: {
				options: {
					process: function(content, path) {
						if (path.indexOf('index.html') >= 0) {
							grunt.log.ok('Update Google Analytics ID:', path);
							content = content.replace('UA-XXXXX-X', 'UA-46467058-1');
						}

						return content;
					}
				},
				files: {
					'<%= config.dist %>/': '{,*/}*.html'
				}
			},
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: './',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'img/{,*/}*.{webp,svg}',
						'css/fonts/{,*/}*.*'
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

		uncss: {
			dist: {
				files: {
					'<%= config.dist %>/css/main.css': ['<%= config.dist %>/index.html']
				}
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'img',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/img'
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
		},

		cdn: {
			html: {
				options: {
					/** @required - root URL of your CDN (may contains sub-paths as shown below) */
					cdn: '//d1gxb22tgqvqr1.cloudfront.net/start',
					/** @optional  - if provided both absolute and relative paths will be converted */
					flatten: true
					/** @optional  - if provided will be added to the default supporting types */
					// supportedTypes: { 'phtml': 'html' }
				},
				// /** @required  - string (or array of) including grunt glob variables */
				src: ['<%= config.dist %>/*.html']
				// * @optional  - if provided a copy will be stored without modifying original file
				// dest: '<%= config.dist %>/'
			},
			css: {
				options: {
					cdn: '<%= cdn.html.options.cdn %>/css',
					flatten: true
				},
				src: ['<%= config.dist %>/css/*.css']
			}
		}
	});

	// Common tasks
	grunt.registerTask('build', [
		'clean:dist',
		'sass:dist',
		'jshint',
		/*'qunit',*/
		'useminPrepare',
		'imagemin',
		'copy:html',
		'copy:dist',
		'modernizr',
		'concat',
		'uglify',
		'filerev',
		'usemin'
	]);

	// Default task
	grunt.registerTask('default', ['sass:compile', 'watch']);
};
