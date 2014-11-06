'use strict';

define(['backbone', 'models/day'], function (backbone, Day) {
  return backbone.Collection.extend({
    model: Day,
    initialize: function () {
      console.log("initing collection")

      for (var i = 0; i < 30; i++) {
        console.log('hi')
        this.push({
          displayDate: i
        });

      };
        console.log(this)
    }
  });
});