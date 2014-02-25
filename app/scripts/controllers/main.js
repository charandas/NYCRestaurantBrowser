'use strict';

angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', 'venueService', function ($scope, $http, venueService) {
    
    $scope.input = {
      venuesResource: {},
      boroughs: ['bronx', 'brooklyn', 'queens', 'manhattan'],
      categories: ['asian', 'sandwitches', 'thai', 'american', 'cuban', 'italian', 'diner', 'seafood',
                   'south american', 'café', 'BBQ', 'ice cream', 'gastropub', 'bakery', 'greek', 'ramen / noodles',
                   'vegetarian / vegan', 'latin american', 'new american', 'french', 'pizza']
    };

    $scope.output = {
      venuesMeta: {}
    };

    // Local instances for code-readability
    var boroughs = $scope.input.boroughs;
    var categories = $scope.input.categories;

    // Fetch the venues using the service that returns an ngResource
    $scope.input.venuesResource = venueService().get(function() {
      // On resolved promise, setup various $watch
      // These $watch calls are performed on selectors in the DOM

      $scope.$watch ('input.boroughSelector', function(newBoroughs) {
        if (newBoroughs && newBoroughs.length) {
          $scope.output.venuesMeta = {};

          for (var i = 0; i < newBoroughs.length; i++) {
            $scope.output.venuesMeta[newBoroughs[i]] = angular.copy($scope.input.venuesResource[newBoroughs[i]].response.groups[0].items);
          }
        } else {
          // Select all boroughs
          for (var i = 0; i < boroughs.length; i++) {
            $scope.output.venuesMeta[boroughs[i]] = angular.copy($scope.input.venuesResource[boroughs[i]].response.groups[0].items);
          }
        } 
      });

      $scope.$watch('input.categorySelector', function(newCategories) {
        // First we restore state for selected boroughs, then filter by category
        if (newCategories && newCategories.length) {
          if ($scope.input.boroughsSelector) {
            // Look for any current borough selection
            var currentBoroughs = $scope.input.boroughSelector;

            $scope.output.venuesMeta = {};

            for (var i = 0; i < currentBoroughs.length; i++) {
              var newItems = angular.copy($scope.input.venuesResource[currentBoroughs[i]].response.groups[0].items);

              for(var j = newItems.length - 1; j >= 0; j--) {
                if(newCategories.indexOf(newItems[j].venue.categories[0].shortName.toLowerCase()) === -1) {
                  newItems.splice(j, 1);
                }
              }
              $scope.output.venuesMeta[currentBoroughs[i]] = newItems;
            }
          } else {
            // Select all boroughs
            for (var i = 0; i < boroughs.length; i++) {
              var newItems = angular.copy($scope.input.venuesResource[boroughs[i]].response.groups[0].items);

              for(var j = newItems.length - 1; j >= 0; j--) {
                if(newCategories.indexOf(newItems[j].venue.categories[0].shortName.toLowerCase()) === -1) {
                  newItems.splice(j, 1);
                }
              }
              $scope.output.venuesMeta[boroughs[i]] = newItems;
            }
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
