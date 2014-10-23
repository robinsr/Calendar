'use strict'

define(['lodash','knockout'], function (_, ko) {
  return function dayViewModel(dayModel) {
    var self = this;

    console.log(dayModel)

    _.extend(dayModel, {
      displayMonth: dayModel.month + 1,
      displayDay: dayModel.day
    })

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
  }
})