var map; // Access global

//markerGroups in my map (all icons get from https://icons8.com/)
var markerGroups = {
  "parkarts": [],
  "firestations": [],
  "libraries": [],
  "condoms":[],
  "policestations":[]
};

function initMap(){
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14});

  var marker = new google.maps.Marker({
    position: {lat: 41.8708, lng: -87.6505},
    map: map,
    title: 'Purdue University',
    icon: 'images/university.png'
  });
  loadingFireStations();
  loadingPoliceStations();
  loadingParksArtworks();
  loadingLibraries();
  loadingCondomDistSites();
}
//using data set of Parks Artworks (CPD_Park_Art)
function loadingParksArtworks() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        var json = JSON.parse(text);
	        var numberOfPA = json.data.length;
	        for(var i=0; i<numberOfPA; i++){
            var data=[]
            var namePark = json.data[i][8];
            data.push(namePark);
            var noPark = json.data[i][9];
            data.push(noPark);
            var artist = json.data[i][14];
            data.push(artist);
	        	var latLng = "";
            var namePlayArt ="";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][13] +', "lng":'+ json.data[i][12] +' }');
            namePlayArt = json.data[i][10];
            data.push(namePlayArt);
            var iconparkart='images/parkart.png';
            var type="parkarts";
            var marker = createMarker(latLng, namePlayArt, type, map, iconparkart,data);
            marker.setVisible(false);
	        }
		}
	}
}

//using data set of Fire Stations
function loadingFireStations() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        var json = JSON.parse(text);
	        var numberOfFS = json.data.length;
          for(var i=0; i<numberOfFS; i++){
            var temp=json.data[i][14];
            var latLng ="";
	        	latLng = JSON.parse('{ "lat":'+ temp[1] +', "lng":'+ temp[2] +' }');
            nameFS="Fire Station";
            iconfirestation='images/fire-station.png';
            type="firestations";
            var data=[];
            var address=json.data[i][9];
            data.push(address);
            var marker= createMarker(latLng, nameFS, type, map, iconfirestation,data);
            marker.setVisible(false);
          }
		}
	}
}

//using data set of Libraries - Locations, Hours and Contact Information
function loadingLibraries() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        var json = JSON.parse(text);
	        var numberOfL = json.data.length;
          for(var i=0; i<numberOfL; i++){
            var data=[]
            var nameLib = json.data[i][8];
            data.push(nameLib);
            var schedule = json.data[i][9];
            data.push(schedule);
            var cibernav = json.data[i][10];
            data.push(cibernav);
            var teacher = json.data[i][11];
            data.push(teacher);
            var addresslib = json.data[i][12];
            data.push(addresslib);
            var phonelib = json.data[i][16];
            data.push(phonelib);
            var webpagelib = json.data[i][17][0];
            data.push(webpagelib);
	        	var latLng = "";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][18][1] +', "lng":'+ json.data[i][18][2] +' }');
            var iconlib='images/librarie.png';
            var type="libraries";
            var marker = createMarker(latLng, nameLib, type, map, iconlib,data);
            marker.setVisible(false);
          }
		}
	}
}

//using data set of Condom Distribution Sites
function loadingCondomDistSites() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/azpf-uc4s/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        var json = JSON.parse(text);
	        var numberOfCDS= json.data.length;
          for(var i=0; i<numberOfCDS; i++){
            var data=[];
            var venuetypecds=json.data[i][8];
            data.push(venuetypecds);
            var namecds=json.data[i][9];
            data.push(namecds);
            var addresscds=json.data[i][10];
            data.push(addresscds);
            var latLng ="";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][14][1] +', "lng":'+ json.data[i][14][2] +' }');
            iconcds='images/condom.png';
            type="condoms";
            var marker= createMarker(latLng, namecds, type, map, iconcds,data);
            marker.setVisible(false);
          }
		}
	}
}
//using data set of Police Stations
function loadingPoliceStations() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        var json = JSON.parse(text);
	        var numberOfPS= json.data.length;
          for(var i=0; i<numberOfPS; i++){
            var data=[];
            var districtps=json.data[i][8];
            data.push(districtps);
            var distnameps=json.data[i][9];
            data.push(distnameps);
            var addressps=json.data[i][10];
            data.push(addressps);
            var webpageps=json.data[i][14][0];
            data.push(webpageps);
            var phoneps=json.data[i][15][0];
            data.push(phoneps);
            var faxps=json.data[i][16][0];
            data.push(faxps);
            var ttyps=json.data[i][17][0];
            data.push(ttyps);
            var latLng ="";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][20] +', "lng":'+ json.data[i][21] +' }');
            iconps='images/police-station.png';
            type="policestations";
            var marker= createMarker(latLng, distnameps, type, map, iconps,data);
            marker.setVisible(false);
          }
		}
	}
}
//create marker and set the listener based on type in every marker on the map to show in index.html
function createMarker(latLng, name, type, map, icono,data) {
  var marker = new google.maps.Marker({
    map: map,
    position: latLng,
    icon: icono,
    title: name,
    type: type
  });
  if (!markerGroups[type]) markerGroups[type] = [];
  markerGroups[type].push(marker);
  if(type=="parkarts"){
    google.maps.event.addListener(marker, 'click', function(){
      document.getElementById("namepark").innerHTML =  "<b>Park Name:</b> <em>" + data[0] + "</em>";
      document.getElementById("nopark").innerHTML =  "<b>Park Number:</b> <em>" + data[1] + "</em>";
      document.getElementById("nameplay").innerHTML =  "<b>Play Name or Activity:</b> <em>" + data[2] + "</em>";
      document.getElementById("artist").innerHTML =  "<b>Artist Name:</b> <em>" + data[3] + "</em>";
    });
  }else if(type=="firestations"){
    google.maps.event.addListener(marker, 'click', function(){
      document.getElementById("addressfs").innerHTML =  "<b>Address:</b> <em>" + data[0] + "</em>";
    });
  }else if(type=="libraries"){
    google.maps.event.addListener(marker, 'click', function(){
      document.getElementById("namelib").innerHTML =  "<b>Librarie Name:</b> <em>" + data[0] + "</em>";
      document.getElementById("schedulelib").innerHTML =  "<b>Schedule:</b> <em>" + data[1] + "</em>";
      if(data[2]){
        document.getElementById("cibernavlib").innerHTML =  "<b>They have ciber-navigator.</b>";
      }else{
        document.getElementById("cibernavlib").innerHTML =  "<b>They don't have ciber-navigator. :(</b>";
      }
      if(data[3]){
        document.getElementById("teacherlib").innerHTML =  "<b>They have a teacher in the library.</b>";
      }else{
        document.getElementById("teacherlib").innerHTML =  "<b>They don't have a teacher in the library. :(</b>";
      }
      document.getElementById("addresslib").innerHTML =  "<b>Address:</b> <em>" + data[4] + "</em>";
      document.getElementById("phonelib").innerHTML =  "<b>Phone Number:</b> <em>" + data[5] + "</em>";
      document.getElementById("webpagelib").innerHTML =  "<b>Website</b>: <em><a href=\"" + data[6] + "\">" + data[6] + "</a></em>";
    });
  }else if(type=="condoms"){
    google.maps.event.addListener(marker, 'click', function(){
      document.getElementById("venuetypecds").innerHTML =  "<b>Venue Type:</b> <em>" + data[0] + "</em>";
      document.getElementById("namecds").innerHTML =  "<b>Name:</b> <em>" + data[1] + "</em>";
      document.getElementById("addresscds").innerHTML =  "<b>Address:</b> <em>" + data[2] + "</em>";
    });
  }else if(type=="policestations"){
    google.maps.event.addListener(marker, 'click', function(){
      document.getElementById("nameps").innerHTML =  "<b>District Name (Num):</b> <em>" + data[1] + " (" + data[0] +")</em>";
      document.getElementById("addressps").innerHTML =  "<b>Address:</b> <em>" + data[2] + "</em>";
      document.getElementById("webpageps").innerHTML =  "<b>Website</b>: <em><a href=\"" + data[3] + "\">" + data[3] + "</a></em>";
      document.getElementById("phoneps").innerHTML = "<b>Phone Number:</b> <em>" + data[4] + "</em>";
      document.getElementById("faxps").innerHTML = "<b>Fax Number:</b> <em>" + data[5] + "</em>";
      document.getElementById("ttyps").innerHTML = "<b>TTY Line:</b> <em>" + data[6] + "</em>";
    });
  }
  return marker;
}

//show or hide markers by type
function toggleGroup(type) {
  for (var i = 0; i < markerGroups[type].length; i++) {
    var marker = markerGroups[type][i];
    if (!marker.getVisible()) {
      marker.setVisible(true);
    } else {
      marker.setVisible(false);
    }
  }
}
