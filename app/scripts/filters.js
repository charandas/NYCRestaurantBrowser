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

function filterByBorough(venuesMeta, boroughs) {
  if (!boroughs || (boroughs.length === 0)) {
    return venuesMeta;
  }

  return venuesMeta.filter(function(meta, index, array) {
    for (var i = 0; i < boroughs.length; i++) {
      if (meta.venue.location.city === upcase(boroughs[i])) {
        return true;
      }
    }

    return false;
  });
}

function filterByCategory(venuesMeta, categories) {
  if (!categories || (categories.length === 0)) {
    return venuesMeta;
  }

  return venuesMeta.filter(function(meta, index, array) {
    for (var i = 0; i < categories.length; i++) {
      if (meta.venue.categories[0].shortName.toLowerCase() === categories[i].toLowerCase()) {
        return true;
      }
    }

    return false;
  });
}

function filterByName(venuesMeta, name) {
  if (!name || name.length < 3) {
    return venuesMeta;
  }

  var names = name.split(' ');

  return venuesMeta.filter(function(meta, index, array) {
    for (var i = 0; i < names.length; i++) {
      var lhs = meta.venue.name.toLowerCase();
      var rhs = names[i].toLowerCase();
      if(lhs.indexOf(rhs) !== -1) {
        return true;
      }
    }

    return false;
  });
}

function upcase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}