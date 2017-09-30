'use strict';

var ko = require('knockout');
var $ = require('jquery');

ko.bindingHandlers.decMonth = {
  init: function (elem, val, a, b, vm) {
    $(elem).click(function () {
      var today = val()();
      var app = vm.$root;
      if (today.getMonth() != 0){
          today.setMonth(today.getMonth()-1);
      } else {
          today.setFullYear(today.getFullYear()-1);
          today.setMonth(11);
      }
      app.month(today.getMonth());
      app.year(today.getFullYear());
    });
  }
};