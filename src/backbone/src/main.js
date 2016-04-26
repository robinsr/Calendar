'use strict';

var $ = require('jquery');
var _ = require('underscore');
var fancybox = require('fancybox');
var Backbone = require('backbone');
var moment = require('moment');
var ItemList = require('./collections/items');
var MonthView = require('./views/month');
var ItemModalView = require('./views/itemModal');
var AboutModal = require('./views/aboutModal');

// setup fancybox
fancybox($);

// Use backbone as an event emitter for coordinating views
_.extend( Backbone, Backbone.Events );

var items = new ItemList();

var AppModel = Backbone.Model.extend( {
  defaults: {
    date: null,
    weekOffset: null,
    items: items
  }
} );

var now = moment().toISOString();

var weekOffset = moment( now ).startOf( 'month' ).week();

var calendar = new MonthView( {
  el: '#wrap',
  model: new AppModel( {
    date: now,
    weekOffset: weekOffset 
  } )
} );

var modal = new ItemModalView( {
  el: '#eventDetails',
  collection: items
} );

var about = new AboutModal( {
  el: '#about'
} );

items.fetch();