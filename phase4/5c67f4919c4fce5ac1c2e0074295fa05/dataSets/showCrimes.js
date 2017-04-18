var crimeMarker = [];

 function showCrimes(map){
$.ajax({
    url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
    }
}).done(function(data) {
    for (var i = 0; i <= data.length; i++) {
      if(data[i]){
	  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
      map: map,
      title: data[i].primary_type ,
      icon : 'Images/Icon2.png'
      });
	  createInfoCrime(marker, data[i]);
      crimeMarker.push(marker);
	  }
    };
});
}

// Icons for burglary , robbery, and assault.

function hideCrimeMarkers() {
  for (var i = 0; i < crimeMarker.length; i++) {
    crimeMarker[i].setMap(null);
  }
}

var prev_infowindow ;

function createInfoCrime(marker, data) {

	var infowindow = new google.maps.InfoWindow({
                       content: ""
                   });

	google.maps.event.addListener(marker, 'click', function() {
      if( prev_infowindow != undefined) {
           prev_infowindow.close();
       }
	  prev_infowindow = infowindow;
		infowindow.setContent(data.primary_type);
		infowindow.setContent(data.primary_type);
    infowindow.open(marker.get("map"), marker);

});
}
