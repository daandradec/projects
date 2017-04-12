var map;

var universityPos = {lat: 41.8708, lng: -87.6505};
var actualPos = {lat: 41.807846, lng: -87.664140};
modal.actualPosition = "4722 South Justine Street";

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: universityPos,
    zoom: 10
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

  for (var i=0; i<7; i++) {
    // Add a cicle everi 3Km from the university
    var circle = new google.maps.Circle({
      strokeColor: 'blue',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: 'blue',
      fillOpacity: 0.15,
      map: map,
      center: universityPos,
      radius: i * 5000
    });
  }
  // var origin1 = new google.maps.LatLng(55.930385, -3.118425);
  // var origin2 = 'Greenwich, England';
  // var destinationA = 'Stockholm, Sweden';
  // var destinationB = new google.maps.LatLng(50.087692, 14.421150);
  //
  // var service = new google.maps.DistanceMatrixService();
  // service.getDistanceMatrix({
  //   origins: [origin1, origin2],
  //   destinations: [destinationA, destinationB],
  //   travelMode: 'DRIVING'
  // }, callback);
  //
  // function callback(response, status) {
  //   if (status == 'OK') {
  //     var origins = response.originAddresses;
  //     var destinations = response.destinationAddresses;
  //
  //     for (var i = 0; i < origins.length; i++) {
  //       var results = response.rows[i].elements;
  //       for (var j = 0; j < results.length; j++) {
  //         var element = results[j];
  //         var distance = element.distance.text;
  //         var duration = element.duration.text;
  //         var from = origins[i];
  //         var to = destinations[j];
  //         console.log('distance ' + distance + ' during ' + duration + ' from ' + from + ' to ' + to);
  //       }
  //     }
  //   }
  // }
}
