'use strict';

angular.module('myApp')
.filter('upcase', function($rootScope) {
  return $rootScope.utils.upcase;
})
.filter ('boroughFilter', function($rootScope) {
  return $rootScope.utils.filterByBorough;
})
.filter ('categoryFilter', function($rootScope) {
  return $rootScope.utils.filterByCategory;
})
.filter ('nameFilter', function($rootScope) {
  return $rootScope.utils.filterByName;
})
.filter('paginateFilter', ['$filter', function ($filter) {
  return function(input, currentPage, pageSize) {
    if (input instanceof Array) {
      return $filter('limitTo')(input.slice(currentPage * pageSize), pageSize);
    }
  };
}]);
