'use strict';

define( [
  'backbone',
  'underscore',
  'moment',
  'views/day',
  'models/day'
  ], 
  function ( backbone, _, moment, DayView, DayModel ) {

    var MonthView = Backbone.View.extend( {

      initialize: function () {
        this.model.bind( 'change:date', this.update, this );
        this.model.bind( 'change:date', this.render, this );

        this.model.attributes.items.bind( 'sync', this.render, this );

        this.$monthBody = this.$el.find( '#month-body' );
        this.$monthName = this.$el.find( '#month-name' );
        this.$yearName = this.$el.find( '#year-name' );

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

        this.model.set( 'weekOffset', moment( now ).startOf( 'month' ).week() );

        this.$monthName.text( moment( now ).format( 'MMMM' ) );
        this.$yearName.text( moment( now ).format( 'YYYY' ) );
      },

      render: function () {

        var weekOffset    = this.model.get( 'weekOffset' );
        var now           = moment( this.model.get( 'date' ) );
        var calendarStart = moment( this.model.get( 'date' ) ).startOf( 'month' ).startOf( 'week' );
        var monthStart      = moment( this.model.get( 'date' ) ).startOf( 'month' ).toISOString();
        var monthEnd    = moment( this.model.get( 'date' ) ).endOf( 'month' ).toISOString();

        this.$monthBody.empty();

        var items = this.model.attributes.items.filter( function ( item ) {
          var itemDate = moment( item.attributes.date );
          return now.month() == itemDate.month() && now.year() == now.year();
        } );

        var dayElems = [];

        for (var i = 0; i <= 35; i++) {
          
          var dayMoment = moment( calendarStart ).add( i, 'days' );
          var dateString = dayMoment.toISOString();

          var d = new DayView( {
            model: new DayModel( {
              isInMonthRange: dayMoment.isBetween( monthStart, monthEnd ),
              weekOffset: weekOffset,
              date: dateString,
              items: _.filter( items, function ( item ) {
                var itemMoment = moment( item.attributes.date );
                return itemMoment.date() == dayMoment.date()
              } )
            } )
          } );

          dayElems.push( d.render().el );

        };

        this.$monthBody.append( dayElems );
      }
    } );

    return MonthView;
  }
);