'use strict';

angular.module('myApp')
.filter('upcase', function() {
  return upcase;
})
.filter ('boroughFilter', function() {
  return filterByBorough;
})
.filter ('categoryFilter', function() {
  return filterByCategory;
})
.filter ('nameFilter', function() {
  return filterByName;
})
.filter('paginateFilter', ['$filter', function ($filter) {
   return function(input, currentPage, pageSize) {
      if (input instanceof Array) {
          return $filter('limitTo')(input.slice(currentPage * pageSize), pageSize);
      }
   } 
}]);

function filterByBorough(venuesMeta, borough) {
  if (!borough) {
    return venuesMeta;
  }

  return venuesMeta.filter(function(meta, index, array) {
    return meta.venue.location.city === upcase(borough);
  });
}

function filterByCategory(venuesMeta, category) {
  if (!category) {
    return venuesMeta;
  }

  return venuesMeta.filter(function(meta, index, array) {
    return meta.venue.categories[0].shortName.toLowerCase() === category.toLowerCase();
  });
}

function filterByName(venuesMeta, name) {
  if (!name || name.length < 3) {
    return venuesMeta;
  }

  return venuesMeta.filter(function(meta, index, array) {
    var lhs = meta.venue.name.toLowerCase();
    var rhs = name.toLowerCase();
    return lhs.indexOf(rhs) !== -1;
  });
}

function upcase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}