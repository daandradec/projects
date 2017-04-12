

var markers=[];

function bicycle(map){

		$.ajax({
	    url: "https://data.cityofchicago.org/resource/aavc-b2wj.json",
	    type: "GET",
	    data: {
	      "$limit" : 5000,
	      "$$app_token" : "1jumf4djvTZZqT8lU1oqHesP1"
	    }
	}).done(function(data) {	
	  var map_mark = new Array();
	  //console.log(data);
	  
	  var mark;
	  var id_act;
	  console.log("Retrieved " + data.length + " records from the dataset!");
	  var infowindow = new google.maps.InfoWindow();

	  for(var i=0;i<data.length;i++){

	  	
	  	if(data[i].latitude!=undefined && data[i].longitude!=undefined && data[i].status=="In Service"){		
			//console.log(data[i].latitude+"  "+data[i].longitude+ " "+data[i].status);

			marker = new google.maps.Marker({
				                position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
				                map: map,
				                //se copia el url de la imagen que se desea utilizar                           
				                icon: 'imagenes/icon5.png',
				                optimized:false,
				               
				             });			
			markers.push(marker);
			
			google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent("Bicycle Station Name: "+data[i].station_name);
                    infowindow.open(map, marker);
                }
            })(marker, i));

			}

		}
		bycicle_marker(map);
	})

}	
function bycicle_marker(map){
	for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
}


function bycicle_off(){
	markers=[];
}

