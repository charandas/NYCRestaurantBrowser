'use strict';

angular.module('myApp')
.filter('upcase', function() {
  return upcase;
})
.filter('byBoroughAndCategory', function() {
  return function(venuesMeta, input) {
    var borough = input.boroughSelector;
    var category = input.categorySelector;

    if (borough) {
      venuesMeta = filterByBorough(venuesMeta, borough);
    }

    if (venuesMeta.length && category) {
      venuesMeta = filterByCategory(venuesMeta, category);
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
    return meta.venue.categories[0].shortName.toLowerCase() === category;
  });
}

function upcase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}