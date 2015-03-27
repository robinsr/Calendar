'use strict';

define(['backbone', 'underscore', 'moment', 'models/day'], function (backbone, _, moment, Day) {
  return backbone.Collection.extend({
    model: Day,

    generateDays: function (d) {

      if (_.isUndefined(d)) {
        d = moment()
      } else {
        d = d.clone();
      }

      this.date = d.clone();

      var initialDate = moment(d).startOf('month');
      var lengthOfMonth = initialDate.clone().endOf('month').date();
      var intialWeek = initialDate.get('week');
      var initialDay = initialDate.day();

      var getWeekNumber = function (week) {
        var initVal = Math.abs(intialWeek - week);
        if (initVal <= 5) {
          return initVal
        }
        // this fixes the last week of the year
        var weeksLeft = 52 - intialWeek;
        if (week == 1) {
          return weeksLeft + week;
        }
      }

      if (initialDay !== 0) {
        for (var i = initialDay; i !== 0; i--) {
          var thisDay = moment(initialDate).subtract(i, 'days');
          this.push({
            isThisMonth: false,
            week: Math.abs(intialWeek - thisDay.get('week')),
            date: thisDay,
            displayDate: thisDay.format('D'),
            stringDate: thisDay.format('M/D/YYYY')
          });
        };
      }

      for (var i = 0; i < lengthOfMonth; i++) {
        var thisDay = moment(initialDate).add(i, 'days');
        this.push({
          week: getWeekNumber(thisDay.get('week')),
          date: thisDay,
          displayDate: thisDay.format('D'),
          stringDate: thisDay.format('M/D/YYYY')
        });
      };

      var lastDate = moment(initialDate.endOf('month'));
      var lastDay = lastDate.day();

      if (lastDay !== 6) {
        var extraDays = 6 - lastDay;
        for (var i = 0; i < extraDays; i++) {
          var thisDay = moment(lastDate).add(i + 1, 'days')
          this.push({
            isThisMonth: false,
            week: getWeekNumber(thisDay.get('week')),
            date: thisDay,
            displayDate: thisDay.format('D'),
            stringDate: thisDay.format('M/D/YYYY')
          });
        };
      }
      return this;
    }
  });
});