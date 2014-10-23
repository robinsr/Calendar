'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    bower: {
      task: {
        rjsConfig: 'src/require-config.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['wiredep','browserify','jsbeautifier']
      }
    },
    "jsbeautifier" : {
      files : ['bundle-dist/site.js'],
      options : {}
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('default', ['bower', 'jsbeautifier']);
}