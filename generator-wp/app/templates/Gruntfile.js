// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // configurable paths
        yeoman: {
            app: 'app',
            normalize: 'bower_components/normalize-css/'
            <% if (bootstrap) {%>
            ,js: 'bower_components/bootstrap/js/'
            <% } %>
        },
        watch: {
            less: {
                files: ['<%%= yeoman.app %>/less/**/*.less'],
                tasks: ['refresh_css'],
                options: {
                    debounceDelay: 250,
                    spawn: false
                }
            },
            js: {
                files: ['<%%= concat.js.src %>'],
                tasks: ['refresh_js'],
                options: {
                    debounceDelay: 250,
                    spawn: false
                }
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '<%%= yeoman.app %>/less/{,*/}*.less',
                    '{<%%= yeoman.app %>}/js/{,*/}*.js'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%%= yeoman.app %>',
                        '<%%= yeoman.app %>/css'
                    ]
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["less"],
                    cleancss:true
                },
                files: {
                    "<%%= yeoman.app %>/css/main.css": "<%%= yeoman.app %>/less/main.less"
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: '<%%= yeoman.app %>/css/main.css',
                dest: '<%%= yeoman.app %>/css/'
            }
        },
        concat: {
            js: {
                src: [
                <% if (bootstrap) {%>
                '<%%= yeoman.js %>affix.js',
                '<%%= yeoman.js %>alert.js',
                '<%%= yeoman.js %>button.js',
                '<%%= yeoman.js %>carousel.js',
                '<%%= yeoman.js %>dropdown.js',
                '<%%= yeoman.js %>modal.js',
                '<%%= yeoman.js %>popover.js',
                '<%%= yeoman.js %>scrollpsy.js',
                '<%%= yeoman.js %>tooltip.js',
                '<%%= yeoman.js %>transition.js',
                <% } %>
                '<%%= yeoman.app %>/js/dev/_functions.js',
                '<%%= yeoman.app %>/js/dev/main.js'
                ],
                dest: '<%%= yeoman.app %>/js/common.js'
            }
        },

        uglify: {
            build: {
                src: '<%%= yeoman.app %>/js/common.js',
                dest: '<%%= yeoman.app %>/js/common.js'
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: './img/',
                        src: ['**/*.png'],
                        dest: './img/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: './img/',
                        src: ['**/*.jpg'],
                        dest: './img/',
                        ext: '.jpg'
                    }
                ]
            }
        },

        removelogging: {
            dist: {
                src: "<%%= yeoman.app %>/js/common.js" // Each file will be overwritten with the output!
            }
        },

        newer: {
            options: {
            cache: 'cache'
            }
        }
    });

    grunt.registerTask('default', [], function () {
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks("grunt-remove-logging");
        grunt.loadNpmTasks('grunt-newer');

        grunt.task.run('concat', 'removelogging', 'uglify', 'less', 'autoprefixer');
    });

    grunt.registerTask('dev', [], function () {
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-newer');

        grunt.task.run('connect', 'watch');
    });


    grunt.registerTask('refresh_css', [
        'less',
        'autoprefixer'
    ]);
    grunt.registerTask('refresh_js', [
        'newer:concat:js',
        'uglify'
    ]);

    grunt.registerTask('images', [], function () {
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.task.run('imagemin');
    });
};
