var connectMarker = [];
var marker;

 function getConnect(map){
$.ajax({
    url: "https://data.cityofchicago.org/resource/qu9k-i56e.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
    }
}).done(function(data) {
  alert("Showing " + data.length + " connect locations!");
    for (var i = 0; i <= data.length; i++) {
      if(data[i]){
        createMarkerConnect(data[i]);
        connectMarker.push(marker);
        markers.push(marker);
        markers[markers.length - 1].data = data[i];
        markers[markers.length - 1].type = "connect";
	     }
    };          
});
}

function toogleConnectMarkers() {
  for (var i = 0; i < connectMarker.length; i++) {
    if(connectMarker[i].getVisible()) 
      connectMarker[i].setVisible(false);
    else 
      connectMarker[i].setVisible(true);
  }
}

var prev_infowindow ;

function createInfoConnect(marker, data) {
	
	var infowindow = new google.maps.InfoWindow({
                       content: ""
                   });

	google.maps.event.addListener(marker, 'click', function() {
      if( prev_infowindow != undefined) {
           prev_infowindow.close();
       }
	  prev_infowindow = infowindow;
		infowindow.setContent(data.organization_name);
		infowindow.setContent(data.organization_name);
    infowindow.open(marker.get("map"), marker);
	  document.getElementById("1").innerHTML = "<b>Website:</b> <a href="+data.website+">"+ data.website +"</a>" ;
	  document.getElementById("2").innerHTML = "<b>Organization name:</b> " + data.organization_name ;
	  document.getElementById("3").innerHTML = "<b>Organization type:</b> " + data.organization_type ;
	  document.getElementById("4").innerHTML = "<b>Full address:</b> " + data.full_address ;
	  document.getElementById("5").innerHTML = "<b>Building and street:</b>"+ data.address  ;
	  document.getElementById("6").innerHTML = "<b>Phone number:</b> "+data.org_phone ;
	  document.getElementById("7").innerHTML = "<b>Shedule:</b> "+data.hours ;
	  document.getElementById("8").innerHTML = "<b>Agency staff person email:</b> " + data.agency_staff_person_contact_email;
    document.getElementById("9").innerHTML = " " ;  	  
    document.getElementById("10").innerHTML = " " ;
    document.getElementById("11").innerHTML = " " ;  
    document.getElementById("12").innerHTML = " " ;
    document.getElementById("13").innerHTML = " " ;  
    document.getElementById("14").innerHTML = " " ;  
});
}

function createMarkerConnect(data){

  marker = new google.maps.Marker({
  position: new google.maps.LatLng(data.latitude,data.longitude),
  map: map,
  title: data.primary_type ,
  icon : 'Images/connectIcon.png'
  });
  createInfoConnect(marker, data);
}





