var marker;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

//ICONOS
//https://fusiontables.google.com/DataSource?dsrcid=308519#map:id=3



function initMap(){

	var image = {
	    url: 'https://maps.google.com/mapfiles/kml/shapes/small_red.png',
	    // This marker is 20 pixels wide by 32 pixels high.
	    size: new google.maps.Size(20, 32),
	    // The origin for this image is (0, 0).
	    origin: new google.maps.Point(0, 0),
	    // The anchor for this image is the base of the flagpole at (0, 32).
	    anchor: new google.maps.Point(0, 32)
	  };


	var icon = {
	    url: "IMG/uic_logo.png", // url
	    scaledSize: new google.maps.Size(40, 40), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var iconMarket = {
	    url: "IMG/market_stand.png", // url
	    scaledSize: new google.maps.Size(30, 30), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var iconPolice = {
	    url: "IMG/police.png", // url
	    scaledSize: new google.maps.Size(30, 30), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var house = {
	    url: "IMG/house.png", // url
	    scaledSize: new google.maps.Size(30, 30), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 41.8708, lng: -87.6505},
		zoom: 13});
	marker = new google.maps.Marker({
		position: {lat: 41.8708, lng: -87.6505}, 
		map: map, 
        title: 'Department of Computer Science' ,
	    animation: google.maps.Animation.DROP,
	    icon: icon

	});
        marker.addListener('click', toggleBounce);

    $.get("https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD", function (datos) {
    	for (var i = 0; i < datos.data.length; i++) {
    		/*console.log(datos.data[i]);
    		console.log(datos.data[i][8]);
    		console.log(datos.data[i][18]);
    		console.log(datos.data[i][19]);
    		*/
    		var myLatlng = new google.maps.LatLng(datos.data[i][18],datos.data[i][19]);
    		var name = datos.data[i][8];
    		mark = new google.maps.Marker(
	    		{
	    			position: myLatlng,
	    			title: name,
	    			map: map,
	    			icon: iconMarket
	    		})
    	}
	});

	$.get("https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD", function (datos) {
    	for (var i = 0; i < datos.data.length; i++) {
    		var myLatlng = new google.maps.LatLng(datos.data[i][20],datos.data[i][21]);
    		var name = datos.data[i][10];
    		mark = new google.maps.Marker(
	    		{
	    			position: myLatlng,
	    			title: name,
	    			map: map,
	    			icon: iconPolice
	    		})
    	}
	});

	$.get("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD", function (datos) {
    	for (var i = 0; i < datos.data.length; i++) {
    		var myLatlng = new google.maps.LatLng(datos.data[i][19],datos.data[i][20]);
    		var name = datos.data[i][12];
    		mark = new google.maps.Marker(
	    		{
	    			position: myLatlng,
	    			title: name,
	    			map: map,
	    			icon: house
	    		})
    	}
	});

}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
