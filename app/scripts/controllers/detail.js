'use strict';

angular.module('myApp')
  .controller('DetailCtrl', (['$scope', '$http', '$location', 'SelectedVenue',
    function($scope, $http, $location, SelectedVenue) {
    $scope.selected = SelectedVenue;
    angular.extend($scope, {
      nyCenter: {
        lat: 40.67,
        lng: -73.94,
        zoom: 8
      },
      markers: {
        osloMarker: {
          lat: $scope.selected.venue.venue ? $scope.selected.venue.venue.location.lat : 40.67,
          lng: $scope.selected.venue.venue ? $scope.selected.venue.venue.location.lng : -73.94,
          message: $scope.selected.venue.venue ? $scope.selected.venue.venue.name : 'No venue selected.',
          focus: true,
          draggable: false
        }
      },
      defaults: {
        scrollWheelZoom: false,
      }
    });

    $scope.goBack = function() {
      $scope.selected.venue = {};
      $location.path('/');
    };
  }
  ]));
