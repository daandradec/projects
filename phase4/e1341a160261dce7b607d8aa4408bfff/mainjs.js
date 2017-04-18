var rentM = [];
var markers = [];
var markers2=[[],[],[],[],[]];
var policeM = [];
var parkM = [];
var fireM = [];

  function rent(map){
$.ajax({
    url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
    type: "GET",
    data: {
      "$$app_token" : "HUjUGsr4YSMjvcwZejaYLHoBl"
    }
}).done(function(data) {
  document.getElementById("inforentall").innerHTML =  "All (" + data.length + ") rent places";
    for (var i = 0; i <= data.length; i++) {

		  var marker = new google.maps.Marker({
	      position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
	      map: map,
	      title: data[i].address,
	      icon: "images/icon2.png"
	   	});
      rentM.push(marker);
      markers.push(marker);

    };
});
}


function rentHid() {
  for (var i = 0; i < rentM.length; i++) {
    rentM[i].setMap(null);
  }
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
  }
}

function bic(map) {
  map.data.loadGeoJson('https://data.cityofchicago.org/api/geospatial/kdt9-s6vu?method=export&format=GeoJSON');

}

//Police stations

function police(map){
$.ajax({
  url: "https://data.cityofchicago.org/resource/9rg7-mz9y.json",
  type: "GET",
  data: {
    "$$app_token" : "HUjUGsr4YSMjvcwZejaYLHoBl"
  }
}).done(function(data) {
document.getElementById("inforentall").innerHTML =  "All (" + data.length + ") police stations";
for (var i = 0; i<=data.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
	      map: map,
	      title: data[i].address,
	      icon: "images/icon2.png"
    });
    policeM.push(marker);
    markers.push(marker);
  };
});
}

function policeHandler(){
  if(police_check.checked){
    document.getElementById("inforentall").innerHTML =  "All";
    police(map);
   }
   else{
     for (var i = 0; i < policeM.length; i++) {
             policeM[i].setMap(null);
     }
   }
}


//Parks
function park(map){
$.ajax({
  url: "https://data.cityofchicago.org/resource/cz2z-xiax.json",
  type: "GET",
  data: {
    "$$app_token" : "HUjUGsr4YSMjvcwZejaYLHoBl"
  }
}).done(function(data) {
document.getElementById("inforentall").innerHTML =  "All (" + data.length + ") parks";
for (var i = 0; i<=data.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].location.coordinates[1],data[i].location.coordinates[0]),
	      map: map,
	      title: data[i].address,
	      icon: "images/icon2.png"
    });
    parkM.push(marker);
    markers.push(marker);
  };
});
}

function parkHandler(){
  if(park_check.checked){
    park(map);
   }
   else{
     for (var i = 0; i < parkM.length; i++) {
             parkM[i].setMap(null);
     }
   }
}


//Fire Stations
function fire(map){
$.ajax({
  //url: "https://data.cityofchicago.org/api/views/hp65-bcxv",
  url: "https://data.cityofchicago.org/resource/b4bk-rjxe.json",
  type: "GET",
  data: {
    "$$app_token" : "HUjUGsr4YSMjvcwZejaYLHoBl"
  }
}).done(function(data) {
document.getElementById("inforentall").innerHTML =  "All (" + data.length + ") fire";
for (var i = 0; i<=data.length; i++) {
    var marker = new google.maps.Marker({
      //position: new google.maps.LatLng(data[i].columns[6].cachedContents.largest.latitude,data[i].columns[6].cachedContents.largest.longitude),
	  position: new google.maps.LatLng(data[i].location.coordinates[1],data[i].location.coordinates[0]),
		  map: map,
	      title: data[i].address,
	      icon: "images/icon2.png"
    });
    fireM.push(marker);
    markers.push(marker);
  };
});
}

function fireHandler(){
  if(fire_check.checked){
    fire(map);
   }
   else{
     for (var i = 0; i < fireM.length; i++) {
             fireM[i].setMap(null);
     }
   }
}


