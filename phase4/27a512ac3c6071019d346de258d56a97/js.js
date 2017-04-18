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

function hide(){

	document.getElementById('jumbo').style.display = 'none';
	document.getElementById('jumbo2').style.display = 'block';
}


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
			zoom: 14});  
		var marker = new google.maps.Marker({ 
			position: {lat: 41.8708, lng: -87.6505},
			map: map,
			title: 'Purdue University'
		});
		
		var contentString = "<div>" + "<b>University Of Illinois At Chicago</b> " +"</div>";
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		  });
		
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		  });
	}
	
	function Map(x,y,n,pT,a,p,m){		
	
		
		var contentString = "<div>" + "<b>Neighborhood:</b> " + n +"</div>"+ 
		"<div>" +"<b>Property Type:</b> " + pT  +"</div>"+
		"<div>" + "<b>Address:</b> " + a +"</div>"+
		"<div>" + "<b>Phone Number:</b> " + p +"</div>"+
		"<div>" + "<b>Management Company:</b> " + m +"</div>"
		;
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		  });

		var marker = new google.maps.Marker({ 
			position: {lat: Number(x), lng: Number(y)},
			icon: goldStar,
			map: map,
			title: ''
		});	
		
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		  });
		
		  
		
	}
	
	
	
function resultsHandler(result){
	
	for(var i = 0; i < result.data.length; ++i){
		Map(result.data[i][19],result.data[i][20],result.data[i][8],
			result.data[i][10],result.data[i][12],result.data[i][14],
			result.data[i][15]);
			
		
	}
	}