function initMap(){
		var latitude1 = 41.8708;
		var longitude1 = -87.6505;
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: latitude1, lng: longitude1},
			zoom: 12,
			styles: [
				{
					"featureType":"poi",
					"stylers":[
						{"visibility":"off"}
					]
				}
			]
		});
		var xmlhttp = new XMLHttpRequest();
		var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD"
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var myArray = xmlhttp.responseText;
				var text = myArray;
				var json = JSON.parse(text)
				var alldata = []
				var distance;
				for (var i = 0; i < 263; i++) {
					var latitude2 = Number(json.data[i][19])
					var longitude2 = Number(json.data[i][20])
					distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
					var data = [];
					if (distance<5000) {
						data.push(json.data[i][11]);//Name
	          data.push(latitude2);
	          data.push(longitude2);
						data.push(json.data[i][10]);//Type
						data.push(json.data[i][12]);//Adress
						data.push(json.data[i][14]);//Number
						data.push(distance);
						alldata.push(data);
					}
				}
				var markers = []
				for (var i = 0; i < alldata.length; i++) {
					markers[i] = new google.maps.Marker({
						position: {lat: Number(alldata[i][1]), lng: Number(alldata[i][2])},
						map: map,
						title: alldata[i][0]
					})
				$.each(markers, function(key,value){
					google.maps.event.addListener(markers[key], 'click', function(){
						document.getElementById("info").innerHTML = "<b>Name:</b> <p>"+alldata[key][0] +"</p>" +
																												"<b>Property Type:</b> <p>"+alldata[key][3]+"</p>"+
																												"<b>Adress:</b> <p>"+alldata[key][4]+"</p>"+
																												"<b>Phone Number:</b> <p>"+alldata[key][5]+"</p>";
					  barGraph.draw(alldata[key]);
					})
				})
				}
			}
		};
	}
