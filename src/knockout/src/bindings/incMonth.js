'use strict';

define(['knockout'], function (ko) {
  ko.bindingHandlers.incMonth = {
    init: function (elem, val, a, b, vm) {
      $(elem).click(function () {
        var today = val()();
        var app = vm.$root;
        if (today.getMonth() != 11){
            today.setMonth(today.getMonth()+1);
        } else {
            today.setFullYear(today.getFullYear()+1);
            today.setMonth(0);
        }
        app.month(today.getMonth());
        app.year(today.getFullYear());
      });
    }
  }
});