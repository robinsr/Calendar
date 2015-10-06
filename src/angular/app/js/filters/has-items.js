'use strict';

angular.module( 'calendar' ).filter( 'hasItems', function () {
  return function ( days, items ) {
    return days.filter( function ( day ) {
      return items.filter( function ( item ) {
        return item.date === day.date
      } ).length > 0;
    } );
  };
} );
