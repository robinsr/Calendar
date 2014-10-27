'use strict';

define([
  'lodash',
  'knockout',
  'viewmodels/month',
  'models/items',
  'bindings/showItem',
  'bindings/hideItem',
  'bindings/enableDrag',
  'bindings/enableDrop'
],
function (_, ko, monthViewModel, itemsModel) {
  function appViewModel () {
    var self = this;
    
    var today = new Date();

    self.month = ko.observable(today.getMonth());
    self.year = ko.observable(today.getFullYear());

    
    self.monthVM = ko.computed(function () {
      var month = self.month();
      var year = self.year();
      return new monthViewModel(month, year);
    });
    
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

    self.decMonth = function () {
        if (today.getMonth() != 0){
            today.setMonth(today.getMonth()-1);
        } else {
            today.setFullYear(today.getFullYear()-1);
            today.setMonth(11);
        }
        self.month(today.getMonth());
        self.year(today.getFullYear());
    };
    
    self.incMonth = function () {
        if (today.getMonth() != 11){
            today.setMonth(today.getMonth()+1);
        } else {
            today.setFullYear(today.getFullYear()+1);
            today.setMonth(0);
        }
        self.month(today.getMonth());
        self.year(today.getFullYear());
    };

    self.items = ko.observableArray([]);

    self.thisMonthsItems = ko.computed(function () {
      var items = self.items();
      return _.filter(items, function (item) {
        return item.month == self.month() && item.year == self.year();
      });
    });

    self.getItemsForDay = function (day) {
      if (ko.isObservable(day)) {
        day = day();
      }
      return ko.computed({
        read: function () {
          var items = self.thisMonthsItems();
          return _.filter(items, function (item) {
            return item.day === day;
          });
        }
      });
    }


    var items = new itemsModel();

    items.get(function (items) {
      self.items(items);
    });

    self.selectedItem = ko.observable(false);

  }

  // Main entry point
  window.vm = ko.applyBindings(new appViewModel());
})