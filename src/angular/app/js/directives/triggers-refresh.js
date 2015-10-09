'use strict';

angular.module( 'calendar' ).directive( 'triggersRefresh', function () {
  return { 
    link: function ( scope, elem ) {
      $( elem ).click( function () {
        scope.$broadcast( 'refreshing' );
      } );
    }
  };
} );