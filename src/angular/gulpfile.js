'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ngHtml2Js = require('browserify-ng-html2js');

var bOpts = {
  debug: process.env.NODE_ENV === 'development'
};

gulp.task('default', function (done) {
  return browserify('./src/main.js', bOpts)
  .transform(ngHtml2Js({
    module: 'calendar',
    extension: 'ngt'
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
});

gulp.task('watch', function () {
  return watch('./src/**/*.js', ['default']);
});