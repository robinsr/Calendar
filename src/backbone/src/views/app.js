'use strict';

define(
  [
    'backbone',
    'moment',
    'collections/items',
    'views/monthView'
  ], 
  function ( backbone, moment, ItemList, MonthView ) {

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

    var app = new MonthView( {
      el: '#wrap',
      model: new AppModel( {
        date: now,
        weekOffset: weekOffset 
      } )
    } );

    items.fetch();

  }
);
