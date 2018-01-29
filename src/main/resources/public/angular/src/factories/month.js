'use strict';

var angular = require('angular');
var moment = require('moment');

angular.module( 'calendar' ).factory( 'Month', function () {
  return function ( params ) {
    var now = moment( [ params.month, '15', params.year ].join( '/' ), 'MM/DD/YYYY' );

    var next          = now.clone().add( 1, 'month' );
    var previous      = now.clone().subtract( 1, 'month' );
    var calendarStart = moment( now ).startOf( 'month' ).startOf( 'week' );
    var calendarEnd   = moment( now ).endOf( 'month' ).endOf( 'week' );

    // number of days between calendarStart and calendarEnd
    var tRange = calendarEnd.valueOf() - calendarStart.valueOf();
    var daysInView = Math.min( Math.floor( moment.duration( tRange ).asDays() ), 34);
    var weekCount = (daysInView + 1) / 7;

    var days = [];

    for (var i = 0; i <= daysInView; i++) {
          
      // Get a moment object for this day
      days.push( moment( calendarStart ).add( i, 'days' ).toISOString() );

    }
    
    return {
      current  : now.toISOString(),
      next     : next.toISOString(),
      previous : previous.toISOString(),
      days     : days,
      weekCount: weekCount
    }
  }
} );