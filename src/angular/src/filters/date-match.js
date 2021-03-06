'use strict';

var angular = require('angular');
var moment = require('moment');

angular.module( 'calendar' ).filter( 'dateMatch', function () {
  return function ( items, day ) {
    return items.filter( function ( item ) {
      return item.date === moment( day ).format( 'M/D/YYYY' );
    } );
  };
} );
