var elevator;
var map;
var washedData = [];
var crime = [];
var flag=false;

function removeLine() {
    flightPath.setMap(null);
}
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function initMap() {
    document.getElementById("area-name").innerHTML = "<b>Area Name</b>: ";
    document.getElementById("area-number").innerHTML = "<b>Area Number</b>: ";
    document.getElementById("property-type").innerHTML = "<b>Property Type</b>: <em>";
    document.getElementById("property-name").innerHTML = "<b>Property Name</b>: ";
    document.getElementById("phone-number").innerHTML = "<b>Phone Number</b>: <em>";
    document.getElementById("company").innerHTML = "<b>Company</b>: <em>";
    document.getElementById("units").innerHTML = "<b>Units</b>: <em>";
    document.getElementById("crimes").innerHTML = "<b>Percentage of crimes:<b> ";
    document.getElementById("distance").innerHTML = "<b>Distance from university</b>: ";

    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 41.870768, lng: -87.650500
        },
        zoom: 12
    });
    var infowindow = new google.maps.InfoWindow({
        content: ""
    });
    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    var image = 'images/u.png';
    var beachMarker = new google.maps.Marker({
      position: {lat: 41.870768, lng: -87.650500},
      map: map,
      icon: image,
});

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            //
            //add the information of the markets here
            //
            //  for (var i = 0; i<60; i++) {
            $.each(json.data, function(i, x) {
                var dataLine = {
                    position: {
                        lat: Number(x[19]),
                        lng: Number(x[20])
                    },
                    address: x[12],
                    communityArea: x[8],
                    communityNum: x[9],
                    propertyType: x[10],
                    propertyName: x[11],
                    zipCode: x[13],
                    phone: x[14],
                    company: x[15],
                    units: x[16],
                    lat: Number(x[19]),
                    lng: Number(x[20])
                };
                washedData.push(dataLine);

            });
            //number of the markets
            var numberOfMarkets = washedData.length;

            //add markers on the map
            var markers = [];
            google.maps.event.addListener(map, 'idle', function() {
                // Create an ElevationService
                elevator = new google.maps.ElevationService();
                $.each(markers, function(key, value) {
                    value.setMap(null);
                });
                var locations = [];
                for (var j = 0; j < numberOfMarkets; j++) {
                    var location = new google.maps.LatLng(
                        Number(washedData[j].latitude),
                        Number(washedData[j].longitude)
                    );
                    locations.push(location);
                }

                // Create a LocationElevationRequest object using the array's one value
                var positionalRequest = {
                    'locations': locations
                };
                elevator.getElevationForLocations(positionalRequest, function(results, status) {
                    if (status === google.maps.ElevationStatus.OK) {
                        //if the infowindow is open
                        var prev_infowindow = false;

                        $.each(results, function(key, value) {

                            markers[key] = new google.maps.Marker({
                                position: washedData[key].position,
                                map: map,
                            });

                            google.maps.event.addListener(markers[key], 'click', function() {

                                //if another window is open, close it
                                if (prev_infowindow) {
                                    prev_infowindow.close();
                                }
                                infowindow.setContent(washedData[key].address);
                                infowindow.open(map, markers[key]);
                                //set the menu information about the market
                                document.getElementById("area-name").innerHTML = "<b>Area Name</b>: " + washedData[key].communityArea + "</em>";
                                document.getElementById("area-number").innerHTML = "<b>Area Number</b>: " + washedData[key].communityNum + "</em>";
                                document.getElementById("property-type").innerHTML = "<b>Property Type</b>: <em>" + washedData[key].propertyType + "</em>";
                                document.getElementById("property-name").innerHTML = "<b>Property Name</b>: " + washedData[key].propertyName + "</em>";
                                document.getElementById("phone-number").innerHTML = "<b>Phone Number</b>: <em>" + washedData[key].phone + "</em>";
                                document.getElementById("company").innerHTML = "<b>Company</b>: <em>" + washedData[key].company + "</em>";
                                document.getElementById("units").innerHTML = "<b>Units</b>: <em>" + washedData[key].units + "</em>";

                                var x1 = new google.maps.LatLng(41.870768, -87.650500);
                                //document.write(washedData[key].lng);
                                var x2 = new google.maps.LatLng(washedData[key].lat, washedData[key].lng);

                                var distancia = google.maps.geometry.spherical.computeDistanceBetween(x1, x2);
                                document.getElementById("distance").innerHTML = "<b>Distance from university</b>: " + (distancia / 1000).toFixed(2) + " km";


                                var flightPlanCoordinates = [{
                                        lat: 41.870768, lng: -87.650500
                                    },
                                    {
                                        lat: washedData[key].lat,
                                        lng: washedData[key].lng
                                    },

                                ];
                                var flightPath = new google.maps.Polyline({
                                    path: flightPlanCoordinates,
                                    geodesic: true,
                                    strokeColor: '#FF0000',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2
                                });

                                flightPath.setMap(map);

                            });
                        });


                    }


                    });

                });

        }
    };
}
