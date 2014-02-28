# NYC Restaurant Browser #

This application should allow browsing and searching for restaurants within the following boroughs: Brooklyn, Bronx, Manhattan. And Queens.  You can get a sample data set from either Yelp or FourSquare APIs. At least 10 items per borough is sufficient.

## Solution: ##
Outlined here are the steps that should allow you to run this project. In the event that you run into trouble, feel free to ask me.

### Steps: ###
1. `cd` to the cloned directory.
2. `npm install`.
3. No need to run `bower install`: I have already handpicked my versions, it basically asked me about the angular and jQuery versions (with various choices) and I selected Angular 1.2.11 and jQuery 2.1.0.
4. `grunt serve` should start the server with the hosted express/angular app.
5. To run jshint: `grunt jshint` and `grunt jshint:test`.
6. To run tests: `karma start` and `karma run` in another terminal preferrably.
7. Not much e2e testing done for this, but if I were to improve upon this, I would start there.
8. That's it. The project was a lot of fun, so appreciate the opportunity.


### A Word about UI Filters: ###
1. Both category and borough filters allow multiple choices.
2. The name search bar is greedy, and operates only after typing more than 2 characters.

### Data: ###
1. All data for the boroughs from foursquare. It was generated with:
```zsh
curl https://api.foursquare.com/v2/venues/explore\?near\=Bronx%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
curl https://api.foursquare.com/v2/venues/explore\?near\=Brooklyn%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
curl https://api.foursquare.com/v2/venues/explore\?near\=Manhattan%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
curl https://api.foursquare.com/v2/venues/explore\?near\=Queens%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
```
2. The data had to be minimally massaged for Manhattan and Queens for which the results returned cities such as Flushing, etc.
3. The express server takes the 4 JSONs and combine them for uniform access by Angular app. 

### Routing: ###
1. `api/venues`: GET returns all results
2. `api/venues/<FOURSQUARE_VENUE_ID`: GET returns one result. This is used when the detailed page is not accessed from within the master controller and the resource is needed to display the detail view.

 


## Rules: ##
1. Must be a responsive design.
2. Restaurants should be displayed in a tile list view of restaurants in a 4x5 grid of logos/images with paging. Tiles should contain restaurant name, cuisine and borough.
3. Must have filter controls to filter by borough, cuisine, and name search 
4. Clicking a tile should show a details view of the restaurant with full address and a map.
5. Demonstrate knowledge of unit testing
6. Support execution of unit tests and jslint via Grunt

## Architecture: ##
The front end should be a single page application powered by a REST API. All tiers should have unit tests as necessary.

Tools to potentially use:
You're not required to use these tools, but these are all things we're currently using or evaluating.

- Zurb Foundation 
- NodeJS
- Asp.net
- AngularJS
- MapBox + Leaflet plugins

Let me know when you've made your final commit.
