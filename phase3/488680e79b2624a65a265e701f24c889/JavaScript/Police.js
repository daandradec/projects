var policeMarker = [];
var marker;

 function getStations(map){
$.ajax({
    url: "https://data.cityofchicago.org/resource/9rg7-mz9y.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
    }
}).done(function(data) {
  alert("Showing " + data.length + " stations!");
    for (var i = 0; i <= data.length; i++) {
      if(data[i]){
        createMarkerPolice(data[i]);
        policeMarker.push(marker);
        markers.push(marker);
        markers[markers.length - 1].data = data[i];
        markers[markers.length - 1].type = "police";
	     }
    };          
});
}

function tooglePoliceMarkers() {
  for (var i = 0; i < policeMarker.length; i++) {
    if(policeMarker[i].getVisible()) 
      policeMarker[i].setVisible(false);
    else 
      policeMarker[i].setVisible(true);
  }
}

var prev_infowindow ;

function createInfoPolice(marker, data) {
	
	var infowindow = new google.maps.InfoWindow({
                       content: ""
                   });

	google.maps.event.addListener(marker, 'click', function() {
      if( prev_infowindow != undefined) {
           prev_infowindow.close();
       }
	  prev_infowindow = infowindow;
		infowindow.setContent(data.district_name);
    infowindow.open(marker.get("map"), marker);
	  document.getElementById("1").innerHTML = "<b>District:</b> " + data.district ;
	  document.getElementById("2").innerHTML = "<b>District name:</b> " + data.district_name ;
	  document.getElementById("3").innerHTML = "<b>Address:</b> " + data.address ;
	  document.getElementById("4").innerHTML = "<b>Zip:</b> " + data.zip ;
	  document.getElementById("5").innerHTML = "<b>Website:</b> <a href="+data.website+">"+ data.website +"</a>" ;
	  document.getElementById("6").innerHTML = "<b>Phone number:</b> "+data.phone ;
	  document.getElementById("7").innerHTML = "<b>Fax number:</b> "+data.fax ;
	  document.getElementById("8").innerHTML = " " ;
    document.getElementById("9").innerHTML = " " ;  	  
    document.getElementById("10").innerHTML = " " ;
    document.getElementById("11").innerHTML = " " ;  
    document.getElementById("12").innerHTML = " " ;
    document.getElementById("13").innerHTML = " " ;  
    document.getElementById("14").innerHTML = " " ;  
});
}

function createMarkerPolice(data){

  marker = new google.maps.Marker({
  position: new google.maps.LatLng(data.latitude,data.longitude),
  map: map,
  title: data.primary_type ,
  icon : 'Images/policeIcon.png'
  });
  createInfoPolice(marker, data);
}





