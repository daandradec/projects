function myMap() {
	var mapCanvas = document.getElementById("map");
	var myCenter = new google.maps.LatLng(41.8708,-87.6505); 
	var mapOptions = {center: myCenter, zoom: 16};
	var map = new google.maps.Map(mapCanvas,mapOptions);
	var marker = new google.maps.Marker({
	position: myCenter,
	animation: google.maps.Animation.BOUNCE
	});
	marker.setMap(map);
}