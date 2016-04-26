'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var moment = require('moment');
var template = require('../templates/day.hbs');

module.exports =  Backbone.View.extend({

  tagName: 'li',

  className: 'day-container',

  events: {
    'click li.calendarItem'    : 'itemClicked',
    'dragstart li.calendarItem': 'handleDragstart',
    'drop div.Day'             : 'handleDrop'
  },

  tmpl: template,

  render: function () {
    this.$el.html( this.tmpl( this.model.toJSON() ) );

    this.$el.on("dragover", function (e) {
      e.preventDefault();
    });

    this.$el.on("dragenter", function (e) {
      e.preventDefault();
    });

    this.model.set( 'isRendered', true );

    return this;
  },

  itemClicked: function (e) {
    Backbone.trigger( 'item:click', {
      model: $( e.target ).data( 'cid' )
    } );
  },

  handleDragstart: function (e) {
    e.originalEvent.dataTransfer.setData( 'calendar', $( e.target ).data( 'cid' ) );
  },

  handleDrop: function (e) {
    var cid = e.originalEvent.dataTransfer.getData( 'calendar' );
    Backbone.trigger( 'item:drop', { 
      model: cid,
      newDate: moment( this.model.attributes.date ).format( 'M/D/YYYY' )
    } );
  },

  reveal: function () {
    this.$( '.Day' ).addClass( 'in' );
  },

  hide: function () {
    var $elem = this.$( '.Day' );
    $elem.addClass( 'out' );
    setTimeout( function () {
      $elem.removeClass( 'in out' );
    }, 1000 )
  }
});