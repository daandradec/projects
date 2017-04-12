//Author: Zhenzhi Xu
//Project: Eat Smart

//initiate map
var LatLngInit;
var mapResult;
var mapCanvasResult;
var mapOptionsResult;
var markerResult;
var marketId = []; //returned from the API
var allLatlng = []; //returned from the API
var allMarkers = []; //returned from the API
var marketName = []; //returned from the API
var infowindow = null;
var pos;
var userCords;
var tempMarkerHolder = [];

//initiate direction
var distanceDriving = [];
var durationDriving = [];
var distanceWalking = [];
var durationWalking = [];
//var LatLng2;

function myMap() {
	var myCenter = new google.maps.LatLng(40.424758,-86.9114603);
	var mapCanvas = document.getElementById("Userlocation");
	var mapOptions = {center: myCenter, zoom: 18};
	var map = new google.maps.Map(mapCanvas, mapOptions);
			
	LatLngInit = new google.maps.LatLng(40.424758,-86.9114603);
	mapCanvasResult = document.getElementById("Resultlocation");
	mapOptionsResult = {center: LatLngInit, zoom: 18};
	mapResult = new google.maps.Map(mapCanvasResult, mapOptionsResult);
	markerResult = new google.maps.Marker({position:LatLngInit});
	markerResult.setMap(mapResult);

	// Create the search box and link it to the UI element.
	var input = document.getElementById('SearchInput');
	var searchBox = new google.maps.places.SearchBox(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];
		// [START region_getplaces]
		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
				  return;
				}

		// Clear out the old markers.
		markers.forEach(function(marker) {
				  marker.setMap(null);
				});
		markers = [];

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			// Create a marker for each place.
			$('#ConfirmLoc').html('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
			LatLngInit = place.geometry.location;
				  
			markers.push(new google.maps.Marker({
					map: map,
					title: place.name,
					position: place.geometry.location
				  }));
				  
			if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				  } else {
					bounds.extend(place.geometry.location);
				  }
		});
		map.fitBounds(bounds);
		
	});
			  
}
		

function Generate(){
	
	$("html,body").animate({scrollTop: $("#ResultSec").offset().top}, 100);
	
	mapOptionsResult = {center: LatLngInit, zoom: 18};
	markerResult.setMap(null);
	markerResult = new google.maps.Marker({position:LatLngInit});
	markerResult.setMap(mapResult);
	
		
	//json format data resource url 
	var USDAurl = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=47906";
	//Use the zip code and return all market ids in area.
	
	var NCDCurl = "";
	
	//LjddxCbePddEhRNBUOUickPrpZImPZCV
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: USDAurl,
		dataType: 'jsonp',
		success: function (data) {
			
			//Get the farmer's market in Lafayette and West Lafayette
			for(var i = 0;i <= 3; i++){
				marketId.push(data.results[i].id);
				marketName.push(data.results[i].marketname);
			}
								
			console.log(marketName);
					
			var counter = 0;
			
			$.each(marketId, function (k, v){
				$.ajax({
					type: "GET",
					contentType: "application/json; charset=utf-8",
					// submit a get request to the restful service mktDetail.
					url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + v,
					dataType: 'jsonp',
					success: function (data) {

						for (var key in data) {

							var results = data[key];
								
							console.log(results);

							var googleLink = results['GoogleLink'];
							var latLong = decodeURIComponent(googleLink.substring(googleLink.indexOf("=")+1, googleLink.lastIndexOf("(")));
								
							var split = latLong.split(',');
							var latitude = split[0];
							var longitude = split[1];
							var imageFM = 'image/icons/png/PocketMap.png';
							
							var scheduleTemp = results['Schedule'];
							var split2 = scheduleTemp.split('<br>');
							var schedule = split2[0];
								
							//set the markers.	  
							var myLatlng = new google.maps.LatLng(latitude,longitude);
						  
							allMarkers = new google.maps.Marker({
								position: myLatlng,
								map: mapResult,
								title: marketName[counter],
								icon: imageFM
							});

							//put all lat long in array
							allLatlng.push(myLatlng);
									
							//Put the marketrs in an array
							tempMarkerHolder.push(allMarkers);
							

		
							
							google.maps.event.addListener(allMarkers, 'click', function () {
								
								//Call Google direction API to get the direction & duration for driving
								var service = new google.maps.DistanceMatrixService();
								service.getDistanceMatrix({
									origins: [LatLngInit],
									destinations: [myLatlng],
									travelMode: google.maps.TravelMode.DRIVING,
									unitSystem: google.maps.UnitSystem.METRIC,
									avoidHighways: false,
									avoidTolls: false
								}, function (response, status) {
									if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
										console.log(response);
										distanceDriving = response.rows[0].elements[0].distance.text;
										durationDriving = response.rows[0].elements[0].duration.text;
										console.log("D " + distanceDriving);
										console.log("D " + durationDriving);
										$('#driving').html('<img src="image/icons/png/Drive.png" height=20px width=20px> <strong>Distance:</strong> ' + distanceDriving + ' <strong>Duration:</strong> ' + durationDriving);
									} else {
										alert("Unable to find the distance via road.");
									}
								});
					
								//Call Google direction API to get the direction & duration for driving
								service.getDistanceMatrix({
									origins: [LatLngInit],
									destinations: [myLatlng],
									travelMode: google.maps.TravelMode.WALKING,
									unitSystem: google.maps.UnitSystem.METRIC,
									avoidHighways: false,
									avoidTolls: false
								}, function (response, status) {
									if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
										console.log(response);
										distanceWalking = response.rows[0].elements[0].distance.text;
										durationWalking = response.rows[0].elements[0].duration.text;
										$('#walking').html('<img src="image/icons/png/Walk.png" height=20px width=20px>  <strong>Distance:</strong> ' + distanceWalking + ' <strong>Duration:</strong> ' + durationWalking);
										
									} else {
										alert("Unable to find the distance via road.");
									}
								});
									
								
								$('#MarketName').html(this.title);
								$('#Address').html('<strong>[Address]</strong> ' + results['Address']);
								//$('#Products').html('<div><p>Products: ' + results['Products'] + '</p><br></div>');
								$('#Schedule').html('<strong>[Hours]</strong> ' + schedule);
								$("#Distance").html('<strong>[Direction]</strong>');
				
							});		
							
							counter++;
						};
								
						
								
						
						//  Make an array of the LatLng's of the markers you want to show
						//  Create a new viewpoint bound
						var bounds = new google.maps.LatLngBounds ();
						//  Go through each...
						for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
							//  And increase the bounds to take this point
							bounds.extend (allLatlng[i]);
						}
						//  Fit these bounds to the map
						mapResult.fitBounds (bounds);
										
					}
					
					
				});			
				
							
			}); //end .each
		}
	});
}