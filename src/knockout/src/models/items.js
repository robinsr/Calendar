'use strict';

define(['jquery', 'models/item'], function ($, Item) {
  return function Items () {
    this.get = function (next) {
      var items = [];
      $.get('/common/data/items.json', function (data) {
        for (var i = 0; i < data.length; i++) {
          items.push(new Item(data[i]));
        };
        next(items)
      });
    }
  }
});