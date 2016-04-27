'use strict';

var angular = require('angular');

angular.module( 'calendar' ).factory( 'Items', [ '$resource', function ( $resource )  {
  return $resource( 'data-store/:year/:month.json', {}, { 
    query: {
      method: 'GET',
      params: {
        year: 'year',
        month: 'month'
      },
      isArray: true,
      transformResponse: function ( data ) {
        return angular.fromJson( data ).map( function ( item ) {
          return angular.extend( item, {
            key: item.title.replace( /\s/g, '-' )
          } );
        } );
      }
    }
  } );
} ] );