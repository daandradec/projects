/**
Author: Anni Piragauta
**/

function initMap(){
	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 41.870800, lng: -87.650500},
		zoom: 15});  
	var marker = new google.maps.Marker({ 
		position: {lat: 41.870800, lng: -87.650500},
		map: map,
		title: 'Purdue University'
	});
};

function loadFlickr(lat, lon) {
  var script_element = document.createElement('script');

  script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0d671fa3ecdafbedf98911934d2e4e4e&lat=41.870800&lon=-87.650500&accuracy=1&sort=relevance&extras=url_l&format=json";

  document.getElementsById('flickr')[0].appendChild(script_element);
}
