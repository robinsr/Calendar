'use strict';

define(['backbone'], function (backbone) {
  return backbone.Model.extend({
    defaults: {
        title       : "Empty Item",
        date        : null,
        time        : null,
        description : null
      }
  });
});