var map;

var universityPos = {lat: 41.8708, lng: -87.6505};
var actualPos = {lat: 41.807846, lng: -87.664140};
modal.actualPosition = "4722 South Justine Street";

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: universityPos,
    zoom: 11
  });

  var uMarker = new google.maps.Marker({
    position: universityPos,
    map: map,
    title: 'UIC'
  });

  var yourMarker = new google.maps.Marker({
    position: actualPos,
    map: map,
    title: 'Your position'
  });

}
