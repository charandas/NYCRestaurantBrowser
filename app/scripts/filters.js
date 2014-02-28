'use strict';

function upcase(string) {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterByBorough(venues, boroughs) {
  if (!boroughs || (boroughs.length === 0)) {
    return venues;
  }

  return venues.filter(function(venue) {
    for (var i = 0; i < boroughs.length; i++) {
      if (venue.location.city === upcase(boroughs[i])) {
        return true;
      }
    }

    return false;
  });
}

function filterByCategory(venues, categories) {
  if (!categories || (categories.length === 0)) {
    return venues;
  }

  return venues.filter(function(venue) {
    for (var i = 0; i < categories.length; i++) {
      if (venue.categories[0].shortName.toLowerCase() === categories[i].toLowerCase()) {
        return true;
      }
    }

    return false;
  });
}

function filterByName(venues, name) {
  if (!name || name.length < 3) {
    return venues;
  }

  var names = name.split(' ');

  return venues.filter(function(venue) {
    for (var i = 0; i < names.length; i++) {
      var lhs = venue.name.toLowerCase();
      var rhs = names[i].toLowerCase();
      if(lhs.indexOf(rhs) !== -1) {
        return true;
      }
    }

    return false;
  });
}

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
  };
}]);