var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.6505},
    zoom:14
  });
  var location = new google.maps.LatLng(41.8708,-87.6505);
  var marker = new google.maps.Marker({
      position: location,
      map: map
  });
}
