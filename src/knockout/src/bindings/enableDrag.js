'use strict';

var ko = require('knockout');
var $ = require('jquery');

ko.bindingHandlers.enableDrag = {
  init: function (elem, val) {
    val = ko.unwrap(val());
    elem.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("calendar", val);
    });
  }
};