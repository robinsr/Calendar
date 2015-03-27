'use strict';

define(['backbone', 'collections/items', 'text!../../../common/items.json'], function (backbone, ItemList, items) {
  var items = JSON.parse(items);
  return backbone.Model.extend({
    defaults:{
      displayDate: "NA",
      isThisMonth: true,
      isWeekOne: false,
      isWeekTwo: false,
      isWeekThree: false,
      isWeekFour: false,
      isWeekFive: false,
      isWeekSix: false,
      items: new ItemList(items)
    },

    initialize: function() {
      var _this = this;
      this.determineWeek();
      this.attributes.items = this.attributes.items.filter(function (item) {
        return item.attributes.date == _this.attributes.stringDate
      });
      return this;
    },

    determineWeek: function() {
      var weekBools = ['isWeekOne','isWeekTwo','isWeekThree','isWeekFour','isWeekFive','isWeekSix']

      for (var i = 0; i < weekBools.length; i++) {
        this.attributes[weekBools[i]] = this.attributes.week === i;
      };
    }
  });
});