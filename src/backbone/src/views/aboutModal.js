'use strict';

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend( {

  initialize: function () {
    $( '#aboutButton' ).click( this.handleAboutClick.bind( this ) );
  },

  handleAboutClick: function ( e ) {

    e.preventDefault();

    $.fancybox( {
      content: this.$el,
      modal: true,
      hideOnContentClick: true,
      showCloseButton: true
    } );

    $( ".closeModal" ).click(function(){
      $.fancybox.close();
    } );
  }    
} );
