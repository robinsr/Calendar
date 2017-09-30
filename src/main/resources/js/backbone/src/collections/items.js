'use strict';

var Backbone = require('backbone');
var Item = require('../models/item');

module.exports =  Backbone.Collection.extend({

  model: Item,

  url: '/appointments/all',

  initialize: function () {
    // Setup event listener to handle drop events.
    // Finds the dropped event and updates its date model property
    Backbone.on( 'item:drop', ( data ) => {
      var droppedItem = this.get( data.model );

      if ( !droppedItem ) {
        return;
      }

      droppedItem.set( 'date', data.newDate ).save();
    });
  },

  fetchInitial: function () {
    this.sync( 'read', this, {
      success: ( resp ) => {
        this.reset( resp );
      }
    });
  }

});