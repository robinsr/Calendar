'use strict';

var ko = require('knockout');
var $ = require('jquery');

ko.bindingHandlers.hideItem = {
  init: function (elem) {
      $(elem).click(function () {
        $('#item-detail-box').hide();
      });
  }
};