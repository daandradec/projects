function initMap(){
		var lati = 41.8708;
		var long = -87.6505;
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: latitude1, lng: longitude1},
			zoom: 14,
			styles: [
				{
					"featureType":"poi",
					"stylers":[
						{"visibility":"off"}
					]
				}
			]
		});	
}