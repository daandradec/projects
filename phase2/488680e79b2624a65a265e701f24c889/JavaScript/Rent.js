 var rentMarker = [];
 var rentMarkerVisited = [];
 var repeat = false;
 var selected ;

  function getRent(map){
$.ajax({
    url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
    }
}).done(function(data) {
  alert("Showing " + data.length + " rent places!");

    for (var i = 0; i <= data.length; i++) {
      if (data[i]){
		  var marker = new google.maps.Marker({
	      position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
	      map: map,
	      title: data[i].address,
	      icon: "Images/rentIcon.png"
	   	});
      rentMarker.push(marker);
	createInfoRent(marker,data[i]);
	  }

    };          
});
}


function hideRentMarkers() {
  for (var i = 0; i < rentMarker.length; i++) {
    rentMarker[i].setMap(null);
  }
}



var prev_infowindow ;

function createInfoRent(marker, data) {
	
	var infowindow = new google.maps.InfoWindow({
    	content: ""
	});

	google.maps.event.addListener(marker, 'click', function() {
      if( prev_infowindow != undefined) {
           prev_infowindow.close();
       }
	  prev_infowindow = infowindow;
	  infowindow.setContent(data.property_type);
      infowindow.open(marker.get("map"), marker);
	  document.getElementById("1").innerHTML = "<b>Comunity area name</b>: " + data.community_area ;
	  document.getElementById("2").innerHTML = "<b>Comunity area number</b>: " + data.community_area_number ;
	  document.getElementById("3").innerHTML = "<b>Property type</b>: " + data.property_type ;
	  document.getElementById("4").innerHTML = "<b>Property name</b>: " + data.property_name ;
	  document.getElementById("5").innerHTML = "<b>Address</b>: " + data.address ;
	  document.getElementById("6").innerHTML = "<b>Zip code</b>: " + data.zip_code ;
	  document.getElementById("7").innerHTML = "<b>Phone number</b>: " + data.phone_number ;
	  document.getElementById("8").innerHTML = "<b>Management company</b>: " + data.management_company ;
	  
	  
		for (var i = rentMarkerVisited.length - 1; i >= 0; i--) {
		  	if (rentMarkerVisited[i] == data){
		  		repeat = true;
		  		break;
		  	}
		  	else { 
		  		repeat = false; 
		  	}
 		}

 		rentMarkerVisited.push(data);
	  	rentVisited();	

			var visitRent = document.createElement("a");
	    	visitRent.setAttribute("class","list-group-item");
	    	visitRent.setAttribute("onclick"," getHistory(this)");
	    	visitRent.innerHTML = "<h4 class=list-group-item-heading>" + rentMarkerVisited[rentMarkerVisited.length - 1].property_name +"</h4><p class=list-group-item-text>"+rentMarkerVisited[rentMarkerVisited.length - 1].address+"</p>";
			visitRent.marker = data;

		if (!repeat)
			$("#history").append(visitRent);
		

	  

	  
	  
});
}

function rentVisited() {
	var lastMarkerVisited;
	if(rentMarkerVisited.length > 1)
		lastMarkerVisited= rentMarkerVisited[rentMarkerVisited.length - 2];
	else
		lastMarkerVisited= rentMarkerVisited[rentMarkerVisited.length - 1];

	  document.getElementById("mem1").innerHTML = "<b>Comunity area name</b>: " + lastMarkerVisited.community_area ;
	  document.getElementById("mem2").innerHTML = "<b>Comunity area number</b>: " + lastMarkerVisited.community_area_number ;
	  document.getElementById("mem3").innerHTML = "<b>Property type</b>: " + lastMarkerVisited.property_type ;
	  document.getElementById("mem4").innerHTML = "<b>Property name</b>: " + lastMarkerVisited.property_name ;
	  document.getElementById("mem5").innerHTML = "<b>Address</b>: " + lastMarkerVisited.address ;
	  document.getElementById("mem6").innerHTML = "<b>Zip code</b>: " + lastMarkerVisited.zip_code ;
	  document.getElementById("mem7").innerHTML = "<b>Phone number</b>: " + lastMarkerVisited.phone_number ;
	  document.getElementById("mem8").innerHTML = "<b>Management company</b>: " + lastMarkerVisited.management_company ;
	  
}



function getHistory(info){

	  info.setAttribute("class","list-group-item active");
	  if(selected != undefined){
	  	selected.setAttribute("class","list-group-item");
	  }
	  selected = info;
	  document.getElementById("mem1").innerHTML = "<b>Comunity area name</b>: " + info.marker.community_area ;
	  document.getElementById("mem2").innerHTML = "<b>Comunity area number</b>: " + info.marker.community_area_number ;
	  document.getElementById("mem3").innerHTML = "<b>Property type</b>: " + info.marker.property_type ;
	  document.getElementById("mem4").innerHTML = "<b>Property name</b>: " + info.marker.property_name ;
	  document.getElementById("mem5").innerHTML = "<b>Address</b>: " + info.marker.address ;
	  document.getElementById("mem6").innerHTML = "<b>Zip code</b>: " + info.marker.zip_code ;
	  document.getElementById("mem7").innerHTML = "<b>Phone number</b>: " + info.marker.phone_number ;
	  document.getElementById("mem8").innerHTML = "<b>Management company</b>: " + info.marker.management_company ;
}

