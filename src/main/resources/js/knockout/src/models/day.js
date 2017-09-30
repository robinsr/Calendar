'use strict';

var _ = require('underscore');

module.exports = function dayModel (opt) {
  _.extend(this, opt, {
    displayMonth: opt.month + 1,
    displayDay: opt.day
  });
  return this;
};