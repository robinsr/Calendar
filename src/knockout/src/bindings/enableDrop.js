'use strict';

var ko = require('knockout');
var $ = require('jquery');
var _ = require('underscore');

var Item = require('../models/item');

ko.bindingHandlers.enableDrop = {
  init: function (elem, val, a, b, vm) {
    var app = vm.$root;

    var dropDay = val();
    var dateString = dropDay.dateString();

    elem.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    elem.addEventListener("dragenter", function (e) {
      e.preventDefault();
    });

    elem.addEventListener("drop", function (e) {
      var itemId = e.dataTransfer.getData("Calendar");
      var oldItem = _.find(app.items(), { id: itemId });
      var newItem = new Item({
        date: dateString,
        title: oldItem.title,
        time: oldItem.time,
        description: oldItem.description
      });
      app.items.remove(oldItem);
      app.items.push(newItem);
    });
  }
};