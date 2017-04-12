'use strict'
/*
 * Depend on: no one local file
 */
let map_data
let marker
let div_map
let infowindow

//Check this-- a bit tricky
let icon_origin = '../../static/img/location_pin1.png'
let house1 = "../../static/img/home1.png"
let house2 = "../../static/img/home2.png"
let house3 = "../../static/img/home3.png"
let house4 = "../../static/img/home4.png"

let houses = [house1, house2, house3, house4, icon_origin]


let kml_limitations = "https://data.cityofchicago.org/api/geospatial/cauq-8yn6?method=export&format=KML"

let _center = {lat: 41.870732, lng: -87.650495}

//Configuration map
let config_mapa = {
  zoom: 15,
  center: _center, //Center in US
  mapTypeId: 'terrain'
}

/*
* Distance between points
* K -> Kilometers
*/

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}


// Function for place a marker
function createMarker(location, info_location, _icon) {
    //Simulate omition parameters of python

    let l_aux = distance(location['lat'], location['lng'], _center['lat'], _center['lng'], 'K' )
    console.log(l_aux)
    if(l_aux  == 0){
       _icon = 4;
    }
    else if(l_aux > 0 && l_aux < 5){
        _icon = 0;
    }else if(l_aux >= 5 && l_aux < 10){
        _icon = 1;
    }else if(l_aux >= 10 && l_aux < 15){
        _icon = 2;
    }else{
        _icon = 3;
    }
    let data = {
       position: location,
       map: map_data,
       icon: houses[_icon],
       clickable: true,
       title: 'Click to get more information'
     }
    //intance the marker
    marker = new google.maps.Marker(data);

    marker.info = new google.maps.InfoWindow({
      content: ''
    });

    marker.data=  "<a class='waves-effect waves-light btn' href='#modal1'>Click me.</a>";

    marker.vals = info_location
    marker.dista = l_aux

    google.maps.event.addListener(marker, 'click', function() {
      var $toastContent = $("<span>"+this.vals["property_name"]+"</span>");
      Materialize.toast($toastContent, 5000);
      document.getElementById("address").innerHTML = JSON.stringify(this.vals) + this.dista
      marker.info.setContent(this.data);
      marker.info.open(map, this);
    });

}

//function for show the different regions
function loadKmlLayer(src, map) {
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
  google.maps.event.addListener(kmlLayer, 'click', function(event) {
    var content = event.featureData.infoWindowHtml;
    alert(content)
  });
}

// Function for init a google maps map =}
function initMap() {
  // Instance the map
  div_map = document.getElementById("map")
  map_data = new google.maps.Map(div_map, config_mapa);
  createMarker(_center, ["Origin University"],4)
  console.log("The map has been loaded.")
  loadKmlLayer(kml_limitations, map_data);
}
