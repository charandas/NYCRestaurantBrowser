'use strict';

// Global venues variable, constructed once and cached for later tests
// Basically, contains massaged foursquare data that this project uses throughout
var venues = [];

function transformToVenueArray(venuesMap, venues) {
  if (venues.length !== 0) {
    return;
  }

  for (var key in venuesMap) {
    var venuesForKey = venuesMap[key].response.groups[0].items;
    for (var i = 0; i < venuesForKey.length; i++) {
      var photoMeta = venuesForKey[i].venue.photos.groups[0].items[0];
      venuesForKey[i].venue.primaryPhoto = photoMeta.prefix + photoMeta.width + 'x' + photoMeta.height + photoMeta.suffix;
      venues.push(venuesForKey[i].venue);
    }
  }

  return venues;
}

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var MainCtrl,
    scope,
    $httpBackend,
    venuesMap;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    jasmine.getJSONFixtures().fixturesPath ='base/test/mock';
    venuesMap = {
      bronx: getJSONFixture('bronx.json'),
      brooklyn: getJSONFixture('brooklyn.json'),
      manhattan: getJSONFixture('manhattan.json'),
      queens: getJSONFixture('queens.json')
    };

    transformToVenueArray(venuesMap, venues);

    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    // All tests written with a pageSize of 4
    scope.input.pageSize = 4;
  }));

  describe('Venue results and filtering', function() {
    it('should handle no venue results', function() {
      $httpBackend.expectGET('api/venues')
        .respond([]);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();
      expect(scope.output.venues.length).toBe(0);
    });

    it('should handle venue results', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();
      expect(scope.output.venues.length).toBe(venues.length);
    });

    it('should filter by borough', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();

      scope.input.boroughSelector = ['bronx'];
      scope.$digest();
      expect(scope.output.groupedResults().length).toBe(10);

      scope.input.boroughSelector = ['bronx', 'brooklyn'];
      scope.$digest();
      expect(scope.output.groupedResults().length).toBe(20);
    });

    it('should filter by category', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();

      scope.input.categorySelector = ['thai'];
      scope.$digest();
      expect(scope.output.groupedResults().length).toBe(1);

      scope.input.categorySelector = ['BBQ'];
      scope.$digest();
      expect(scope.output.groupedResults().length).toBe(1);

      scope.input.categorySelector = ['sandwiches'];
      scope.$digest();
      expect(scope.output.groupedResults().length).toBe(3);

      scope.input.categorySelector = ['thai', 'BBQ', 'sandwiches'];
      scope.$digest();
      expect(scope.output.groupedResults().length).toBe(5);
    });

    it ('should filter by name when length greater than 2', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();

      scope.input.nameSelector = 'tha';
      scope.$digest();

      var groupedResults = scope.output.groupedResults();

      expect(groupedResults.length).toBe(3);
      expect(groupedResults[0].name).toBe('Balthazar Restaurant');
      expect(groupedResults[1].name).toBe('SriPraPhai Thai Restaurant');
      expect(groupedResults[2].name).toBe('Martha\'s Country Bakery');
    });
  });

  it ('shouldn\'t filter by name when length less than 2', function() {
    $httpBackend.expectGET('api/venues').respond(venues);
    $httpBackend.flush();
    expect(scope.output.venues).toBeDefined();

    scope.input.nameSelector = 'th';
    scope.$digest();
    expect(scope.output.groupedResults().length).toBe(40);
  });

  it ('should filter by name in a greedy manner', function() {
    $httpBackend.expectGET('api/venues').respond(venues);
    $httpBackend.flush();
    expect(scope.output.venues).toBeDefined();

    scope.input.nameSelector = 'thai bakery';
    scope.$digest();

    expect(scope.output.groupedResults().length).toBe(3);
  });

  describe('Pillars of pagination', function() {
    it ('should start at page 0', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();
      expect(scope.output.currentPage).toBe(0);
    });

    it ('should flip to next page', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();
      expect(scope.output.currentPage).toBe(0);

      var numPages = scope.output.numPages();
      expect(numPages).toBe(10);

      for (var i = 0; i < numPages - 1; i++) {
        scope.nextPage();
        scope.$digest();
        expect(scope.output.currentPage).toBe(i+1);
      }
    });

    it ('should jump to actual page for humanized page number string', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();
      expect(scope.output.currentPage).toBe(0);

      var numPages = scope.output.numPages();
      expect(numPages).toBe(10);

      scope.jumpToPage('10');
      scope.$digest();
      expect(scope.output.currentPage).toBe(9);
    });

    it ('should flip to previous page', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();
      expect(scope.output.currentPage).toBe(0);

      var numPages = scope.output.numPages();
      expect(numPages).toBe(10);

      // Jump to the last page, so we can test flipping backward
      scope.jumpToPage('10');
      scope.$digest();
      expect(scope.output.currentPage).toBe(9);

      for (var i = 9; i >= 1; i--) {
        scope.prevPage();
        scope.$digest();
        expect(scope.output.currentPage).toBe(i-1);
      }
    });

    it ('shouldn\'t flip prior to the first page', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();

      expect(scope.output.currentPage).toBe(0);
      scope.prevPage();
      scope.$digest();
      // Nothing changed
      expect(scope.output.currentPage).toBe(0);
    });

    it ('shouldn\'t flip past the last page', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();

      expect(scope.output.numPages()).toBe(10);
      // Jump to the last page
      scope.jumpToPage('10');
      scope.$digest();
      expect(scope.output.currentPage).toBe(9);

      scope.nextPage();
      scope.$digest();
      // Nothing changed
      expect(scope.output.currentPage).toBe(9);
    });

    it ('should reset to page 0 given a filter', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();
      // Start at 0 as usual
      expect(scope.output.currentPage).toBe(0);

      // Jump to an arbitrary page
      scope.jumpToPage('10');
      scope.$digest();
      expect(scope.output.currentPage).toBe(9);

      scope.input.categorySelector = ['sandwiches'];
      scope.$digest();
      expect(scope.output.groupedResults().length).toBe(3);
      // Back to 0
      expect(scope.output.currentPage).toBe(0);
    });
  });

  describe ('Paginated results and filtering', function() {
    it ('should determine paginated results', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();

      expect(scope.output.groupedResults().length).toBe(40);
      expect(scope.input.pageSize).toBe(4);
      expect(scope.output.numPages()).toBe(10);

      expect(scope.output.pagedResults().length).toBe(4);
    });

    it ('should determine paginated results given a filter', function() {
      $httpBackend.expectGET('api/venues').respond(venues);
      $httpBackend.flush();
      expect(scope.output.venues).toBeDefined();

      scope.input.boroughSelector = ['bronx'];
      scope.$digest();

      expect(scope.output.groupedResults().length).toBe(10);
      expect(scope.input.pageSize).toBe(4);
      expect(scope.output.numPages()).toBe(Math.ceil(10 / 4));

      expect(scope.output.pagedResults().length).toBe(4);
    });
  });


});
