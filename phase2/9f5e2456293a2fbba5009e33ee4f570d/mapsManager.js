var map;
var markers=[];
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
