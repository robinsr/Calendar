'use strict';

var gulp = require('gulp');
var febs = require('../../febs');

gulp.task('default', function () {
  return febs.buildProdBundle()
});