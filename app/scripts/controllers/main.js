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

    // Fetch the venues using the service that returns an ngResource
    $scope.input.venuesResource = venueService().get(function() {
      // On resolved promise, setup various $watch
      // These $watch calls are performed on selectors in the DOM

      $scope.$watch ('input.boroughSelector', function(newBoroughs) {
        if ($scope.input.categorySelector) {
          resetVenuesMetaForCategory($scope, newBoroughs, $scope.input.categorySelector);
        } else {
          resetVenuesMeta($scope, newBoroughs);
        }
      });

      $scope.$watch('input.categorySelector', function(newCategories) {
        // First we restore state for selected boroughs, then filter by category
        if (newCategories && newCategories.length) {
          resetVenuesMetaForCategory($scope, $scope.input.boroughSelector, newCategories)
        } else {
          resetVenuesMeta($scope, $scope.input.boroughSelector);
        }
      });
    });

    // Private functions
    function resetVenuesMeta($scope, boroughs) {
      var _boroughs;

      if (boroughs && boroughs.length) {
        _boroughs = boroughs;
      } else {
        _boroughs = $scope.input.boroughs;
      }

      $scope.output.venuesMeta = {};

      for (var i = 0; i < _boroughs.length; i++) {
        $scope.output.venuesMeta[_boroughs[i]] = angular.copy($scope.input.venuesResource[_boroughs[i]].response.groups[0].items);
      }
    }

    function resetVenuesMetaForCategory($scope, boroughs, newCategories) {
      var _boroughs;
      if (boroughs) {
        _boroughs = boroughs;
      } else {
        _boroughs = $scope.input.boroughs;
      }

      $scope.output.venuesMeta = {};

      for (var i = 0; i < _boroughs.length; i++) {
        var newItems = angular.copy($scope.input.venuesResource[_boroughs[i]].response.groups[0].items);

        for(var j = newItems.length - 1; j >= 0; j--) {
          if(newCategories.indexOf(newItems[j].venue.categories[0].shortName.toLowerCase()) === -1) {
            newItems.splice(j, 1);
          }
        }
        $scope.output.venuesMeta[_boroughs[i]] = newItems;
      }
    }

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
