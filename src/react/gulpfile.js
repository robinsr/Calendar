'use strict';

var gulp = require('gulp');
var febs = require('../../febs');

var buildOpts = {
  react: true,
  src: './src/index.jsx'
};

febs.addTasks(buildOpts);