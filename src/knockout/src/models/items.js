'use strict';

var $ = require('jquery');
var Item = require('./item');

module.exports = function Items () {
  this.get = function (next) {
    var items = [];
    $.get('/common/data/items.json', function (data) {
      for (var i = 0; i < data.length; i++) {
        items.push(new Item(data[i]));
      };
      next(items)
    });
  }
};
