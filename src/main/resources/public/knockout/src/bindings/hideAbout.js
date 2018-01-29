'use strict';

var ko = require('knockout');
var $ = require('jquery');

ko.bindingHandlers.hideAbout = {
  init: function (elem, val, a, b, c) {
      $(elem).click(function (e) {
        e.preventDefault();
        $('#about-box').hide();
      });
  }
};