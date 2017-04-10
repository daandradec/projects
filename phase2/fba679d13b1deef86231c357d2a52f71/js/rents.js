

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
	  console.log(data);
	  var mark;
	  var id_act;
	  console.log("Retrieved " + data.length + " records from the dataset!");
	  console.log(data[1].latitude+"  "+data[1].longitude+ " "+data[1].status);
	  console.log(data[2].latitude+"  "+data[2].longitude+ " "+data[2].status);
	  console.log(data[3].latitude+"  "+data[3].longitude+ " "+data[3].status);
	  console.log(data[4].latitude+"  "+data[4].longitude+ " "+data[4].status);

	  for(var i=0;i<data.length;i++){

	  	
	  	if(data[i].latitude!=undefined && data[i].longitude!=undefined ){		
			console.log(data[i].latitude+"  "+data[i].longitude+ " "+data[i].status);

			marker = new google.maps.Marker({
				                position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
				                map: map,
				                //se copia el url de la imagen que se desea utilizar                           
				                icon: 'imagenes/icon2.png',
				                optimized:false,
				             });
			
				marker.setMap(map);
			}
		}
	})


}	