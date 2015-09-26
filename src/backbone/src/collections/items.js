'use strict';

define(['backbone', 'models/item'], function (backbone, Item) {
  return backbone.Collection.extend({

    model: Item,

    url: '/common/items.json',

    initialize: function () {
      // Setup event listener to handle drop events.
      // Finds the dropped event and updates its date model property
      backbone.on( 'item:drop', function ( data ) {
        var droppedItem = this.get( data.model );

        if ( !droppedItem ) {
          return;
        }

        droppedItem.set( 'date', data.newDate );
      }.bind( this ) );
    }

  });
});