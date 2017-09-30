'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    title       : "Empty Item",
    date        : null,
    time        : null,
    description : null
  },

  urlRoot: '/appointments',

  idAttribute: 'id'
});