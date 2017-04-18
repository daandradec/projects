var map;
var markers=[];
var houseMarkers=[];
var parkMarkers=[];
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(41.8708,-87.6505),
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // add some
//  script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function addMarker(location, title) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: title
        });
        markers.push(marker);
      }
function addHouseMarker(location, title) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: title,
          icon: {
          			path: MAP_PIN,
          			fillColor: '#00CCBB',
          			fillOpacity: 1,
          			strokeColor: '',
          			strokeWeight: 0
          		},
          map_icon_label: '<span class="map-icon map-icon-doctor"></span>'
        //  icon:"../img/house.png"
        });
        houseMarkers.push(marker);
      }
function addParkMarker(location, title){
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title,
    icon: {
          path: SQUARE_PIN,
          fillColor: '#7300e6',
          fillOpacity: 1,
          strokeColor: '',
          strokeWeight: 0
        },
    map_icon_label: '<span class="map-icon map-icon-park"></span>'

  });
  parkMarkers.push(marker);
}
function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
      }

function eqfeed_callback(results) {
        map.data.addGeoJson(results);
}
