var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14
  });

  var coord = [];

	var newhttp = new XMLHttpRequest();
	newhttp.open("GET", " https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD", true);
	newhttp.send();

	newhttp.onreadystatechange = function(){
		if (newhttp.readyState == 4 && newhttp.status == 200) {
			var text = newhttp.responseText;
			var parsed = JSON.parse(text);
			
			for (var i = 0; i<263; i++){
				coord[i] = [parsed.data[i][19], parsed.data[i][20]];
			}	

			var mark;			
			for (var i = 0; i < 263; i++) {
				mark = new google.maps.Marker({
					position: new google.maps.LatLng(Number(coord[i][0]), Number(coord[i][1])),
					map: map
				})
			}

			mark = new google.maps.Marker({
				position: new google.maps.LatLng(41.8708, -87.6505),
				map: map,
				icon: {
					url: "https://mt.googleapis.com/vt/icon/name=icons/onion/158-yellow.png&scale=1.0",
					size: new google.maps.Size(32,32),
					origin: new google.maps.Point(0,0)
				}	 
			})
		}
	}

}