//"PRC" is Places Request Count
var PRC = 0;

//  make the following function with bounds object
// function getZoom() {
//     myZoom = initalizedMap.zoom;
//     return myZoom;
// }

/*
the following code makes Google Places requests for every box on the
route. The first time you call the function, you move from 1-10. The
next time it's called,it makes requests for boxes 11-20. And so on,
until the boxes run out. Then it starts the loop again.

Edge case: If the number of boxes is not a multiple of 10, then there
will be a left-over chunk at the end of the array that is a number from 1-9,
we account for this using the modulo.
*/
//dependency for initalizedMap, & GoogleBounds(from getGoogleBoundsFast.js)
function getPlacesFromBounds(bounds) {
    PRC += 1;
    console.log('Places Request Count' + PRC);
    service = new google.maps.places.PlacesService(initializedMap);
    var googleBounds = [];
    googleBounds = bounds;
    console.log('googleBounds: ' + googleBounds);

//if the number of boxes is more than 10,
    if (googleBounds.length > 10) {
        //refactor if/else statement to be two different functions.
        var currentIndex = PRC * 10;
        console.log('currentIndex: ' + currentIndex);

        if (googleBounds.length < currentIndex - (googleBounds.length % 10)) {

            PRC = 1;
            currentIndex = PRC * 10;
        }


        for (i = currentIndex - 10; i < currentIndex; i += 1) {
            var myBounds = [];
            console.log('googleBounds ' + i + ' ' + googleBounds[i]);
            myBounds = googleBounds[i];

            //myCoords = new google.maps.LatLng(38.64592, -105.47095);

            console.log(myBounds);

            //The map is saying that googleBounds[i] is "not a
            //LatLng or LatLngLiteral". can it take
            //a bounds object as input?

            var request = {
                bounds: myBounds,
                types: ['food']
            };
            //service.radarSearch(request, callback);
            //service.nearbySearch(request, callback);
            if (map.zoom > 6) {
                service.nearbySearch(request, nearbyCallback);
            } else {
                service.radarSearch(request, radarCallback);
                console.log('radarSearch in progress');
            }

        }

    } else {
        for (i = 0; i < googleBounds.length; i += 1) {
            var myBounds = [];
            console.log('googleBounds ' + i + ' ' + googleBounds[i]);
            myBounds = googleBounds[i];

            //myCoords = new google.maps.LatLng(38.64592, -105.47095);

            console.log(myBounds);

            //The map is saying that googleBounds[i] is "not a
            //LatLng or LatLngLiteral". can it take
            //a bounds object as input?

            var request = {
                bounds: myBounds,
                types: ['food']
            };
            //service.radarSearch(request, callback);
            //service.nearbySearch(request, callback);
            if (map.zoom > 5) {
                service.nearbySearch(request, nearbyCallback);
                console.log('Nearby Search Fired');
            } else {
                service.radarSearch(request, radarCallback);
                console.log('radarSearch in progress');
                console.log('Radar Search Fired');
            }

        }

        ;
    }

}

function nearbyCallback(results, status) {
    //console.log('callback called');
    //console.log(results + status);
    //getting a "ZERO_RESULTS" return from googles.

    for (var i = 0; i < results.length; i++) {
        // console.log(results.toJSON());
        //console.log('callback results ' + [i] + results[i]);
        //console.log('about to log results details ' + countOfPlaces);
        console.log('name: ' + results[i].name);
        //console.log('id: ' +results[i].id);
        console.log('types: ' + results[i].types);
        console.log('rating: ' + results[i].rating);
        console.log('vicinity: ' + results[i].vicinity);
        //console.log(results[i].URL);
        //console.log(results[i].website);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //request places every second
            //console.log('maps.places');
            var limit = results.length;
            for (var i = 0; i < limit; i += 1) {
                createMarkerNearby(results[i]);

            }
        } else {
            console.log('google.maps.places.PlacesServiceStatus Not Ok');
        }

    }
    //return placesCount;
}

function radarCallback(results, status) {
    //console.log('callback called');
    //console.log(results + status);
    //getting a "ZERO_RESULTS" return from googles.
    console.log(results[0]);
    for (var i = 0; i < results.length; i++) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //request places every second
            //console.log('maps.places');
            //var limit = 20;
            for (var i = 0; i < results.length; i += 1) {
                createMarkerRadar(results[i]);

            }
        } else {
            console.log('google.maps.places.PlacesServiceStatus Not Ok');
        }

    }
    //return placesCount;
}

function createMarkerRadar(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });


} //createMarker
function createMarkerNearby(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });


} //createMarker
