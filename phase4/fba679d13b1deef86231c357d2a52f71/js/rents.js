
var markers=[];

function rent_place(map){

		$.ajax({
	    url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
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
	  //console.log("Retrieved " + data.length + " records from the dataset!");
	  var infowindow = new google.maps.InfoWindow();

	  for(var i=0;i<data.length;i++){

	  	
	  	if(data[i].latitude!=undefined && data[i].longitude!=undefined ){		
			//console.log(data[i].latitude+"  "+data[i].longitude+ " "+data[i].status);

			marker = new google.maps.Marker({
				                position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
				                map: map,
				                //se copia el url de la imagen que se desea utilizar                           
				                icon: 'imagenes/icon2.png',
				                optimized:false,
				             });
			
				markers.push(marker);
				if(data[i].latitude == 41.8587687803||data[i].latitude == 41.866806049  ||data[i].latitude == 41.8822718277){
                    	console.log("LATITUDE "+data[i].latitude+" LONGITUDE "+data[i].longitude+ " address"+data[i].address+" phone number"+data[i].phone_number+" community area "+data[i].community_area);
                    }

				google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent("Phone Number: "+data[i].phone_number+" Property type: "+data[i].property_type);
                    
                    infowindow.open(map, marker);
                }
            })(marker, i));

			}
		}
		rent_marker(map);
	})
}	
function rent_marker(map){
	for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
}


function rent_off(){
	markers=[];
}
