'use strict';

describe('Controller: DetailCtrl', function () {

  // load the controller's module
  beforeEach(module('karanNycrestaurantBrowserApp'));

  var DetailCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    DetailCtrl = $controller('DetailCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {

  });
});
