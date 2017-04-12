var map;
var myLatLng = {lat: 41.8708, lng: -87.6505};
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 15
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Department of electrical & Computer Engeniering'
  });
}

