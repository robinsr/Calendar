'use strict';

define(['lodash'],function (_) {
  return function dayModel (opt) {
    _.extend(this, opt);
    return this;
  }
});