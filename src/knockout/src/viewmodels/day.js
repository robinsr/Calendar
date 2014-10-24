'use strict'

define(['lodash','knockout'], function (_, ko) {
  return function dayViewModel(dayModel) {
    var self = this;

    var display = dayModel.displayMonth + "/" + dayModel.displayDay + "/" + dayModel.year

    self.displayDate = ko.observable(dayModel.day);

    var dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]

    self.dayName = ko.observable(dayNames[dayModel.day % 7]);

    self.inCurrentMonth = ko.observable(dayModel.inCurrentMonth);
  }
})