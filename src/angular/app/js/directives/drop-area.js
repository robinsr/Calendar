'use strict';

angular.module( 'calendar' ).directive( 'dropArea', function () {
  return { 
    link: function ( scope, elem ) { 
      var day = scope.day;
      var items = scope.$parent.items;

      var $elem = $( elem );

      $elem.on( 'dragover', function ( e ) {
        e.preventDefault();
      } );

      $elem.on( 'dragenter', function ( e ) {
        e.preventDefault();
      } );

      $elem.on( 'drop', function ( e ) {
        var data = e.originalEvent.dataTransfer.getData( 'calendar' );
        for (var i = 0; i < items.length; i++) {
          if ( items[i].$$hashKey === data ) {
            items[i].date = day.date;
            scope.$parent.$digest();
            break;
          }
        };
      } );
    }
  };
} );