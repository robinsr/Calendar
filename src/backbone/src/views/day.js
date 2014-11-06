'use strict';

define([
  'backbone',
  'underscore',
  'jquery',
  'hbs!templates/day'], 
function (backbone, _, $, template) {

  var DayView = Backbone.View.extend({
    initialize: function() {
      this.template = template;
      return this
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes))
      return this
    }
  });

  return DayView;
});