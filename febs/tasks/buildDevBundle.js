'use strict';

var _ = require('underscore');
var gulp = require('gulp');
var bsfy = require('../lib/bsfy');
var source = require('vinyl-source-stream');

module.exports = function (opts) {
  opts = _.defaults(opts || {}, {
    src: './src/main.js',
    dest: './build',
    sourceMaps: true,
    es6: false,
    angular: false,
    hbs: false
  });

  return bsfy(opts)
    .add(opts.src, {debug: opts.sourceMaps})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(opts.dest));
};