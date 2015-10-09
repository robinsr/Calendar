'use strict';

angular.module( 'calendar' ).filter( 'formatDate', function () {
  return function ( input, format ) {
    if ( typeof input === 'number' ) {
      return moment().day( input ).format( format );
    }
    return moment( input ).format( format );
  };
} );
