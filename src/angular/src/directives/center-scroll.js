'use strict';

var $ = require('jquery');
var angular = require('angular');

angular.module( 'calendar' ).directive( 'centerScroll', function () {
  return { 
    link: function ( scope, elem ) {
      var $elem = $( elem );

      var scrollTo = ( $elem.height() / 120 ) * 10;
      
      $elem.animate( {
        scrollTop:  scrollTo
      } );
    }
  };
} );