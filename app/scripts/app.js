'use strict';

angular.module('myApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'localytics.directives',
  'leaflet-directive'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'partials/detail',
        controller: 'DetailCtrl',

      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });