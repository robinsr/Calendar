'use strict';

define(['backbone'], function (backbone) {
  return backbone.Model.extend({
    defaults: function () {
      return {
        displayDate: "NA"
      }
    },

    initialize: function() {
      if (!this.get("displayDate")) {
        this.set({"displayDate": this.defaults().displayDate});
      }
    }

  });
});