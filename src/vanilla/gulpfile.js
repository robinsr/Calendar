'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var bOpts = {
  debug: process.env.NODE_ENV === 'development'
};

gulp.task('default', function (done) {
  return browserify('./src/main.js', bOpts)
  .transform(babelify, {
    presets: ['es2015'],
    sourceMaps: bOpts.debug
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
});

gulp.task('watch', function () {
  return gulp.watch('./src/**/*.js', ['default']);
});