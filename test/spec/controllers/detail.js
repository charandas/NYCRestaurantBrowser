'use strict';

describe('Controller: DetailCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var DetailCtrl,
    scope,
    $httpBackend,
    sourcedVenue,
    _SelectedVenue;

  // Initialize the controller and a mock scope
  beforeEach(function() {
    module(function($provide) {
      $provide.value('SelectedVenue', {venue: undefined});
    });
    inject(function (_$httpBackend_, $controller, $rootScope, SelectedVenue) {
      jasmine.getJSONFixtures().fixturesPath ='base/test/mock';
      sourcedVenue = getJSONFixture('4decca141f6e3ddebe06c5ef.json');

      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();

      // Store injected services in outermost describe for access in all tests
      _SelectedVenue = SelectedVenue;

      DetailCtrl = $controller('DetailCtrl', {
        $scope: scope,
        $routeParams: {id: '4decca141f6e3ddebe06c5ef'} // for smith canteen
      });
    });
  });

  describe('SelectedVenue integration', function() {
    it('should set selected to point to shared Service: SelectedVenue', function () {
      expect(scope.selected).toBe(_SelectedVenue);
    });
  });

  xdescribe('Selected venue already set in scope, no sourcing required', function(){
    // TODO: cannot be tested in the current optimized way the controller runs
    // if we had watchers for scope.selected, we could unset it for other tests
    // and this test could run with a set state.
  });

  describe('Sourced resource scenario wherein the main controller doesn\'t execute', function(){
    it('should set selected to the resourced venue if not already set', function() {
      $httpBackend.expectGET('api/venues/4decca141f6e3ddebe06c5ef').respond(sourcedVenue);
      $httpBackend.flush();
      expect(angular.equals(_SelectedVenue, scope.selected)).toBeTruthy();
      expect(angular.equals(scope.selected.venue, sourcedVenue)).toBeTruthy();
    });

    it('should provide base skeleton for leaflet if venue not set', function() {
      expect(scope.center).toBeDefined();
      expect(scope.markers).toBeDefined();
      expect(scope.defaults).toBeDefined();
    });

    it('should furthermore set leaflet center and markers when venue is set', function() {
      expect(scope.center).toBeDefined();
      expect(scope.markers).toBeDefined();
      expect(scope.defaults).toBeDefined();

      $httpBackend.expectGET('api/venues/4decca141f6e3ddebe06c5ef').respond(sourcedVenue);
      $httpBackend.flush();
      expect(angular.equals(_SelectedVenue, scope.selected)).toBeTruthy();
      expect(angular.equals(scope.selected.venue, sourcedVenue)).toBeTruthy();

      expect(scope.center.lat).toBe(scope.selected.venue.location.lat);
      expect(scope.center.lng).toBe(scope.selected.venue.location.lng);

      expect(scope.markers.venueMarker).toBeDefined();
      expect(scope.markers.venueMarker.lat).toBe(scope.selected.venue.location.lat);
      expect(scope.markers.venueMarker.lng).toBe(scope.selected.venue.location.lng);
    });
  });
});
