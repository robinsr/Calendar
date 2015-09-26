'use strict';

define(
  [
    'jquery',
    'backbone',
    'fancybox',
  ], 
  function ( $, backbone, Fancybox ) {

    var modalItemView = Backbone.View.extend( {

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

  return modalItemView;
} );
