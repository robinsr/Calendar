'use strict';

define([
  'lodash',
  'knockout',
  'viewmodels/month'
],
function (_, ko, monthViewModel) {
  function appViewModel(){
    var self = this;

    self.month = ko.observable(9);
    self.year = ko.observable(2014)

    self.monthVM = ko.observable(new monthViewModel(self.month(), self.year()));

    console.log(self.monthVM())

    self.week1 = ko.observableArray(_.at(self.monthVM().days, [0,1,2,3,4,5,6]));
    self.week2 = ko.observableArray(_.at(self.monthVM().days, [7,8,9,10,11,12,13]));
    self.week3 = ko.observableArray(_.at(self.monthVM().days, [14,15,16,17,18,19,20]));
    self.week4 = ko.observableArray(_.at(self.monthVM().days, [21,22,23,24,25,26,27]));
    self.week5 = ko.observableArray(_.at(self.monthVM().days, [28,29,30,31,32,33,34]));
    self.week6 = ko.observableArray(_.at(self.monthVM().days, [35,36,37,38,39,40,41]));


    

  }

  // Main entry point
  var vm = ko.applyBindings(new appViewModel());
})