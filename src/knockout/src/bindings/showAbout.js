'use strict';

define(['knockout', 'jquery'], function (ko, $) {
  ko.bindingHandlers.showAbout = {
    init: function (elem, val, a, b, c) {
        $(elem).click(function (e) {
          e.preventDefault();
          $('#about-box').show();
        });
    }
  }
});