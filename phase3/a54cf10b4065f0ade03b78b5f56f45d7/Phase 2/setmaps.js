var elevator;
var map;
var washedData = [];

function initMap() {

    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 41.870800,
            lng: -87.650500
        },
        zoom: 14
    });

    function ucenter() { //Marker and center University
        var marker_latlng = new google.maps.LatLng(41.870800, -87.650500);
        var iconBase = 'http://maps.google.com/mapfiles/kml/paddle/';
        var marker = new google.maps.Marker({
            position: marker_latlng,
            map: map,
            title: "University of Illinois, Chicago",
            icon: iconBase + 'blu-blank.png'
        });



        var contentString = 'University of Illinois, Chicago';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }

    ucenter(); // Call function ucenter

    var xmlhttp = new XMLHttpRequest();
    var urlrent = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD"; //Rent

        function setpointcrime() { //function crime
            map.data.loadGeoJson('https://data.cityofchicago.org/resource/6zsd-86xi.geojson');

            map.data.setStyle({
                icon: {
                    fillOpacity: 0.2,
                    fillColor: 'rgba(241, 222, 124, 0.81)',
                    strokeColor: 'rgba(56, 20, 24, 0)',
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 40
                }
            });
        } // End function crime
    //rent
    function setpointrent() {

        xmlhttp.open("GET", urlrent, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //get the text content from the page response
                var myArr = xmlhttp.responseText;
                var text = myArr;
                json = JSON.parse(text);

                $.each(json.data, function(i, rent) {
                    var rentdata = {
                        Name: rent[11],
                        Address: rent[12],
                        position: {
                            lat: Number(rent[19]),
                            lng: Number(rent[20])
                        }
                    };
                    washedData.push(rentdata);
                    //  console.log(json.data[i][19], json.data[i][20], json.data[i][11]);
                });

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
                            Number(washedData[j].lat),
                            Number(washedData[j].lng)
                        );
                        locations.push(location);
                    }

                    // Create a LocationElevationRequest object using the array's one value
                    var positionalRequest = {
                        'locations': locations
                    };

                    elevator.getElevationForLocations(positionalRequest, function(results, status) {
                        if (status === google.maps.ElevationStatus.OK) { //if status
                            //if the infowindow is open
                            var prev_infowindow = false;

                            $.each(results, function(key, value) {
                                markers[key] = new google.maps.Marker({
                                    position: washedData[key].position,
                                    title: washedData[key].Name,
                                    map: map,
                                });


                                var contentString = washedData[key].Address;

                                var infowindow = new google.maps.InfoWindow({
                                    content: "Address: " + contentString
                                });

                                google.maps.event.addListener(markers[key], 'click', function() {
                                  setpointcrime();
                                    infowindow.open(map, markers[key]);
                                });
                            });
                        } //if status
                    });

                });
            }
        };
    } // End function rent



    setpointrent();


} //init map
