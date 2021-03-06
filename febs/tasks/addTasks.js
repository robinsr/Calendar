'use strict';

var gulp = require('gulp');
var buildDevBundle = require('./buildDevBundle');
var buildProdBundle = require('./buildProdBundle');

module.exports = function (buildOpts) {
  gulp.task('compile-js:dev', function () {
    return buildDevBundle(buildOpts);
  });

  gulp.task('compile-js:prod', function () {
    return buildProdBundle(buildOpts);
  });

  gulp.task('watch', ['compile-js:dev'], function () {
    return gulp.watch('./src/**/*.{js,jsx}', ['compile-js:dev']);
  });

  gulp.task('default', ['compile-js:prod']);
};
