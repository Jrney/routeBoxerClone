    //var map = null;
    //var boxpolys = null;
    //var routeBoxer = null;
    //var distance = null;
    //count how many times you've fired getPlacesFromBounds
    //var routeBoxer = new RouteBoxer();

    function initialize() {
        // Default the map view to the continental U.S.
        //Factor out into Model with helper functions to return established variables
        var mapOptions = {
            center: new google.maps.LatLng(37.09024, -95.712891),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 4
        };

        var initializedMap = new google.maps.Map(document.getElementById("map"), mapOptions);

        return initializedMap;
    }

    function route() {

        var directionService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer({map: initializedMap});
        var routeBoxer = new RouteBoxer();
        // Clear any previous route boxes from the map
        //need clear boxes function as dependency
        clearBoxes();

        // Convert the distance to box around the route from miles to km
        var distance = parseFloat(document.getElementById("distance").value) * 1.609344;

        var request = {
            origin: document.getElementById("from").value,
            destination: document.getElementById("to").value,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        // Make the directions request
        directionService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                //This is the blue line (path) of the route
                var path = result.routes[0].overview_path;

                // Box around the overview path(declared above) of the first route
                var boxes = routeBoxer.box(path, distance);


                // Call function elsewhere drawBoxes(boxes);
            } else {
                alert("Directions query failed: " + status);
            }
        });
        return boxes;
    }

    // Draw the array of boxes as polylines on the map
    function drawBoxes(boxes) {
        var boxpolys = null;

        boxpolys = new Array(boxes.length);
        for (var i = 0; i < boxes.length; i++) {
            boxpolys[i] = new google.maps.Rectangle({
                bounds: boxes[i],
                fillOpacity: 0,
                strokeOpacity: 1.0,
                strokeColor: '#000000',
                strokeWeight: 1,
                // give an id to your boxpolys
                id: i,
                map: map
            });
        }
    }

    // Clear boxes currently on the map
    function clearBoxes() {
        if (boxpolys != null) {
            for (var i = 0; i < boxpolys.length; i++) {
                boxpolys[i].setMap(null);
            }
        }
        boxpolys = null;
    }
