'use strict';

var brooklyn = require('./brooklyn.json');
var bronx = require('./bronx.json');
var queens = require('./queens.json');
var manhattan = require('./manhattan.json');

var venuesMap = {
  "brooklyn": brooklyn,
  "bronx": bronx,
  "queens": queens,
  "manhattan": manhattan
};

exports.venues = function(req, res) {
  var venues = [];

  for (var key in venuesMap) {
    var venuesForKey = venuesMap[key].response.groups[0].items;
    for (var i = 0; i < venuesForKey.length; i++) {
      var photoMeta = venuesForKey[i].venue.photos.groups[0].items[0];
      venuesForKey[i]["primary_photo"] = photoMeta.prefix + photoMeta.width + 'x' + photoMeta.height + photoMeta.suffix;
      venues.push(venuesForKey[i]);
    }
  }

  return res.send(venues);
}