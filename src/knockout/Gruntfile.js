'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/site.js': ['src/**/*.js', 'src/**/*.coffee'],
        },
        options: {
          //transform: ['coffeeify']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['browserify', 'jsbeautifier']
      }
    },
    "jsbeautifier" : {
      files : ['bundle-dist/site.js'],
      options : {}
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('default', ['browserify', 'jsbeautifier']);
}