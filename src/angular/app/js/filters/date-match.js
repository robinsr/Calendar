'use strict';

angular.module( 'calendar' ).filter( 'dateMatch', function () {
  return function ( items, day ) {
    return items.filter( function ( item ) {
      return item.date === day.date
    } );
  };
} );