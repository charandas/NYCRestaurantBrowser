'use strict';

describe('Service: SelectedVenue', function () {

  // load the service's module
  beforeEach(module('myApp'));

  // instantiate service
  var SelectedVenue;
  beforeEach(inject(function (_SelectedVenue_) {
    SelectedVenue = _SelectedVenue_;
  }));

  it('should do something', function () {
    expect(!!SelectedVenue).toBe(true);
  });

});
