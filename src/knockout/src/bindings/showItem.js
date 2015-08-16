'use strict';

define(['knockout', 'jquery'], function (ko, $) {
  ko.bindingHandlers.showItem = {
    init: function (elem, val, a, b, c) {
      val = val();
        $(elem).click(function () {
          c.$root.selectedItem(val);
          $('#item-detail-box').show();
        });
    }
  }
});