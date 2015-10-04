'use strict';

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

    $rootScope.pageTitle = $scope.pageTitle;

    $scope.items = Items.query( {
      year: $routeParams.year,
      month: $routeParams.month
    } );

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
        $rootScope.pageTitle = $scope.pageTitle;
      }
    }

    $scope.items.$promise.then( setItemDetail );
    $scope.$on('$routeUpdate', setItemDetail ); 
    setItemDetail();
    
  } ] );