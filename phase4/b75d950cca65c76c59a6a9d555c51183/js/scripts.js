
//var map;
var casita = "http://2.bp.blogspot.com/-mGO193_cWSY/VVyrMKN11BI/AAAAAAAAEbk/A0EGzxeeyiA/s1600/casita%2Bchocolate.png";

var mapi ;

function initMap(){
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 12});
		var mapi=map;
		var marker = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
			map: map,//Line 3: Reference to map object
			title: 'University of Illinois, Chicago' //Line 4: Title to be given
		});
}

var image = {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // This marker is 20 pixels wide by 32 pixels high.          
        };


$(document).ready(function(){

	$("#add").click(function(){
		$.ajax({
			type:"GET",
			url: "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json"
		}).done(function (positions) {

				searchData(positions);

            });
	});
});

	function newMarker(x,y){
		var px=Number(x);
		var py=Number(y);		
		//alert(px + " " + py);
		var marker = new google.maps.Marker({ 
			position: {lat: px, lng: py},
			//icon: image,
			map: mapi,
			title: 'rent'
		});	
		
	}


function searchData(positions){	
	
	for(var i = 0; i < positions.data.length; ++i){
		newMarker(positions.data[i][19],positions.data[i][20]);
		
	}
}