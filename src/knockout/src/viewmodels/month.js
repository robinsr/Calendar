'use strict';

define([
  'knockout',
  'viewmodels/day',
  'models/day'
],
function (ko, DayViewModel, DayModel) {
  Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((this - onejan) / 86400000);
  }

  return function Month (monthNum, yearNum, eventItems) {
    
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    this.monthName = monthNames[monthNum];

    this.yearNum = yearNum;

    this.days = [];

    var eventItems = eventItems || [];

    // determine how many days in this month (special case, February leep year)
    var daysInEachMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (monthNum !== 1) {
      this.daysInMonth = daysInEachMonth[monthNum]
    } else {
      var d = new Date();
      d.setFullYear(yearNum,11,31);
      var totalsDaysThisYear = d.getDOY();
      this.daysInMonth = (totalsDaysThisYear == 365) ? 28 : 29;
    }

    // determine what weekday the first day of the month falls on
    d = new Date(yearNum, monthNum, 1);
    this.weekdayOfFirst = d.getDay();

    // determine number of preceding days to plot on the calendar
    this.precedingDays = this.weekdayOfFirst;

    // determine preceding month (should be array: [month,year])
    this.precedingMonth = monthNum - 1 < 0 ? [11,yearNum - 1] : [monthNum - 1, yearNum];

    // determine number of trailing days to plot on calendar
    var totalDays = this.precedingDays + this.daysInMonth;
    this.trailingDays = 7 - (totalDays % 7);

    // Add another week to the month to get 42 total days
    if (this.precedingDays + this.daysInMonth + this.trailingDays === 35) {
      this.trailingDays = this.trailingDays + 7
    }

    // determine trailing month (should be array: [month,year])
    this.trailingMonth = monthNum + 1 == 12 ? [0,yearNum + 1] : [monthNum + 1, yearNum];

    // add preceding days to days array (using splice)
    for (var i = 0; i < this.precedingDays; i++) {
      this.days.splice(0, 0, new DayViewModel(new DayModel({
        year: this.precedingMonth[1],
        month: this.precedingMonth[0],
        day: daysInEachMonth[this.precedingMonth[0]] - i,
        inCurrentMonth: false
      })));
    }

    // add this months days to the days array (using normal push)
    for (var i = 0; i < this.daysInMonth; i++) {
      this.days.push(new DayViewModel(new DayModel({
        year: yearNum,
        month: monthNum,
        day: i + 1,
        inCurrentMonth: true
      })));
    }

    // add trailing monds days to the days array
    for (var i = 0; i < this.trailingDays; i++) {
      this.days.push(new DayViewModel(new DayModel({
        year: this.trailingMonth[1],
        month: this.trailingMonth[0],
        day: i + 1,
        inCurrentMonth: false
      })));
    }


    this.weeksInThisMonth = Math.floor(this.days.length / 7);

    return this;
  }
})