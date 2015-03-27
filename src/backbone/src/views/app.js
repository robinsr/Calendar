'use strict';

define([
  'backbone',
  'underscore',
  'jquery',
  'moment',
  'pubsub',
  'collections/days',
  'collections/items',
  'views/monthView',
  'hbs!templates/month'], 
function (backbone, _, $, moment, pubsub, DayList, ItemList, MonthView, template) {

  console.log(pubsub)

  var AppView = Backbone.View.extend({
    el: $("#wrap"),

    events: {
      'click #decrementMonthButton': 'decrementMonth',
      'click #incrementMonthButton': 'incrementMonth'
    },

    decrementMonth: function () {
      this.initialDate.subtract(1, 'month');
      this.render();
    },

    incrementMonth: function () {
      this.initialDate.add(1, 'month');
      this.render();
    },

    initialize: function () {
      var _this = this;
      this.initialDate = moment();
      this.template = template;
      this.Days = new DayList();
      window.pubSub = _.extend({},Backbone.Events);
      window.pubSub.on('click:item', function (item) {
        console.log('hello from app!')
      })
    },

    render: function () {
      this.Days.reset();
      this.Days.generateDays(this.initialDate);
      var d = new MonthView({ collection: this.Days })
      this.$("#calendar").html(d.render().el);
      this.$("#monthName").text(this.initialDate.format("MMMM"));
      this.$("#yearName").text(this.initialDate.format("YYYY"));
    }
  });

  var app = new AppView();
  app.render();
});
