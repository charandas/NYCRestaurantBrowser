'use strict';

angular.module('myApp')
  .factory('venueService', function($resource) {
    return function() {
          return $resource('api/venues');
        };
  });