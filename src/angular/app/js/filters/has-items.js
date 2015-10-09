'use strict';

angular.module( 'calendar' ).filter( 'hasItems', function () {
  return function ( days, items ) {
    return days.filter( function ( day ) {
      return items.filter( function ( item ) {
        return item.date === moment( day ).format( 'M/D/YYYY' );
      } ).length > 0;
    } );
  };
} );
