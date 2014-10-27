'use strict';

define(['knockout', 'jquery'], function (ko, $) {
  ko.bindingHandlers.hideItem = {
    init: function (elem) {
        $(elem).click(function () {
          $('.fancybox-overlay').hide();
        });
    }
  }
});