var roomMarker = [];
function getDistance(x , y){
	var distance;
	distanceX = (41.870439-x)^2;
	distanceY = (-87.66692-y)^2;
	return Math.sqrt(distanceY+distanceX);
}

function choose_room(map)
			{
			$.ajax(
				{
		    url:"https://data.cityofchicago.org/resource/uahe-iimk.json",
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
							                optimized:false,
							                customInfo: data[i].description
							             });

						marker.setMap(map);
						roomMarker.push(marker);
					  createInfoRooms(marker, data[i]);
						}

					}

				})
				var prev_infowindow ;

				function createInfoRooms(marker, data) {
					marker.addListener('click', function() {
						map.setZoom(17);
						map.setCenter(marker.getPosition());
					});

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
