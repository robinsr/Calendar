'use strict';

define( [
  'backbone',
  'lodash',
  'moment',
  'views/day',
  'models/day'
  ], 
  function ( backbone, _, moment, DayView, DayModel ) {

    var MonthView = Backbone.View.extend( {

      initialize: function () {
        this.model.bind( 'change:date', this.update, this );
        this.model.bind( 'change:date', this.render, this );

        this.model.attributes.items.bind( 'sync change:date', this.render, this );

        this.$monthBody = this.$el.find( '#month-body' );
        this.$monthName = this.$el.find( '#month-name' );
        this.$yearName  = this.$el.find( '#year-name' );

        this.update();
      },

      events: {
        'click #decrementMonthButton': 'decrementMonth',
        'click #incrementMonthButton': 'incrementMonth'
      },

      decrementMonth: function () {
        var now = this.model.get( 'date' );
        var next = moment( now ).subtract( 1, 'month' ).toISOString();

        this.model.set( 'date',  next );
      },

      incrementMonth: function () {
        var now = this.model.get( 'date' );
        var next = moment( now ).add( 1, 'month' ).toISOString();

        this.model.set( 'date',  next );
      },
      
      update: function () {
        var now = this.model.get( 'date' );
        this.$monthName.text( moment( now ).format( 'MMMM' ) );
        this.$yearName.text( moment( now ).format( 'YYYY' ) );
      },

      render: function () {

        // clear old items (should deconstruct views to prevent memory leaks)
        this.$monthBody.empty();

        var now = this.model.get( 'date' );

        var month         = moment( now ).month();
        var calendarStart = moment( now ).startOf( 'month' ).startOf( 'week' );
        var calendarEnd   = moment( now ).endOf( 'month' ).endOf( 'week' );
        var monthStart    = moment( now ).startOf( 'month' ).toISOString();
        var monthEnd      = moment( now ).endOf( 'month' ).toISOString();

        // Get an array of calendar items for this date range ( reduces
        // the number of items we will need to iterate over later )
        var items = this.model.attributes.items.filter( function ( item ) {
          return moment( item.attributes.date ).isBetween( calendarStart, calendarEnd );
        } );

        // Stores each day's html content
        var dayElems = [];

        // iterate 35 times ( 5 weeks of 7 days each )
        for (var i = 0; i <= 35; i++) {
          
          // Get a moment object for this day
          var dayMoment = moment( calendarStart ).add( i, 'days' );

          // Get an array of calendar items for this day
          var itemsForThisDay = _.filter( items, function ( item ) {
            return moment( item.attributes.date ).dayOfYear() == dayMoment.dayOfYear()
          } );

          // Create a Day model 
          var dayModel = new DayModel( {
            isInMonthRange: dayMoment.month() === month,
            date      : dayMoment.toISOString(),
            items     : itemsForThisDay
          } );

          // Create a Day View
          var d = new DayView( { 
            model: dayModel 
          } );

          dayElems.push( d.render().el );

        };

        // add new items
        this.$monthBody.append( dayElems );
      }
    } );

    return MonthView;
  }
);