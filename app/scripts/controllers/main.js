'use strict';

angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', 'venueService', function ($scope, $http, venueService) {
    
    $scope.input = {
      venuesResource: {},
      boroughs: ['bronx', 'brooklyn', 'queens', 'manhattan'],
      categories: ['asian', 'sandwiches', 'thai', 'american', 'cuban', 'italian', 'diner', 'seafood',
                   'south american', 'café', 'BBQ', 'ice cream', 'gastropub', 'bakery', 'greek', 'ramen / noodles',
                   'vegetarian / vegan', 'latin american', 'new american', 'french', 'pizza']
    };

    $scope.output = {
      venuesMeta: {}
    };

    // Local instances for code-readability
    var boroughs = $scope.input.boroughs;

    // Fetch the venues using the service that returns an ngResource
    $scope.input.venuesResource = venueService().query(function() {
      // On resolved promise, setup initial state
      $scope.output.venuesMeta = $scope.input.venuesResource;      
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
