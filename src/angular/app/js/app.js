'use strict';

var app = angular.module( 'calendar', [ 'ngRoute', 'ngResource', 'ngAnimate' ] );

app.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/:year/:month', {
    controller: 'MonthController',
    templateUrl: 'partials/month.html',
    reloadOnSearch: false
  } )
  .otherwise( {
    redirectTo: function () {
      return moment().format( 'YYYY/M' );
    }
  } );
} ] );