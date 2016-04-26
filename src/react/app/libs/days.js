import moment from 'moment';

export default function getDays (now, allItems) {
  var month         = moment( now ).month();
  var calendarStart = moment( now ).startOf( 'month' ).startOf( 'week' );
  var calendarEnd   = moment( now ).endOf( 'month' ).endOf( 'week' );
  var monthStart    = moment( now ).startOf( 'month' ).toISOString();
  var monthEnd      = moment( now ).endOf( 'month' ).toISOString();

  // number of days between calendarStart and calendarEnd
  var tRange = calendarEnd.valueOf() - calendarStart.valueOf();
  var daysInView = Math.min( Math.floor( moment.duration( tRange ).asDays() ), 34);

  // Get an array of calendar items for this date range ( reduces
  // the number of items we will need to iterate over later )
  var monthItems = allItems.filter(item => {
    return moment( item.date ).isBetween( calendarStart, calendarEnd );
  } );

  // Stores each day's html content
  var days = [];

  // iterate 35 times ( 5 weeks of 7 days each )
  for (var i = 0; i <= daysInView; i++) {

    // Get a moment object for this day
    var dayMoment = moment( calendarStart ).add( i, 'days' );

    // Get an array of calendar items for this day
    var items = monthItems.filter(item => {
      return moment( item.date ).dayOfYear() == dayMoment.dayOfYear()
    } );

    days.push({
      moment: dayMoment,
      isInMonthRange: dayMoment.month() === month,
      items
    });
  }

  return days;
};