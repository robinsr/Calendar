'use strict';

define([
  'backbone',
  'underscore',
  'jquery',
  'views/weekView',
  'collections/days',
  'hbs!templates/month'], 
function (backbone, _, $, WeekView, DaysCol, template) {
  var DaysView = Backbone.View.extend({
    tagName: 'table',
    render: function(){
      this.isWeekOne = [];
      this.isWeekTwo = [];
      this.isWeekThree = [];
      this.isWeekFour = [];
      this.isWeekFive = [];
      this.isWeekSix = [];
      this.isWeekOne = [];

      var weekBools = ['isWeekOne','isWeekTwo','isWeekThree','isWeekFour','isWeekFive','isWeekSix']
      
      // load up the weeks with appropriate days
      this.collection.each(function(day){
        for (var i = 0; i < weekBools.length; i++) {
          if (day.attributes[weekBools[i]]) {
            this[weekBools[i]].push(day)
          }
        };
      }, this);

      this.$el.append(template())

      for (var i = 0; i < weekBools.length; i++) {
        var d = new DaysCol(this[weekBools[i]])
        var weekView = new WeekView({ collection: d });
        this.$el.append(weekView.render().el);
      }

      return this;
    }
  });

  return DaysView
})