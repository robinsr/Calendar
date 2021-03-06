'use strict';

var angular = require('angular');
var moment = require('moment');

angular.module( 'calendar' ).filter( 'monthClass', function () {
  return function ( input, current ) {
    var inMonth = moment( input ).format( 'M' ) === moment( current ).format( 'M' );
    return inMonth ? 'this-month': 'other-month';
  };
} );
