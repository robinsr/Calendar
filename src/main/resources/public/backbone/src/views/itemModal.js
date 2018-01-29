'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var template = require('../templates/item.hbs');

module.exports = Backbone.View.extend( {

  tmpl: template,

  initialize: function () {
    Backbone.on('item:click', this.handleItemClick.bind( this ) );
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