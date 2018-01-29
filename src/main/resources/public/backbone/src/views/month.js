'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var moment = require('moment');
var DayView = require('./day');
var DayModel = require('../models/day');

module.exports = Backbone.View.extend( {

  initialize: function () {
    this.subviews = {};

    this.model.bind( 'change:date', this.updateHeader, this );
    this.model.bind( 'change:date', this.changeMonth, this );

    this.model.attributes.items.bind( 'change:date', this.updateItems, this );
    this.model.attributes.items.bind( 'reset', this.changeMonth, this );

    this.$monthBody = this.$el.find( '#month-body' );
    this.$monthName = this.$el.find( '#month-name' );
    this.$yearName  = this.$el.find( '#year-name' );

    this.updateHeader();
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
  
  updateHeader: function () {
    var now = this.model.get( 'date' );
    this.$monthName.text( moment( now ).format( 'MMMM' ) );
    this.$yearName.text( moment( now ).format( 'YYYY' ) );
  },

  updateItems: function () {
    this.reRender = true;
    this.render();
  },

  changeMonth: function () {
    this.reRender = false;
    this.render();
  },

  render: function ( model, reRender ) {

    // clear old items (should deconstruct views to prevent memory leaks)
    _.forEach( this.subviews, function ( view ) {
      view.remove();
      delete this.subviews[ view.model.cid ];
    }.bind( this ) );

    var now = this.model.get( 'date' );

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
    var items = this.model.attributes.items.filter( function ( item ) {
      return moment( item.attributes.date ).isBetween( calendarStart, calendarEnd );
    } );

    // Stores each day's html content
    var dayElems = [];

    // iterate 35 times ( 5 weeks of 7 days each )
    for (var i = 0; i <= daysInView; i++) {
      
      // Get a moment object for this day
      var dayMoment = moment( calendarStart ).add( i, 'days' );

      // Get an array of calendar items for this day
      var itemsForThisDay = _.filter( items, function ( item ) {
        return moment( item.attributes.date ).dayOfYear() == dayMoment.dayOfYear()
      } );

      // Create a Day model 
      var dayModel = new DayModel( {
        isRendered: this.reRender,
        isInMonthRange: dayMoment.month() === month,
        date      : dayMoment.toISOString(),
        items     : itemsForThisDay
      } );

      // Create a Day View
      this.subviews[ dayModel.cid ] = new DayView( { 
        model: dayModel 
      } );

      dayElems.push( this.subviews[ dayModel.cid ].render().el );

    };

    // add new items
    this.$monthBody.append( dayElems );

    if ( this.reRender ) {
      return;
    }

    // reveal
    var time = 0;
    _.forEach( this.subviews, function ( view ) {
      setTimeout( function () {
        view.reveal(); 
      }, time += 25 );
    } )
  }
} );