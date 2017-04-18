var map;
var greenRoofs = [];
var greenRoofsBool = {"value" : true};
var crimes = [];
var crimesBool = {"value" : true};
var rent = [];
var rentBool = {"value" : true};
var libraries =[];
var librariesBool = {"value" : true};


function initMap() {
    var routes = [];
    var Emap = document.querySelector('#map');
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var stepDisplay = new google.maps.InfoWindow;
    map = new google.maps.Map(Emap, {
        center: {
            lat: 41.870800,
            lng: -87.650500
        },
        zoom: 13,
        mapTypeId: 'satellite'
    });
    directionsDisplay.setMap(map);
    var marker = new google.maps.Marker({
        position: {
            lat: 41.870800,
            lng: -87.650500
        },
        map: map,
        title: 'Department of Computer Science – University of Illinois, Chicago',

    });
    var array
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/resource/tnn6-5k2t.json";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(obj["latitude"]),
                        lng: Number(obj["longitude"])
                    },
                    map: map,
                    title: obj["full_address"],
                    icon:'icons/greenRoof.png',
                });
                greenRoofs.push(marker);
            }
        }

    };
    var xmlhttp2 = new XMLHttpRequest();
    var url2 = "https://data.cityofchicago.org/resource/3uz7-d32j.json";
    xmlhttp2.open("GET", url2, true);
    xmlhttp2.send();
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            var myArr = xmlhttp2.responseText;
            var text = myArr;
            var json2 = JSON.parse(text);

            for (var i = 0; i < json2.length; i++) {
                var obj = json2[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(obj["latitude"]),
                        lng: Number(obj["longitude"])
                    },
                    //map: map,
                    title: obj["_primary_decsription"]+" "+obj["_secondary_description"],
                    icon:'icons/peligro.png',
                });

                crimes.push(marker);

            }
            var markerCluster = new MarkerClusterer(map, crimes,
                  {styles:[{textColor: 'white',url: 'icons/m3.png',height: 30, width: 30}]});
        }

    };

    var xmlhttp3 = new XMLHttpRequest();
    var url3 = "https://data.cityofchicago.org/resource/uahe-iimk.json";
    xmlhttp3.open("GET", url3, true);
    xmlhttp3.send();
    xmlhttp3.onreadystatechange = function() {
        if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
            var myArr = xmlhttp3.responseText;
            var text = myArr;
            var json3 = JSON.parse(text);

            for (var i = 0; i < json3.length; i++) {
                var obj = json3[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(obj["latitude"]),
                        lng: Number(obj["longitude"])
                    },
                    map: map,
                    title: "Name: "+obj["property_name"]+"\nAddress: "+obj["address"]+"\nManagement Company: "+obj["management_company"]+"\ntype: "+obj["property_type"]+"\nPhone Number "+obj["phone_number"],
                    icon:'icons/house.png',
                });
                marker.addListener('click',function(e) {
                    calculateAndDisplayRoute(directionsDisplay, directionsService, routes, stepDisplay, e.latLng, map);
                });
                rent.push(marker);
            }
        }

    };
    var xmlhttp4 = new XMLHttpRequest();
    var url4 = "https://data.cityofchicago.org/resource/wa2i-tm5d.json";
    xmlhttp4.open("GET", url4, true);
    xmlhttp4.send();
    xmlhttp4.onreadystatechange = function() {
        if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
            var myArr = xmlhttp4.responseText;
            var text = myArr;
            var json4 = JSON.parse(text);

            for (var i = 0; i < json4.length; i++) {
                var obj = json4[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(obj["location"]["latitude"]),
                        lng: Number(obj["location"]["longitude"])
                    },
                    map: map,
                    title: "library: "+obj["name_"]+"\naddress: "+obj["address"]+"\nOperation hours: "+obj["hours_of_operation"],
                    icon:'icons/library.png',
                });
                libraries.push(marker);
            }
        }

    };
    map.data.loadGeoJson("data/BoundariesNeighborhoods.geojson");
    var featureStyle = {
				    fillColor: 'transparent',
				    strokeWeight: 0.7,
				    strokeColor: 'black',
            title: 'pri_neigh'
				  };
				  map.data.setStyle(featureStyle);




}

function asign(a, b) {
    b = a;
};

function toggleMarkers(array,abool){
  abool["value"] = !abool["value"];
  if (abool["value"]) {

    for (var i = 0; i < array.length; i++) {
          array[i].setMap(map);
    }
  }else {
    for (var i = 0; i < array.length; i++) {
          array[i].setMap(null);
    }
  }
}
function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, endLT,  map) {
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }
  directionsService.route({
    origin: new google.maps.LatLng(41.870800, -87.650500),
    destination: endLT,
    travelMode: 'TRANSIT'
  }, function(response, status) {
    if (status === 'OK') {
      document.getElementById('warnings-panel').innerHTML =
          '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      console.log(directionsDisplay);
      showSteps(response, markerArray, stepDisplay, map);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
        stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
$(document).ready(function(){
    $("#myModal").modal();
});
