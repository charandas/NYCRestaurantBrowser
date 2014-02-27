'use strict';

angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', 'venueService', '$filter', 
    function ($scope, $http, venueService, $filter) {

    // Source the filters
    var boroughFilter = $filter('boroughFilter');
    var categoryFilter = $filter('categoryFilter');
    var nameFilter = $filter('nameFilter');
    var paginateFilter = $filter('paginateFilter');
    
    $scope.input = {
      venuesResource: {},
      boroughs: ['bronx', 'brooklyn', 'manhattan', 'queens'],
      categories: ['asian', 'sandwiches', 'thai', 'american', 'cuban', 'italian', 'diner', 'seafood',
                   'south american', 'café', 'BBQ', 'ice cream', 'gastropub', 'bakery', 'greek', 'ramen / noodles',
                   'vegetarian / vegan', 'latin american', 'new american', 'french', 'pizza'].sort(casecmp)
    };

    $scope.input.pageSize = 4;
    
    $scope.output = {
      currentPage: 0,
      venuesMeta: {}
    };

    $scope.output.numPages = function() {
      return Math.ceil($scope.output.groupedResults().length / $scope.input.pageSize);
    }

    $scope.output.pages = function() {
      if (!$scope.output.groupedResults())
        return {first: ['1'], second: []};

      var numPages = $scope.output.numPages();

      var pages = {first: [], second: []};
      for(var i = 0; i < $scope.output.currentPage; i++) {
        pages.first.push((i+1).toString());
      }

      for(var i = $scope.output.currentPage + 1; i < $scope.output.numPages(); i++) {
        pages.second.push((i+1).toString());
      }

      return pages;
    }

    $scope.output.groupedResults = function() {
      var result = boroughFilter($scope.output.venuesMeta, $scope.input.boroughSelector);
      result = categoryFilter(result, $scope.input.categorySelector);
      result = nameFilter(result, $scope.input.nameSelector);

      return result;
    };

    $scope.output.pagedResults = function() {
      return paginateFilter($scope.output.groupedResults(), $scope.output.currentPage, $scope.input.pageSize);
    };

    $scope.jumpToPage = function(page) {
      if (page >= 1 && page < $scope.output.pages())
      {
        $scope.output.currentPage = page - 1;
      }
    }

    $scope.prevPage = function () {
      if ($scope.output.currentPage === 0)
        return;
      $scope.output.currentPage -= 1;
    }

    $scope.nextPage = function () {
      if ($scope.output.numPages() === 0) {
        return;
      }

      if ($scope.output.currentPage === ($scope.output.numPages() - 1)) {
        return;
      }

      $scope.output.currentPage += 1;
    }

    // Local instances for code-readability
    var boroughs = $scope.input.boroughs;

    // Fetch the venues using the service that returns an ngResource
    $scope.input.venuesResource = venueService().query(function() {
      // On resolved promise, setup initial state
      $scope.output.venuesMeta = $scope.input.venuesResource;      
    });

    $scope.$watch('output.groupedResults().length', function(newResults) {
      $scope.output.currentPage = 0;
    });
  }
  ]));

function casecmp(a, b) {
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  return 0;
}