'use strict';

angular.module( 'calendar' ).directive( 'sequenceRender', function () {
  return { 
    link: function ( scope, elem ) {
      var delay = scope.$index * 25;
      setTimeout( function () {
        $( elem ).addClass( 'in' );
      }, delay );

      scope.$on( 'refreshing', function () {
        console.log('here')
      } )

    }
  };
} );