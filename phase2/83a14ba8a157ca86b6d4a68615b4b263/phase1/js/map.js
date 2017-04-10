var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.667577},
    zoom: 13
  });
  var marker = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.667577}, //Line2: Location to be highlighted
			map: map,//Line 3: Reference to map object
			title: 'University of Illinois' //Line 4: Title to be given
		})
}