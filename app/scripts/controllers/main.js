'use strict';

angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', 'venueService', function ($scope, $http, venueService) {
    
    $scope.input = {
      venuesResource: {},
      boroughs: ['bronx', 'brooklyn', 'queens', 'manhattan']
    };

    $scope.output = {
      venuesMeta: {}
    };

    // Local instance for code-readability
    var boroughs = $scope.input.boroughs;

    // Fetch the venues using the service that returns an ngResource
    $scope.input.venuesResource = venueService().get(function() {
      // On resolved promise, setup various $watch
      // These $watch calls are performed on selectors in the DOM

      $scope.$watch ('boroughSelector', function(newBorough) {
        if (newBorough && newBorough.length) {
          $scope.output.venuesMeta = {};

          for (var i = 0; i < newBorough.length; i++) {
            $scope.output.venuesMeta[newBorough[i]] = $scope.input.venuesResource[newBorough[i]].response.groups[0].items;
          }
        } else {
          // Select all boroughs
          for (var i = 0; i < boroughs.length; i++) {
            $scope.output.venuesMeta[boroughs[i]] = $scope.input.venuesResource[boroughs[i]].response.groups[0].items;
          }
        }
      });
    });

    // Computed Properties
    $scope.venuesCount = function() {
      var count = 0;
      var boroughs = $scope.input.boroughs;
      for (var i = 0; i < boroughs.length; i++) {
        if ($scope.output.venuesMeta[boroughs[i]]) {
          count += $scope.output.venuesMeta[boroughs[i]].length;
        }
      }
      return count;
    }
  }
  ]));
