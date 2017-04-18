//This js file controlls the map view and the view of distances, also, display the appropriate data when clicking on a marker

var map;
var markers = [];
var neigh = [];
var information = [];
var lessOne = [];
var oneThree = [];
var threeSix = [];
var moreThree = [];


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 12
  });

	var newhttp = new XMLHttpRequest();
	newhttp.open("GET", "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD", true);
	newhttp.send();

	newhttp.onreadystatechange = function(){
		if (newhttp.readyState == 4 && newhttp.status == 200) {
			var text = newhttp.responseText;
			var parsed = JSON.parse(text);


//Draw markers
			for (var i = 0; i < parsed.data.length; i++) {
				markers[i] = new google.maps.Marker({
					position: new google.maps.LatLng(Number(parsed.data[i][19]), Number(parsed.data[i][20])),
					map: map
				})
				neigh[i] = [1,1,1,1,1];
				information[i] = [parsed.data[i][12], parsed.data[i][14], parsed.data[i][10], parsed.data[i][8]];
				showInfo(markers[i], "Name: "+parsed.data[i][11], i);
			}

			var info = new google.maps.InfoWindow({
					content: ""
			});


//Function that assigns the infowindow and redraws the info bars
			function showInfo(marker, string, i){
				google.maps.event.addListener(marker, 'click', function(){
                   	setData(neigh[i][0],neigh[i][1],neigh[i][2],neigh[i][3],neigh[i][4]);
					reDraw();
					map.setZoom(14);
					map.setCenter(marker.getPosition());
					info.setContent(string);
					info.open(marker.get('map'), marker);
					$("#Capa_2").animate({
				        height: '+=20px',
				        width: '+=20px',
					})
					$("#Capa_2").animate({
				        height: '-=20px',
				        width: '-=20px',
					})
					setInfoView(i);
				});
			}


//University marker
			var universityMarker = new google.maps.Marker({
				position: new google.maps.LatLng(41.8708, -87.6505),
				map: map,
				icon: {
					url: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/32/Map-Marker-Marker-Outside-Chartreuse.png",
					size: new google.maps.Size(32,32),
					origin: new google.maps.Point(0,0)
				}	 
			})

			universityMarker.addListener('click', function(){
				info.setContent("University");
				info.open(map, universityMarker);
			})
			

//this section charges the data on the corresponding array usung deferred object

            $.when(loadPolice(), loadLibraries(), loadTrafic(), loadParks(), loadBikes())
                .then((police, libraries, trafic, parks, bikes)=>{
                    for (var i = 0; i < police.data.length; i++) {
                        policeCoords[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(Number(police.data[i][20]), Number(police.data[i][21])),
                            icon: "imgs/police.svg"                    
                        });
                        for (var j = 0; j < markers.length; j++) {
                        	var aux = haversine(markers[j], policeCoords[i]);
                    		if(!isNaN(aux) && aux < 0.497097){ //nearly in miles
                    			neigh[j][0]++;
                    		}
                        }
                    }

                    for (var i = 0; i < libraries.data.length; i++) {
                        librariesCoords[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(Number(libraries.data[i][18][1]), Number(libraries.data[i][18][2])),
                            icon: "imgs/libro.svg"
                        });
                        for (var j = 0; j < markers.length; j++) {
                        	var aux = haversine(markers[j], librariesCoords[i]);
                    		if(!isNaN(aux) && aux < 0.497097){ //nearly in miles
                    			neigh[j][1]++;
                    		}
                        }
                    }

                    for (var i = 0; i < trafic.data.length; i++) {
                        traficCoords[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(Number(trafic.data[i][14]), Number(trafic.data[i][15])),
                            icon: "imgs/traffic.svg"
                        });
                        for (var j = 0; j < markers.length; j++) {
                        	var aux = haversine(markers[j], traficCoords[i]);
                    		if(!isNaN(aux) && aux < 0.497097){ //nearly in miles
                    			neigh[j][2]++;
                    		}
                        }
                    }

                    for (var i = 0; i < parks.data.length; i++) {
                        parksCoords[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(Number(parks.data[i][14][1]), Number(parks.data[i][14][2])),
                            icon: "imgs/park.svg"
                        });
                        for (var j = 0; j < markers.length; j++) {
                        	var aux = haversine(markers[j], parksCoords[i]);
                    		if(!isNaN(aux) && aux < 0.497097){ //nearly in miles
                    			neigh[j][3]++;
                    		}
                        }
                    }

                    for (var i = 0; i < bikes.data.length; i++) {
                        cicleCoords[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(Number(bikes.data[i][14]), Number(bikes.data[i][15])),
                            icon: "imgs/bike.svg"
                        });
                        for (var j = 0; j < markers.length; j++) {
                        	var aux = haversine(markers[j], cicleCoords[i]);
                    		if(!isNaN(aux) && aux < 0.497097){ //nearly in miles
                    			neigh[j][4]++;
                    		}
                        }
                    }
                });


//calculate all distances between university marker and the rest of the markers
			for (var i = 0; i < markers.length; i++ ) {
				var m = haversine(universityMarker, markers[i]);
				if (m <= 1) {
					lessOne.push(markers[i]);
				}else if (m > 1 && m <= 3){
					oneThree.push(markers[i]);
				}else if (m > 3 && m <= 6) {
					threeSix.push(markers[i]);
				}else moreThree.push(markers[i]);
			}
		}
	}
}


//Function that Obtains the real distance in miles between two markers
function haversine(markerUnv, markerB){
	var delLat = ((markerB.getPosition().lat() - markerUnv.getPosition().lat())*Math.PI)/180;
	var delLong = ((markerB.getPosition().lng() - markerUnv.getPosition().lng())*Math.PI)/180;
	var a = Math.pow((Math.sin(delLat/2)),2) + (Math.cos(markerUnv.getPosition().lat()) * Math.cos(markerB.getPosition().lat()) * Math.pow((Math.sin(delLong/2)),2));
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	return Number(c * 3963.105);
}


//Next functions allows to change the map distances
function setMapOnAll(mar, map){
	for (var i = 0; i < mar.length; i++ ) {
		mar[i].setMap(map);
	}
}

function clearMap(){
	setMapOnAll(markers, null);
}

function near(){
	clearMap();
	for (var i = 0; i < lessOne.length; i++) {
		lessOne[i].setMap(map);
	}
	map.setZoom(14);
	map.setCenter({lat: 41.8708, lng: -87.6505});
}

function medium(){
	clearMap();
	for (var i = 0; i < oneThree.length; i++) {
		oneThree[i].setMap(map);
	}
	map.setZoom(13);
	map.setCenter({lat: 41.8708, lng: -87.6505});
}

function medium2(){
	clearMap();
	for (var i = 0; i < threeSix.length; i++) {
		threeSix[i].setMap(map);
	}
	map.setZoom(12);
	map.setCenter({lat: 41.8708, lng: -87.6505});
}

function far(){
	clearMap();
	for (var i = 0; i < moreThree.length; i++) {
		moreThree[i].setMap(map);
	}
	map.setZoom(11);
	map.setCenter({lat: 41.8708, lng: -87.6505});
}

function showAll(){
	clearMap();
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
	map.setZoom(12);
	map.setCenter({lat: 41.8708, lng: -87.6505});
}

//0.000012084050937658212695342466481443751953020788634603468  -> 1m en longitud
//0.0000089914402679568291775213993301079270561965016747301823 -> 1m en latitud
