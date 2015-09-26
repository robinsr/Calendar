'use strict';

define(
  [
    'jquery',
    'backbone',
    'fancybox',
    'hbs!templates/item'
  ], 
  function ( $, backbone, Fancybox, template ) {

    var modalItemView = Backbone.View.extend( {

    tmpl: template,

    initialize: function () {
      backbone.on('item:click', this.handleItemClick.bind( this ) );
    },

    render: function ( model ) {
      this.$el.empty().html( this.tmpl( model.toJSON() ) );
      return this;
    },

    handleItemClick: function ( data ) {
      this.render( this.collection.get( data.model ) );

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
