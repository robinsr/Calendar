'use strict';

angular.module( 'calendar' ).controller( 'MonthController', [ '$scope', '$routeParams', 'Items', 'Month',
  function ( $scope, $routeParams, Items, Month ) {

    angular.extend( $scope, Month( {
      year: $routeParams.year,
      month: $routeParams.month
    } ) );

    $scope.items = Items.query( {
      year: $routeParams.year,
      month: $routeParams.month
    } );

    function setItemDetail () {
      if ( $routeParams.item ) {
        $scope.itemDetail = $scope.items.filter( function ( item ) {
          return item.key === $routeParams.item
        } )[ 0 ];
      } else {
        $scope.itemDetail = null;
      }
    }

    $scope.items.$promise.then( setItemDetail );
    $scope.$on('$routeUpdate', setItemDetail ); 
    setItemDetail();
    
  } ] );