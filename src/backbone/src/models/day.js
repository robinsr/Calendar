'use strict';

var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Model.extend({
  defaults: { 
    date: null,
    displayDate: null,
    items: [],
    isRendered: false
  },

  // Sets the 'displayDate' model property
  initialize: function ( model ) {
    if ( !model.date ) return;
    this.set( 'displayDate', moment( model.date ).format( 'D' ) );
    return this;
  }
});