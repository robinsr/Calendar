'use strict';

var gulp = require('gulp');
var febs = require('../../febs');

var buildOpts = {
  react: true,
  src: './src/index.jsx'
};

gulp.task('compile-js:dev', function () {
  return febs.buildDevBundle(buildOpts)
});

gulp.task('default', ['compile-js:dev']);