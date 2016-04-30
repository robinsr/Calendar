'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('compile-js:dev', function (done) {
  return browserify('./src/main.js', {debug:true})
  .transform(babelify, {
    presets: ['es2015'],
    sourceMaps: true
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
});

gulp.task('compile-js:prod', function (done) {
  return browserify('./src/main.js', {debug:false})
  .transform(babelify, {
    presets: ['es2015']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./build'))
});

gulp.task('watch', function () {
  return gulp.watch('./src/**/*.js', ['compile-js:dev']);
});

gulp.task('default', ['compile-js:prod'])