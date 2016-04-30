'use strict';

var gulp = require('gulp');
var febs = require('../../febs');

var buildOpts = {
  es6: true
};

gulp.task('compile-js:dev', function () {
  return febs.buildDevBundle(buildOpts);
});

gulp.task('compile-js:prod', function () {
  return febs.buildProdBundle(buildOpts)
});

gulp.task('watch', function () {
  return gulp.watch('./src/**/*.js', ['compile-js:dev']);
});

gulp.task('default', ['compile-js:prod'])