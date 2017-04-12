$(document).ready(function(){

	$("#Submit").click(function(){
		$.ajax({
			type:"GET",
			url: "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json"
		}).done(function (result) {

				resultsHandler(result);

            });
	});
});

var map;

var goldStar = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 0.05,
    strokeColor: 'gold',
    strokeWeight: 5
  };

	function initMap(){
		var mapDiv = document.getElementById('map');
			map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 15});  
		var marker = new google.maps.Marker({ 
			position: {lat: 41.8708, lng: -87.6505},
			map: map,
			title: 'Purdue University'
		});
	}
	
	function Map(x,y){		

		var marker = new google.maps.Marker({ 
			position: {lat: Number(x), lng: Number(y)},
			icon: goldStar,
			// icon: {
					// path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
					// scale: 10
				  // },
			map: map,
			title: ''
		});	
		
	}
	
	
	
function resultsHandler(result){
	// console.log(result.data);
	// var chi = $("<table></table>");
	// chi.append('<tr><th>Inmobiliary</th><th>Neighborhood</th><th>Latitude</th><th>Longitud</th><th>Phone</th></tr>');
	
	for(var i = 0; i < result.data.length; ++i){
		// chi.append('<tr><td>' + result.data[i][15] + '</td><td>' + result.data[i][8] 
		// + '</td><td>'  + result.data[i][19] + '</td><td>'  + result.data[i][20] + '</td><td>'  
		// + result.data[i][14] + '</td></tr>');
		Map(result.data[i][19],result.data[i][20]);
		
	}
	// $('body').append(chi);
	}