'use strict';

define(['lodash'],function (_) {
  return function dayModel (opt) {
    _.extend(this, opt, {
      displayMonth: opt.month + 1,
      displayDay: opt.day
    });
    return this;
  }
});