'use strict';

define(['knockout', 'jquery'], function (ko, $) {
  ko.bindingHandlers.hideAbout = {
    init: function (elem, val, a, b, c) {
        $(elem).click(function (e) {
          e.preventDefault();
          $('#about-box').hide();
        });
    }
  }
});