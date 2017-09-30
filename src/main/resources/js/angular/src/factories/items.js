'use strict';

var angular = require('angular');

angular.module( 'calendar' ).factory( 'Items', [ '$resource', function ( $resource )  {
  return $resource( '/appointments/:id', { id:'@id' }, { 
    query: {
      url: '/appointments/:year/:month',
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