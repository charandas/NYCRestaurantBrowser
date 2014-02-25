'use strict';

var brooklyn = require('./brooklyn.json');
var bronx = require('./bronx.json');
var queens = require('./queens.json');
var manhattan = require('./manhattan.json');

var venues = {
  "brooklyn": brooklyn,
  "bronx": bronx,
  "queens": queens,
  "manhattan": manhattan
};

exports.venues = function(req, res) {
  if (req.query.borough) {
    if (Object.keys(venues).indexOf(req.query.borough) != -1) {
      return res.send(venues[req.query.borough]);
    }
    else {
      var err = {
        error: "Unknown borough in NY: " + req.query.borough
      }
      return res.send(404, err);
    }
  }
  else {
    // Return all boroughs
    return res.send(venues);
  }
}