'use strict';

var angular = require('angular');
var moment = require('moment');

angular.module( 'calendar' ).controller( 'MonthController', [ 
  '$scope', 
  '$rootScope', 
  '$routeParams', 
  'Items', 
  'Month',
  function ( $scope, $rootScope, $routeParams, Items, Month ) {

    angular.extend( $scope, Month( {
      year: $routeParams.year,
      month: $routeParams.month
    } ) );

    $rootScope.pageTitle = moment($scope.current).format('MMMM[, ]YYYY');

    $scope.items = Items.query( {
      year: $routeParams.year,
      month: $routeParams.month
    } );

    $scope.moveAppointment = function (id, date) {
      let item = $scope.items.find(i => i.id == id);
      item.date = date;
      item.$save();
    };

    function setItemDetail () {
      if ( $routeParams.item ) {
        $scope.itemDetail = $scope.items.filter( function ( item ) {
          return item.key === $routeParams.item
        } )[ 0 ];

        if ( $scope.itemDetail ) {
          $rootScope.pageTitle = $scope.itemDetail.title;
        }

      } else {
        $scope.itemDetail = null;
        $rootScope.pageTitle = moment($scope.current).format('MMMM[, ]YYYY');
      }
    }

    $scope.items.$promise.then( setItemDetail );
    $scope.$on('$routeUpdate', setItemDetail ); 
    setItemDetail();
    
  } ] );