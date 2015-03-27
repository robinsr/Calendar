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
        files: ['bower_components/'],
        tasks: ['bower']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['bower']);
}