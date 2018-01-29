'use strict'

var ko = require('knockout');
var _ = require('underscore');

module.exports = function dayViewModel(dayModel) {
  var self = this;

  self.day = ko.observable(dayModel.day)
  self.month = ko.observable(dayModel.month)
  self.year = ko.observable(dayModel.year)

  self.dateString = ko.observable(dayModel.displayMonth + "/" + dayModel.displayDay + "/" + dayModel.year);

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
};