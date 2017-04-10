/**
Author: Priyank Jain
This is the core js logic for adding markes and radarchart for Purdue 2016 Ironhacks Tutorials
**/

//variables for map and marks

var map;
// 2-level array for washed markets data



String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//init the google map in the webpage
function initMap() {
    var washedData = [];
    var elevator;
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:  41.8708300, lng: -87.6500500},
      zoom: 13,
      mapTypeControl: false
    });


    var infowindow = new google.maps.InfoWindow({
                            content: ""
                      });
    //Marker university of Illinois
    var markerUniversity = new google.maps.Marker({
    position: new google.maps.LatLng(41.870950, -87.650397 ),
    map: map,
    icon: 'js/university.png'
    });

    markerUniversity.addListener('dblclick', function() {
      map.setZoom(13);
      map.setCenter(markerUniversity.getPosition());
    });

    markerUniversity.addListener('click', function() {
        //if another window is open, close it
      /*  if( prev_infowindow ) {
            prev_infowindow.close();
        }
        */infowindow.setContent("Department of Computer Science – University of Illinois,Chicago");
        infowindow.open(map, markerUniversity);
    });

    //Set map style RETRO
    map.setOptions({styles: styles["retro"]});
    var place = document.getElementById("selected-style").value;

    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    var url = places[place]["0"]["dataSet"];
    //json format data resource url
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            //
            var lat = places[place]["2"]["lat"]
            var lng = places[place]["3"]["lng"]
            var name = places[place]["4"]["name"]
            //add the information of the markets here

            for (var i = 0; i< json.data.length; i++) {
                var dataLine = [];
                //latitude
                dataLine.push(json.data[i][lat[0]][lat[1]]);
                //longitude
                dataLine.push(json.data[i][lng[0]][lng[1]]);
                //name
                dataLine.push(json.data[i][name]);

                washedData.push(dataLine);
            };
            //alert(washedData);
            //number of the markets
            var numberOfMarkets = washedData.length;

            //add markers on the map
            var markers = [];
            google.maps.event.addListener(map, 'idle', function() {
            // Create an ElevationService
            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            // getting bounds of current location
            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();

            // adding 20 markers to the map at random locations
            var locations = [];
            for (var j = 0; j < numberOfMarkets; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            // Create a LocationElevationRequest object using the array's one value
            var positionalRequest = {
                'locations': locations
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    //if the infowindow is open
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {


                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                            //degradable: true,
                            //animation: google.maps.Animation.DROP,
                            icon: places[place]["1"]["icon"]

                        });
                        google.maps.event.addListener(markers[key], 'click', function() {
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();
                            }
                            infowindow.setContent(washedData[key][2]);
                            infowindow.open(map, markers[key]);
                        });
                        markers[key].addListener('dblclick', function() {
                        map.setZoom(13);
                        map.setCenter(markers[key].getPosition());
                        });

                    });
                }
            });

        });
        }
    };
}

var places = {

  police : [
    {dataSet: 'https://data.cityofchicago.org/api/views/gkur-vufi/rows.json?accessType=DOWNLOAD'},
    {icon: 'js/police.png'},
    {lat: [14, 1] },
    {lng: [14, 2] },
    {name: 8}
  ],

  fire : [
    {dataSet : 'https://data.cityofchicago.org/api/views/hp65-bcxv/rows.json?accessType=DOWNLOAD'},
    {icon : 'js/fire.png'},
    {lat: [14, 1] },
    {lng: [14, 2] },
    {name: 8}
  ],

  house : [
    {dataSet : 'https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD'},
    {icon : 'js/house.png'},
    {lat: [21, 1] },
    {lng: [21, 2] },
    {name: 11}
  ]
}

var styles = {
  default: null,
  retro: [
    {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{color: '#c9b2a6'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{color: '#dcd2be'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ae9e90'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#93817c'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{color: '#a5b076'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#447530'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#f5f1e6'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#fdfcf8'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f8c967'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#e9bc62'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: '#e98d58'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{color: '#db8555'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#806b63'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{color: '#8f7d77'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#ebe3cd'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{color: '#b9d3c2'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#92998d'}]
    }
  ],

};
