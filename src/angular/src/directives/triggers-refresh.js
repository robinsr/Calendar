'use strict';

var $ = require('jquery');
var angular = require('angular');

angular.module( 'calendar' ).directive( 'triggersRefresh', function () {
  return { 
    link: function ( scope, elem ) {
      $( elem ).click( function () {
        scope.$broadcast( 'refreshing' );
      } );
    }
  };
} );