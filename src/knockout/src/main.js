'use strict';

var _ = require('underscore');
var ko = require('knockout');
var moment = require('moment');

var monthViewModel = require('./viewmodels/month');
var itemsModel = require('./models/items');

require('./bindings');

function appViewModel () {
  var self = this;
  
  self.today = ko.observable(new Date());

  self.month = ko.observable(self.today().getMonth());
  self.year = ko.observable(self.today().getFullYear());


  /**
   * self.nextMonth and self.previous define a time range in which items
   * may be relevant to the month in view. Filtering against this range for
   * each UI refresh then using the resulting, smaller array is more
   * performant than constantly filtering against the entire array of 500
   * items
   */
  self.nextMonth = ko.computed(function () {
    var thisMonth = self.month();
    var thisYear = self.year();
    return moment(thisMonth+1 + '-' + thisYear, 'MM-YYYY')
      .add(1, 'months')
      .endOf('month')
      .format('MM-DD-YYYY');
  });

  self.previousMonth = ko.computed(function () {
    var thisMonth = self.month();
    var thisYear = self.year();
    return moment(thisMonth+1 + '-' + thisYear, 'MM-YYYY')
      .subtract(1, 'months')
      .startOf('month')
      .format('MM-DD-YYYY');
  });

  /**
   * A single month view model is exposed to the UI at once
   */
  self.monthVM = ko.computed(function () {
    var month = self.month();
    var year = self.year();
    return new monthViewModel(month, year);
  });
  
  /**
   * Each weeks days are computed from the month view model
   *
   * TODO: create a function that returns a computed observable that takes
   * a parameter of of a week number or a range of days to get. That would
   * replace the six computed observables here with one function
   */
  self.week1 = ko.computed(function(){
    var month = self.monthVM();
    return month.days.slice(0,7);
  });
  
  self.week2 = ko.computed(function () {
    var month = self.monthVM();
    return month.days.slice(7,14);
  });
  
  self.week3 = ko.computed(function () {
    var month = self.monthVM();
    return month.days.slice(14,21);
  });
  
  self.week4 = ko.computed(function () {
    var month = self.monthVM();
    return month.days.slice(21,28);
  });
  
  self.week5 = ko.computed(function () {
    var month = self.monthVM();
    return month.days.slice(28,35);
  });
  
  self.week6 = ko.computed(function () {
    var month = self.monthVM();
    return month.days.slice(35,44);
  });

  /**
   * self.items holds the entirety of our 500 item objects
   */
  self.items = ko.observableArray([]);

  /**
   * self.thisMonthsItems filters the large 500 item array into a more
   * manageably sized array
   */
  self.thisMonthsItems = ko.computed(function () {
    return _.filter(self.items(), function (item) {
      var m = moment(item.date, 'MM/DD/YYYY');
      return m.isBefore(self.nextMonth()) && m.isAfter(self.previousMonth());
    });
  });

  /**
   * getItemsForDay is used by the view to request a computedObservable (array)
   * that contains all the items for that day. It filters against
   * self.thisMonthsItems
   */
  self.getItemsForDay = function (dateString) {
    if (ko.isObservable(dateString)) {
      dateString = dateString();
    }
    return ko.computed({
      read: function () {
        var items = self.thisMonthsItems();
        return _.filter(items, function (item) {
          return item.date === dateString;
        });
      }
    });
  }

  /**
   * And Items collection model has a #get() method used to fetch the items
   * via ajax
   */
  var items = new itemsModel();

  items.get(function (items) {
    self.items(items);
  });

  /**
   * self.selectedItem holds the item that has been clicked on 
   */
  self.selectedItem = ko.observable(false);

}

// Main entry point
window.vm = ko.applyBindings(new appViewModel());