
function initMap(){
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14});

  var marker = new google.maps.Marker({
    position: {lat: 41.8708, lng: -87.6505},
    map: map,
    title: 'illinois University',
    icon: 'img/u_ico.png'
  });
  loadingRentalHouses();
}
function loadingRentalHouses() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        var json = JSON.parse(text);
	        var numberOfPA = json.data.length;
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            var namePlayArt ="";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
            namePlayArt = json.data[i][11];
	        	var n = new google.maps.Marker({
						    	position: latLng,
						   		map: map,
						  		title: namePlayArt,
						  		icon: 'img/house_ico.png'
						  	});
	        }
		}
	}
}


