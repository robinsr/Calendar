'use strict';

var _ = require('underscore');
var gulp = require('gulp');
var bsfy = require('../lib/bsfy');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

module.exports = function (opts) {
  opts = _.defaults(opts || {}, {
    src: './src/main.js',
    dest: './build',
    sourceMaps: false,
    es6: false,
    angular: false,
    hbs: false
  });

  return bsfy(opts)
    .add(opts.src, {debug: opts.sourceMaps})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(opts.dest));
};