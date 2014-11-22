'use strict';

define([
  'backbone',
  'underscore',
  'jquery',
  'views/day',
  'hbs!templates/day'], 
function (backbone, _, $, DayView, template) {
  var DaysView = Backbone.View.extend({
    tagName: 'tr',
    render: function(){
      this.collection.each(function(day){
          var dayView = new DayView({ model: day });
          this.$el.append(dayView.render().el);
      }, this);
      return this;
    }
  });

  return DaysView
})