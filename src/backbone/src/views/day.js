'use strict';

define([
  'backbone',
  'underscore',
  'jquery',
  'hbs!templates/day'], 
function (backbone, _, $, template) {

  var DayView = Backbone.View.extend({

    tagName: 'td',

    events: {
      'click .calendarItem': 'itemClicked'
    },

    initialize: function() {
      this.template = template;
      return this
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes))
      this.$el.addClass('Day');
      if (this.model.attributes.isThisMonth) {
        this.$el.addClass('this-month');
      } else {
        this.$el.addClass('other-month');
      }
      return this
    },

    itemClicked: function (e) {
      console.log(e)
      window.pubSub.trigger('click:item')
    }
  });

  return DayView;
});