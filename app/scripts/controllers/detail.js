'use strict';

angular.module('myApp')
  .controller('DetailCtrl', (['$scope', '$http', '$location', '$resource', '$routeParams', 'SelectedVenue',
      function($scope, $http, $location, $resource, $routeParams, SelectedVenue) {
    $scope.selected = SelectedVenue;

    if (! $scope.selected.venue) {
      // We have been invoked directly, fetch 1 record
      $resource('api/venues/' + $routeParams.id, {}, {}).get(function(venue) {
        $scope.selected.venue = venue;
        $scope.center.lat = venue.location.lat;
        $scope.center.lng = venue.location.lng;
        $scope.markers.venueMarker.lat = venue.location.lat;
        $scope.markers.venueMarker.lng = venue.location.lng;
      });
    }

    angular.extend($scope, {
      center: {
        lat: $scope.selected.venue ? $scope.selected.venue.location.lat : 40.67,
        lng: $scope.selected.venue ? $scope.selected.venue.location.lng : -73.94,
        zoom: 16
      },
      markers: {
        venueMarker: {
          lat: $scope.selected.venue ? $scope.selected.venue.location.lat : 40.67,
          lng: $scope.selected.venue ? $scope.selected.venue.location.lng : -73.94,
          message: $scope.selected.venue ? $scope.selected.venue.location.address : 'Venue of your choice',
          focus: true,
          draggable: false
        }
      },
      defaults: {
        scrollWheelZoom: false,
      }
    });
    

    $scope.goBack = function() {
      //$scope.selected.venue = undefined;
      $location.path('/');
    };
  }
  ]));
