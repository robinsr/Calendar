'use strict';

define(['knockout', 'jquery'], function (ko, $) {
  ko.bindingHandlers.enableDrag = {
    init: function (elem, val) {
      val = ko.unwrap(val());
      elem.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("calendar", val);
      });
    }
  }
});