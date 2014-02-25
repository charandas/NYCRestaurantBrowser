'use strict';

angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', 'venueService', function ($scope, $http, venueService) {

    

    $scope.boroughs = ['bronx', 'brooklyn', 'queens', 'manhattan'];

    // Fetch the venues using the service that returns an ngResource
    $scope.venuesResource = venueService().get(function() {
      // On resolved promise, setup initial state
      $scope.borough = 'bronx';
      $scope.venuesMeta = $scope.venuesResource[$scope.borough].response.groups[0].items;

      // Register watch on select filter
      $scope.$watch ('borough', function(newBorough) {
        $scope.venuesMeta = $scope.venuesResource[$scope.borough].response.groups[0].items;
      });
    });
  }
  ]));
