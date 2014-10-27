'use strict';

define(['lodash'], function (_) {
  return function Item (opt) {
    _.extend(this, opt);
    var d = this.date.split("/");
    
    this.displayMonth = d[0];
    this.month = parseInt(d[0]) - 1;

    this.day = this.displayDay = parseInt(d[1]);
    this.year = this.displayYear = parseInt(d[2]);

    this.id = _.uniqueId('item_');
    return this;
  }
});