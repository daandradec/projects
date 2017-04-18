var washedData=[];
var map;
var elevator;

var markers=[];

function initMap(){
	$('#res').toggle();
	setMaxDate();
	setCrimeWashedData();
	var crime
 	getCrimeWashedData(function(gc){
 		crime=gc

	})
	var mapDiv = document.getElementById('map');

	var map = new google.maps.Map(mapDiv, {
		center: {lat: 41.8708, lng: -87.6505},
		zoom: 13});

    var infowindow = new google.maps.InfoWindow({
    	content: ""
    });

	var pinColor = "ff0000";
	var icon= {
		url: "icons/icon.ico",
		scaledSize: new google.maps.Size(25, 25),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(0, 0)

	}

	var marker = new google.maps.Marker({ //Line 1
		position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: 'Department of Electrical and Computer Engineering', //Line 4: Title to be given
		icon: icon
	})

}