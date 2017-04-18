var RestaurantMarker = [];
function showRestaurants(map)
			{
			$.ajax(
				{
		    url:"https://data.cityofchicago.org/resource/cwig-ma7x.json",
		    type: "GET",
		    data: {
		      "$limit" : 500,
		      "$$app_token" : "1jumf4djvTZZqT8lU1oqHesP1"}
				}).done(function(data) {
				  var map_mark = new Array();
				  var mark;
				  var id_act;
				  console.log("Retrieved " + data.length + " records from the dataset!");
				  for(var i=0;i<data.length;i++){
						var flag = true;
						if (data[i].latitude==undefined && data[i].longitude==undefined){
							flag = false;
							continue;
						}
				  	if(flag){
						marker = new google.maps.Marker({
							                position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
							                map: map,
							                id:data[i].id,
															icon : 'images/Icon3.png',
							                customInfo: data[i].description
							             });

						marker.setMap(map);
					  RestaurantMarker.push(marker);
						createInfoRestaurants(marker, data[i]);
						}

					}
				})
				var prev_infowindow ;

				function createInfoRestaurants(marker, data) {

					var infowindow = new google.maps.InfoWindow({
				                       content: ""
				                   });

					google.maps.event.addListener(marker, 'click', function() {
				      if( prev_infowindow != undefined) {
				           prev_infowindow.close();
				       }
					  prev_infowindow = infowindow;
						infowindow.setContent(data.dba_name);
				    infowindow.open(marker.get("map"), marker);
				});
				}
}
