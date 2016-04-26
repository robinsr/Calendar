'use strict';

var Backbone = require('backbone');
var Item = require('../models/item');

module.exports =  Backbone.Collection.extend({

  model: Item,

  url: '/common/data/items.json',

  initialize: function () {
    // Setup event listener to handle drop events.
    // Finds the dropped event and updates its date model property
    Backbone.on( 'item:drop', function ( data ) {
      var droppedItem = this.get( data.model );

      if ( !droppedItem ) {
        return;
      }

      droppedItem.set( 'date', data.newDate );
    }.bind( this ) );
  }

});