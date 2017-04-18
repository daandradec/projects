var libraryMarker = [];
var libmarker;

 function getLibraries(map){
$.ajax({
    url: "https://data.cityofchicago.org/resource/psqp-6rmg.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
    }
}).done(function(data) {
  alert("Showing " + data.length + " libraries!");
    for (var i = 0; i <= data.length; i++) {
      if(data[i]){
        createMarkerLibraries(data[i]);
        libraryMarker.push(libmarker);
        markers.push(libmarker);
        markers[markers.length - 1].data = data[i];
        markers[markers.length - 1].type = "library";
	  }
    };          
});
}


function toogleLibraryMarkers() {
  for (var i = 0; i < libraryMarker.length; i++) {
    if(libraryMarker[i].getVisible()) 
      libraryMarker[i].setVisible(false);
    else 
      libraryMarker[i].setVisible(true);
  }
}

var prev_infowindow ;

function createInfoLibrary(libmarker, data) {
	
	var infowindow = new google.maps.InfoWindow({
                       content: ""
                   });

	google.maps.event.addListener(libmarker, 'click', function() {
      if( prev_infowindow != undefined) {
           prev_infowindow.close();
       }
	  prev_infowindow = infowindow;
		infowindow.setContent(data._primary_decsription);
		infowindow.setContent(data._primary_decsription);
    infowindow.open(libmarker.get("map"), libmarker);
	  document.getElementById("1").innerHTML = "<b>Name:</b> " + data.name_ ;
    document.getElementById("2").innerHTML = "<b>Shedule:</b> " + data.hours_of_operation;
	  document.getElementById("3").innerHTML = "<b>Address:</b> " + data.address ;
	  document.getElementById("4").innerHTML = "<b>Phone number:</b>" + data.phone ;
	  document.getElementById("5").innerHTML = "<b>Website:</b> <a href="+data.website+">"+ data.website +"</a>";
	  document.getElementById("6").innerHTML = " <b>There is a cibernavigator? :</b>" +data.cybernavigator;
	  document.getElementById("7").innerHTML = "<b>There is a teacher in the library? :</b> "+data.teacher_in_the_library ;
	  document.getElementById("8").innerHTML = " " ;
	  document.getElementById("9").innerHTML = " " ;
    document.getElementById("10").innerHTML = " " ;
    document.getElementById("11").innerHTML = " " ;
    document.getElementById("12").innerHTML = " " ; 
    document.getElementById("13").innerHTML = " " ;
    document.getElementById("14").innerHTML = " " ;   	
});
}


function createMarkerLibraries(data){

      libmarker = new google.maps.Marker({
      position: new google.maps.LatLng(data.location.coordinates[1],data.location.coordinates[0]),
      map: map,
      title: data.primary_type ,
      icon : 'Images/librarieIcon.png'
      });
      createInfoLibrary(libmarker, data);
}


