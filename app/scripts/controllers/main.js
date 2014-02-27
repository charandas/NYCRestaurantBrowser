'use strict';

function casecmp(a, b) {
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }

  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }

  return 0;
}

angular.module('myApp')
  .controller('MainCtrl', (['$scope', '$http', '$resource', '$filter',
    function ($scope, $http, $resource, $filter) {

    // Source the filters
    var boroughFilter = $filter('boroughFilter');
    var categoryFilter = $filter('categoryFilter');
    var nameFilter = $filter('nameFilter');
    var paginateFilter = $filter('paginateFilter');
    
    $scope.input = {
      boroughs: ['bronx', 'brooklyn', 'manhattan', 'queens'],
      categories: ['asian', 'sandwiches', 'thai', 'american', 'cuban', 'italian', 'diner', 'seafood',
                   'south american', 'café', 'BBQ', 'ice cream', 'gastropub', 'bakery', 'greek', 'ramen / noodles',
                   'vegetarian / vegan', 'latin american', 'new american', 'french', 'pizza'].sort(casecmp)
    };

    $scope.input.pageSize = 20;
    
    $scope.output = {
      currentPage: 0,
      venuesMeta: {}
    };

    $scope.output.numPages = function() {
      return Math.ceil($scope.output.groupedResults().length / $scope.input.pageSize);
    };

    $scope.output.pages = function() {
      if (!$scope.output.groupedResults()) {
        return {first: ['1'], second: []};
      }

      var pages = {first: [], second: []};
      var page;

      for(page = 0; page < $scope.output.currentPage; page++) {
        pages.first.push((page+1).toString());
      }

      for(page = $scope.output.currentPage + 1; page < $scope.output.numPages(); page++) {
        pages.second.push((page+1).toString());
      }

      return pages;
    };

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
    };

    $scope.prevPage = function () {
      if ($scope.output.currentPage === 0) {
        return;
      }
      $scope.output.currentPage -= 1;
    };

    $scope.nextPage = function () {
      if ($scope.output.numPages() === 0) {
        return;
      }

      if ($scope.output.currentPage === ($scope.output.numPages() - 1)) {
        return;
      }

      $scope.output.currentPage += 1;
    };

    // Fetch the venues
    $scope.output.venuesMeta = $resource('api/venues', {}, {}).query();

    $scope.$watch('output.groupedResults().length', function() {
      $scope.output.currentPage = 0;
    });
  }
  ]));