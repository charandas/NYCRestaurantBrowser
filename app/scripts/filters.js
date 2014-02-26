'use strict';

angular.module('myApp')
.filter('upcase', function() {
  return upcase;
})
.filter('byBoroughAndCategoryAndName', function() {
  return function(venuesMeta, input) {
    var borough = input.boroughSelector;
    var category = input.categorySelector;
    var name = input.nameSelector;

    if (borough) {
      venuesMeta = filterByBorough(venuesMeta, borough);
    }

    if (venuesMeta.length && category) {
      venuesMeta = filterByCategory(venuesMeta, category);
    }

    if (venuesMeta.length && name) {
      venuesMeta = filterByName(venuesMeta, name); 
    }

    return venuesMeta;
 }     
});

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
  if (!name || name.length < 2) {
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