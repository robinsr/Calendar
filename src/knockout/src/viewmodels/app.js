'use strict';

define([
  'lodash',
  'moment',
  'knockout',
  'viewmodels/month',
  'models/items',
  'bindings/showItem',
  'bindings/hideItem',
  'bindings/enableDrag',
  'bindings/enableDrop',
  'bindings/incMonth',
  'bindings/decMonth'
],
function (_, moment, ko, monthViewModel, itemsModel) {
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
      return _.at(month.days, [0,1,2,3,4,5,6]);
    });
    
    self.week2 = ko.computed(function () {
      var month = self.monthVM();
      return _.at(month.days, [7,8,9,10,11,12,13]);
    });
    
    self.week3 = ko.computed(function () {
      var month = self.monthVM();
      return _.at(month.days, [14,15,16,17,18,19,20]);
    });
    
    self.week4 = ko.computed(function () {
      var month = self.monthVM();
      return _.at(month.days, [21,22,23,24,25,26,27]);
    });
    
    self.week5 = ko.computed(function () {
      var month = self.monthVM();
      return _.at(month.days, [28,29,30,31,32,33,34]);
    });
    
    self.week6 = ko.computed(function () {
      var month = self.monthVM();
      return _.at(month.days, [35,36,37,38,39,40,41]);
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
})