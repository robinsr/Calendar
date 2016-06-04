'use strict';

var gulp = require('gulp');
var febs = require('../../febs');

var buildOpts = {
  es6: true,
  angular: true
};

febs.addTasks(buildOpts);