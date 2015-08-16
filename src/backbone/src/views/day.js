'use strict';

define([
  'backbone',
  'underscore',
  'jquery',
  'hbs!templates/day'], 
function (backbone, _, $, template) {

  var DayView = Backbone.View.extend({

    tagName: 'li',

    className: 'Day',

    events: {
      'click .calendarItem': 'itemClicked'
    },

    tmpl: template,

    initialize: function() {
      return this
    },

    render: function () {
      this.$el.html( this.tmpl( this.model.toJSON() ) );
      this.$el.addClass( 'day-position-' + this.model.get( 'positionX' ) + '-' + this.model.get( 'positionY' ) );

      if ( this.model.get( 'isInMonthRange' ) ) {
        this.$el.addClass( 'this-month' );
      }

      return this;
    },

    itemClicked: function (e) {
      console.log(e)
      window.pubSub.trigger('click:item')
    }
  });

  return DayView;
});