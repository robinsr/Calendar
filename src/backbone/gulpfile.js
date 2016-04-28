'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var hbsfy = require('hbsfy');

var bOpts = {
  transform: [hbsfy],
  debug: process.env.NODE_ENV === 'development'
};

gulp.task('default', function (done) {
  return gulp.src('./src/main.js')
  .pipe(browserify(bOpts))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./build'))
});
