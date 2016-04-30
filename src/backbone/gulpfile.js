'use strict';

var gulp = require('gulp');
var febs = require('../../febs');

var buildOpts = {
  hbs: true
};

gulp.task('default', function () {
  return febs.buildProdBundle(buildOpts)
});