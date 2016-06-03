'use strict';

var $ = require('jquery');
var angular = require('angular');
var moment = require('moment');

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
        var itemId = e.originalEvent.dataTransfer.getData( 'calendar' );
        scope.moveAppointment(itemId, moment(day).format('M/D/YYYY'))
        // for (var i = 0; i < items.length; i++) {
        //   if ( items[i].$$hashKey === data ) {
        //     items[i].date = ;
        //     scope.$parent.$digest();
        //     break;
        //   }
        // };
      } );
    }
  };
} );