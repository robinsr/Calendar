'use strict';

define(
  [
    'underscore',
    'backbone',
    'moment',
    'collections/items',
    'views/month',
    'views/itemModal',
    'views/aboutModal'
  ], 
  function ( _, backbone, moment, ItemList, MonthView, ItemModalView, AboutModal ) {

    // Use backbone as an event emitter for coordinating views
    _.extend( backbone, backbone.Events );

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

  }
);
