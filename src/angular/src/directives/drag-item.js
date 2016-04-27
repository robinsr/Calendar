'use strict';

var $ = require('jquery');
var angular = require('angular');

angular.module( 'calendar' ).directive( 'dragItem', function () {
  return { 
    link: function ( scope, elem ) {
      $( elem ).on( 'dragstart', function ( e ) {
        e.originalEvent.dataTransfer.setData( 'calendar', scope.item.$$hashKey );
      } );
    }
  };
} );