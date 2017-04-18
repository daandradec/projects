	function initMap(){
		var mapDiv = document.getElementById('gl'); //Line 1: Save reference to div element where map would be shown
		var map = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
			center: {lat: 41.8708, lng: -87.6505}, //This is Purdue University's Location
			zoom: 14});
		var marker = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
			map: map,//Line 3: Reference to map object
			title: ' Department of Computer Science – University of Illinois, Chicago' //Line 4: Title to be given
		})
	}