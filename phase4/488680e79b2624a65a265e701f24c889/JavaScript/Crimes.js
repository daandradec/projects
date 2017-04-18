var crimeMarker = [];
var marker ;

 function getCrimes(map){
$.ajax({
    url: "https://data.cityofchicago.org/resource/3uz7-d32j.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
    }
}).done(function(data) {
  alert("Showing " + data.length + " crimes!");
    for (var i = 0; i <= data.length; i++) {
      if(data[i]){
        createMarkerCrimes(data[i]);
        crimeMarker.push(marker);
        markers.push(marker);
        markers[markers.length - 1].data = data[i];
        markers[markers.length - 1].type = "crime";
	  }
    };          
});
}

function toogleCrimeMarkers() {
  for (var i = 0; i < crimeMarker.length; i++) {
    if(crimeMarker[i].getVisible()) 
      crimeMarker[i].setVisible(false);
    else 
      crimeMarker[i].setVisible(true);
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
		infowindow.setContent(data._primary_decsription);
		infowindow.setContent(data._primary_decsription);
    infowindow.open(marker.get("map"), marker);
	  document.getElementById("1").innerHTML = "<b>Case:</b> " + data.case_ ;
    document.getElementById("2").innerHTML = "<b>Block:</b> " + data.block;
	  document.getElementById("3").innerHTML = "<b>Date:</b> " + data.date_of_occurrence ;
	  document.getElementById("4").innerHTML = "<b>Primary description:</b>" + data._primary_decsription ;
	  document.getElementById("5").innerHTML = "<b>Secundary description:</b> " + data._secondary_description ;
	  document.getElementById("6").innerHTML = "<b>Location description:</b>" + data._location_description ;
	  document.getElementById("7").innerHTML = " " ;
	  document.getElementById("8").innerHTML = " " ;
	  document.getElementById("9").innerHTML = " " ;
    document.getElementById("10").innerHTML = " " ;
    document.getElementById("11").innerHTML = " " ;
    document.getElementById("12").innerHTML = " " ; 
    document.getElementById("13").innerHTML = " " ;
    document.getElementById("14").innerHTML = " " ;   	
});
}


function createMarkerCrimes(data){

      marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.latitude,data.longitude),
      map: map,
      title: data.primary_type ,
      icon : 'Images/crimeIcon.png'
      });
      createInfoCrime(marker, data);
}





