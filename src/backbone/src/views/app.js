'use strict';

define([
  'backbone',
  'underscore',
  'jquery',
  'collections/days',
  'collections/items',
  'views/day'], 
function (backbone, _, $, DayList, ItemList, DayView) {
  var AppView = Backbone.View.extend({
    el: $("#wrap"),

    events: {
      'click #decrementMonthButton': 'decrementMonth',
      'click #incrementMonthButton': 'incrementMonth'
    },

    decrementMonth: function () {
      console.log('dec')
    },

    incrementMonth: function () {
      console.log('inc')
    },

    initialize: function () {
      
      var Days = new DayList();
      this.listenTo(Days, 'all', this.render);

      var Items = new ItemList();

      this.listenTo(Items, 'add', function (val) {
        console.log(val)
      });
      
      Items.fetch();
    },

    render: function () {
      var day = new DayView({
        el: "#calendar",
        model: {
          displayDate: "Hi",
          items: [
            {
              title: "there"
            }
          ]
        }
      })
      day.render();
    }
  });



  var app = new AppView();
  app.render();
});
