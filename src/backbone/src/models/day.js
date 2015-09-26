'use strict';

define( [ 'backbone', 'moment' ], function ( backbone, moment ) {
  
  return backbone.Model.extend({
    defaults: { 
      date: null,
      displayDate: null,
      items: []
    },

    // Sets the 'displayDate' model property
    initialize: function ( model ) {
      if ( !model.date ) return;
      this.set( 'displayDate', moment( model.date ).format( 'D' ) );
      return this;
    }
  } );
} );