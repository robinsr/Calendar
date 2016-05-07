'use strict';

var browserify = require('browserify');
var ngHtml2Js = require('browserify-ng-html2js');
var hbsfy = require('hbsfy');
var babelify = require('babelify');

module.exports = function (opts) {
  var bsfy = browserify({
    debug: opts.sourceMaps
  });

  if (opts.es6) {
    bsfy.transform(babelify, {
      presets: ['es2015']
    });
  }

  if (opts.angular) {
    bsfy.transform(ngHtml2Js({
      module: 'calendar',
      extension: 'ngt'
    }));
  }

  if (opts.hbs) {
    bsfy.transform(hbsfy)
  }

  return bsfy;
}