riot.mixin( 'days', {
    getDays: function ( date, items ) {

        var month         = moment( date ).month();
        var calendarStart = moment( date ).startOf( 'month' ).startOf( 'week' );
        var calendarEnd   = moment( date ).endOf( 'month' ).endOf( 'week' );
        var monthStart    = moment( date ).startOf( 'month' ).toISOString();
        var monthEnd      = moment( date ).endOf( 'month' ).toISOString();

        // number of days between calendarStart and calendarEnd
        var tRange = calendarEnd.valueOf() - calendarStart.valueOf();
        var daysInView = Math.min( Math.floor( moment.duration( tRange ).asDays() ), 34);

        // Get an array of calendar items for this date range ( reduces
        // the number of items we will need to iterate over later )
        var monthItems = items.filter( function ( item ) {
          return moment( item.date ).isBetween( calendarStart, calendarEnd );
        } );

        // Stores each day's data
        var days = [];

        // iterate 35 times ( 5 weeks of 7 days each )
        for (var i = 0; i <= daysInView; i++) {
          
            // Get a moment object for this day
            var dayMoment = moment( calendarStart ).add( i, 'days' );

            // Get an array of calendar items for this day
              var itemsForThisDay = monthItems.filter( function ( item ) {
                return moment( item.date ).dayOfYear() == dayMoment.dayOfYear()
              } );

            // Create a Day model 
            var dayModel = {
                isInMonthRange: dayMoment.month() === month,
                iso: dayMoment.toISOString(),
                items: itemsForThisDay
            };

            days.push( dayModel );
        };

        return days;
    }
} );