'use strict';

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
      var dayMoment = moment( calendarStart ).add( i, 'days' );

      days.push( {
        date: dayMoment.format( 'M/D/YYYY' ),
        displayDate: dayMoment.format( 'Do' ),
        className: dayMoment.format( 'M' ) === params.month ? 'this-month' : 'other-month'
      } );
    }

    var headers = [];
    var n = 0;
    while ( n < 7 ) {
      console.log(headers)
      headers.push( calendarStart.format( 'dddd' ) );
      calendarStart.add( 1, 'days' );
      n++;
    }
    
    return {
      current: {
        year: now.format( 'YYYY' ),
        month: now.format( 'M' )
      },
      next: {
        year: next.format( 'YYYY' ),
        month: next.format( 'M' )
      }, 
      previous: {
        year: previous.format( 'YYYY' ),
        month: previous.format( 'M' )
      },
      monthName: now.format( 'MMMM' ),
      yearName: now.format( 'YYYY' ),
      days: days,
      pageTitle: now.format( 'MMMM' ) + ', ' + now.format( 'YYYY' ),
      headers: headers,
      weekCount: weekCount
    }
  }
} );