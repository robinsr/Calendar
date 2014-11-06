'use strict';

define(['backbone'], function (backbone) {
  return backbone.Model.extend({
    defaults: function () {
      return {
        title: "Empty Item"
      }
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    }

  });
});