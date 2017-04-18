// JavaScript Document
var geocoderSpeed = 50;
window.countPoints = [];

var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];


var completeData = [];
window.interestPoint;
window.interestProximity = [];
var activeCircle;

var map;
var infowindow;
var ownWindow;
//var location = new google.maps.LatLng(41.8708, -87.6505);
//var markerImage = 'http://www.mapsmarker.com/wp-content/uploads/leaflet-maps-marker-icons/bar_coktail.png';
// Load of Chicago DataSet
var theInterval;
var geocoder;

var current = "";

var img_park = "images/map_markers/park.png";
var img_restaurant = "images/map_markers/restaurant.png";	
var img_entertainment = "images/map_markers/entertainment.png";	
var img_sport = "images/map_markers/sport.png";	
var img_store = "images/map_markers/store.png";	
var img_house = "images/map_markers/house.png";

window.activeMarker;

window.park_mk = [];
var restaurant_mk = new Array();
var entertainment_mk = new Array();
var sport_mk = new Array();	
var store_mk = new Array();

function initMap() {
geocoder = new google.maps.Geocoder();
var alternative = 'images/map_marker.png';
var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var uci_university = {lat: 41.8708, lng: -87.6505};
var myLatLng = {lat: -25.363, lng: 131.044};
	
window.img_park = "images/map_markers/park.png";
window.img_restaurant = "images/map_markers/restaurant.png";	
window.img_entertainment = "images/map_markers/entertainment.png";	
window.img_sport = "images/map_markers/sport.png";	
window.img_store = "images/map_markers/store.png";		
	
var img_park = "images/map_markers/park.png";
var img_restaurant = "images/map_markers/restaurant.png";	
var img_entertainment = "images/map_markers/entertainment.png";	
var img_sport = "images/map_markers/sport.png";	
var img_store = "images/map_markers/store.png";		

var img_house = "images/map_markers/house.png";

	
map = new google.maps.Map(document.getElementById('map'), {
  center: uci_university,
  zoom: 13,
	mapTypeId: 'terrain'
});

 var cityCircle = new google.maps.Circle({
	strokeColor: '#1D80FF',
	strokeOpacity: 0.5,
	strokeWeight: 2,
	fillColor: '#1D80FF',
	fillOpacity: 0.1,
	map: map,
	center: uci_university,
	radius: 1000
  });
	
	var uci_marker = new google.maps.Marker({
	  position: uci_university,
	  map: map,
	  icon: alternative,
	  title: 'UIC University'
	});	
	

	infowindow = new google.maps.InfoWindow();
	ownWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(uci_marker, 'click', function() {
	  ownWindow.setContent(uci_marker.title);
	  ownWindow.open(map, this);
	});
	
	activeMarker = uci_marker;
	
	$('.park').click(function(){
//		console.log("My active marker is: ", activeMarker, typeof(activeMarker));
		if($(this).hasClass("active")){
			
			 $(this).toggleClass("active");
			 for(var i = 0; i < park_mk.length; i++){
				 park_mk[i].setMap(null);
			 }
			 for(var x = 0; x < park_mk.length; x++){
				 park_mk.pop();
				 
			 }
		}else{
			$(this).toggleClass("active");
			  current = img_park;
			  var service = new google.maps.places.PlacesService(map);
			  service.nearbySearch({
			  location: activeMarker.position,
			  radius: '1000',
			  type: ['park']
			}, callback);	
			
		}
		
	});
	
	
	$('.sport').click(function(){
		
		if($(this).hasClass("active")){
			
			 $(this).toggleClass("active");
			 for(var i = 0; i < sport_mk.length; i++){
				 sport_mk[i].setMap(null);
			 }
			 for(var x = 0; x < sport_mk.length; x++){
				 sport_mk.pop();
				 
			 }
		}else{
			$(this).toggleClass("active");
			  current = img_sport;
			  var service = new google.maps.places.PlacesService(map);
			  service.nearbySearch({
			  location: activeMarker.position,
			  radius: '1000',
			  type: ['gym']
			}, callback);	
			
		}
		
	});
	
	$('.restaurant').click(function(){
		if($(this).hasClass("active")){
			
			 $(this).toggleClass("active");
			 for(var i = 0; i < restaurant_mk.length; i++){
				 restaurant_mk[i].setMap(null);
			 }
			 for(var x = 0; x < restaurant_mk.length; x++){
				 restaurant_mk.pop();
				 
			 }
		}else{
			$(this).toggleClass("active");
			  current = img_restaurant;
			  var service = new google.maps.places.PlacesService(map);
			  service.nearbySearch({
			  location: activeMarker.position,
			  radius: '1000',
			  type: ['restaurant']
			}, callback);	
			
		}
		
	});

	$('.entertainment').click(function(){
		if($(this).hasClass("active")){
			
			 $(this).toggleClass("active");
			 for(var i = 0; i < entertainment_mk.length; i++){
				 entertainment_mk[i].setMap(null);
			 }
			 for(var x = 0; x < entertainment_mk.length; x++){
				 entertainment_mk.pop();
				 
			 }
		}else{
			$(this).toggleClass("active");
			  current = img_entertainment;
			  var service = new google.maps.places.PlacesService(map);
			  service.nearbySearch({
			  location: activeMarker.position,
			  radius: '1000',
			  type: ['movies']
			}, callback);	
			
		}
		
		
	});
	
	$('.stores').click(function(){
		if($(this).hasClass("active")){
			
			 $(this).toggleClass("active");
			 for(var i = 0; i < store_mk.length; i++){
				 store_mk[i].setMap(null);
			 }
			 for(var x = 0; x < store_mk.length; x++){
				 store_mk.pop();
				 
			 }
		}else{
			$(this).toggleClass("active");
			  current = img_store;
			  var service = new google.maps.places.PlacesService(map);
			  service.nearbySearch({
			  location: activeMarker.position,
			  radius: '1000',
			  type: ['store']
			}, callback);	
			
		}
		
	});	
	
	
	$(document).ready(function(){
		theInterval = setInterval("codeAddress()", geocoderSpeed);
	});
	
	map.set('styles', styles);
	

}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
//		console.log(results);
	  for (var i = 0; i < results.length; i++) {
		createMarker(results[i]);
	  }
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
	  map: map,
	  position: place.geometry.location,
	  icon: current
	  
});

        marker.addListener('click', function() {
          map.setZoom(16);
          map.setCenter(marker.getPosition());
        });
      
	
google.maps.event.addListener(marker, 'click', function() {
	  ownWindow.setContent(place.name);
	  ownWindow.open(map, this);
	});
	
	switch(current){
		case img_park: park_mk.push(marker);
			break;
		case img_restaurant: restaurant_mk.push(marker);
			break;
		case img_store: store_mk.push(marker);
			break;
		case img_sport: sport_mk.push(marker);
			break;
		case img_entertainment: entertainment_mk.push(marker);
			break;
	}
	
	
	
}

function codeAddress(){ 
	if(query.length == 0){
		clearInterval(theInterval);
//		alert("Load Finished");
	}
	
	var addy = query.pop();
	geocoder.geocode({'address': addy.address}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK){
			var marker = new google.maps.Marker({
				position: results[0].geometry.location,
				map: map,
				title: addy.address,
				icon: img_house
			});
		
		  marker.addListener('click', function() {
          map.setZoom(14);
          map.setCenter(marker.getPosition());
        });
			
			var info = [];
			info.push(addy, marker, calcCrimeProximity(results[0].geometry.location), calcInterestProximity(results[0].geometry.location), google.maps.geometry.spherical.computeDistanceBetween (results[0].geometry.location, new google.maps.LatLng(41.8708, -87.6505)));

			completeData.push(info);	
			
			google.maps.event.addListener(marker, 'click', function(){
				
				infowindow.setContent('<strong>' + marker.title + '</strong>');
				infowindow.open(map, this);
				activeMarker = marker;
				

				
				
				var txt = "<table class=\"table-hover table-striped\" style=\"max-heigth:100%\">";
				txt += "<tr><td> <b>Property Name:</b> </td><td>" + addy.property_name  + "</td></tr>";
				txt += "<tr><td> <b>Address:</b> </td><td>" + addy.address  + "</td></tr>";
				txt += "<tr><td> <b>Management Company:</b> </td><td>" + addy.management_company  + "</td></tr>";
				txt += "<tr><td> <b>Phone number:</b> </td><td>" + addy.phone_number  + "</td></tr>";
				txt += "<tr><td> <b>Distance:</b> </td><td>" + (info[4]/1000).toFixed(2) + " Km </td></tr>";
				txt += "</table>"
				
				$('.info_zone_data').html(txt);
				
				hi(info[2], info[4]);
				
				
				
				
				 var houseCircle = new google.maps.Circle({
					strokeColor: '#32FC98',
					strokeOpacity: 0.5,
					strokeWeight: 2,
					fillColor: '#32FC98',
					fillOpacity: 0.1,
					map: map,
					center: results[0].geometry.location,
					radius: 1000
				  });
				

				 if(typeof activeCircle === "undefined"){
					 activeCircle = houseCircle;
				 }else{
					 activeCircle.setMap(null);
					 activeCircle = houseCircle;
				 }
				
			  });	
		}
	});
	

}


function clearMarkers() {
	setMapOnAll(null);
  }

function calcCrimeProximity(houseLocation){
	var crimeProximity = 0;
	var count = 0;
	var prev = 0;
	
	$.each(crime, function(i, elem){
		if("undefined" !== typeof(elem)){
		prev =  google.maps.geometry.spherical.computeDistanceBetween (houseLocation, new google.maps.LatLng(elem.latitude, elem.longitude));
			if(!isNaN(prev))
				crimeProximity += prev;
			count++;
		}
		
		if(count == 10)
			return false;
	});	
	
	return crimeProximity;
}

function calcInterestProximity(houseLocation){

	window.aux = 0;
	window.interestProximity = [];
	window.countPoints = [];
	
	  var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch({
	  location: activeMarker.position,
	  radius: '1000',
	  type: ['gym']
	}, function(results, status){
		  
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			$.each(results, function(i, elem){
				aux += google.maps.geometry.spherical.computeDistanceBetween (houseLocation, elem.geometry.location);
			});
			
			interestProximity.push(aux);
			countPoints.push(results.length);
		}

	  });	
	
	
	  var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch({
	  location: activeMarker.position,
	  radius: '1000',
	  type: ['park']
	}, function(results, status){
		  
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			$.each(results, function(i, elem){
				aux += google.maps.geometry.spherical.computeDistanceBetween (houseLocation, elem.geometry.location);
			});
			interestProximity.push(aux);
			countPoints.push(results.length);
		}
		  
	  });
	  var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch({
	  location: activeMarker.position,
	  radius: '1000',
	  type: ['restaurant']
	}, function(results, status){
		  
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			$.each(results, function(i, elem){
				aux += google.maps.geometry.spherical.computeDistanceBetween (houseLocation, elem.geometry.location);
			});
			interestProximity.push(aux);
			countPoints.push(results.length);
		}
	  });	
	  var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch({
	  location: activeMarker.position,
	  radius: '1000',
	  type: ['store']
	}, function(results, status){
		  
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			$.each(results, function(i, elem){
				aux += google.maps.geometry.spherical.computeDistanceBetween (houseLocation, elem.geometry.location);
			});
			interestProximity.push(aux);
			countPoints.push(results.length);
		}
	  });	
	  var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch({
	  location: activeMarker.position,
	  radius: '1000',
	  type: ['movies']
	}, function(results, status){
		  
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			$.each(results, function(i, elem){ 
				aux += google.maps.geometry.spherical.computeDistanceBetween (houseLocation, elem.geometry.location);
			});	
			interestProximity.push(aux);
			countPoints.push(results.length);
		}
	  });	
	
	window.total = 0.0;
	window.ip = 0.0;
	for(var i = 0; i < interestProximity.length; i++){
		window.total += interestProximity[i];
	}
	
	for(var j = 0; j < countPoints.length; j++)
		window.ip += countPoints[j];

	return [window.total, window.ip];
}