var map;

function initMap(){
		
		var mapDiv = document.getElementById('map');
	
		map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
			
		var marker = new google.maps.Marker({ 
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
			title: 'Department of Computer Science – University of Illinois' 
		})
	}

function findPark(){

	var dataInfo = [];
	
	//create a new httprequest for this session
	var xmlhttp = new XMLHttpRequest();
	//json format data resource url 
	var url = "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
	//once the request is accepted, process the fowllowing function to get data and complete the app information
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var text = myArr;
			var json = JSON.parse(text);

			for (var i = 0; i <json.data.length; i++ ) {
				
				var info = [];
				
				info.push(json.data[i][13]); // lat
				info.push(json.data[i][12]); // long
				info.push(json.data[i][8]); // name

				dataInfo.push(info);
			};

			for ( var i = 0; i < dataInfo.length; i++ ) {
				
				var pos = new google.maps.LatLng(dataInfo[i][0], dataInfo[i][1]);
				
				var icon = {
					url: 'img/park.ico',
					scaledSize: new google.maps.Size(35, 35)
				};
				
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					title: dataInfo[i][2],
					icon: icon

				});		
			}
		}
	};
}
	
function findSchool(){

	var dataInfo = [];
	
	//create a new httprequest for this session
	var xmlhttp = new XMLHttpRequest();
	//json format data resource url 
	var url = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
	//once the request is accepted, process the fowllowing function to get data and complete the app information
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var text = myArr;
			var json = JSON.parse(text);

			for (var i = 0; i <json.data.length; i++ ) {
				
				var info = [];
				
				info.push(json.data[i][17]); // lat
				info.push(json.data[i][18]); // long
				info.push(json.data[i][9]); // name

				dataInfo.push(info);
			};

			for ( var i = 0; i < dataInfo.length; i++ ) {
				
				var pos = new google.maps.LatLng(dataInfo[i][0], dataInfo[i][1]);
				
				var icon = {
					url: 'img/SchoolBus.ico',
					scaledSize: new google.maps.Size(30, 30)
				};
				
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					title: dataInfo[i][2],
					icon: icon
				});		
			}
		}
	};
}
