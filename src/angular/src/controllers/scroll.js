'use strict';

var angular = require('angular');

angular.module( 'calendar' ).controller( 'ScrollController', [
  '$scope', 
  '$rootScope', 
  '$routeParams', 
  'Items', 
  'Month',
  function ( $scope, $rootScope, $routeParams, Items, Month  ) {
    $scope.items = Items.query( {
      year: $routeParams.year,
      month: $routeParams.month
    } );
  } ] );