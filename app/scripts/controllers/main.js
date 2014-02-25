'use strict';

angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', 'venueService', function ($scope, $http, venueService) {
    
    $scope.boroughs = ['bronx', 'brooklyn', 'queens', 'manhattan'];
    $scope.venuesMeta = {};

    // Fetch the venues using the service that returns an ngResource
    $scope.venuesResource = venueService().get(function() {
      // On resolved promise, setup initial state
      $scope.borough = 'bronx';
      $scope.venuesMeta[$scope.borough] = $scope.venuesResource[$scope.borough].response.groups[0].items;

      // Register watch on select filter
      $scope.$watch ('borough', function(newBorough) {
        if (newBorough) {
          // Clear-out any unselected boroughs
          for (var i = 0; i < $scope.boroughs.length; i++) {
            if ($scope.boroughs[i] != newBorough) {
              $scope.venuesMeta[$scope.boroughs[i]] = [];
            }
          }
          // Select newly selected borough
          $scope.venuesMeta[newBorough] = $scope.venuesResource[newBorough].response.groups[0].items;
        } else {
          // Select all boroughs
          for (var i = 0; i < $scope.boroughs.length; i++) {
            $scope.venuesMeta[$scope.boroughs[i]] = $scope.venuesResource[$scope.boroughs[i]].response.groups[0].items;
          }
        }
      });
    });

    $scope.venuesCount = function() {
      var count = 0;
      for (var i = 0; i < $scope.boroughs.length; i++) {
        if ($scope.venuesMeta[$scope.boroughs[i]]) {
          count += $scope.venuesMeta[$scope.boroughs[i]].length;
        }
      }
      return count;
    }
  }
  ]));
