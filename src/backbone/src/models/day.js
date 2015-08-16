'use strict';

define( [ 'backbone', 'moment' ], function ( backbone, moment ) {
  
  return backbone.Model.extend({
    defaults: { 
      date: null,
      dayOfWeek: null,
      weekOfYear: null,
      weekOffset: null,
      displayDate: null,
      items: []
    },

    initialize: function ( model ) {
      if ( !model.date ) return;

      var now = moment( model.date );

      this.set( 'weekOfYear', now.week() );
      this.set( 'dayOfWeek', now.day() );

      this.set( 'positionX', now.day() );
      this.set( 'positionY', now.week() - model.weekOffset );

      this.set( 'displayDate', now.format( 'D' ) );
      return this;
    }
  } );
} );