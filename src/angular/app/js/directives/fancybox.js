'use strict';

angular.module( 'calendar' ).directive( 'fancybox', function () {
  return {
    link: function ( scope, elem ) {

      $.fancybox( {
        content: $( elem ),
        modal: true,
        hideOnContentClick: true,
        showCloseButton: true
      } );

      scope.$on( '$destroy', function () {
        $.fancybox.close();
      } );
    }
  };
} );