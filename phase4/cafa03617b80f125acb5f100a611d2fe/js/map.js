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
	
	var infowindow = new google.maps.InfoWindow({
						content: ""
					});
	
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

			for (var i = 0; i < dataInfo.length; i++) {
				
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

			/*	marker.addListener('click', function(){
					infowindow.setContent(dataInfo[i][8]);
					infowindow.open(map, marker); 
				});					*/
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

function findPoliceS(){

	var dataInfo = [];
	
	//create a new httprequest for this session
	var xmlhttp = new XMLHttpRequest();
	//json format data resource url 
	var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
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
				
				info.push(json.data[i][20]); // lat
				info.push(json.data[i][21]); // long
				info.push(json.data[i][9]); // name

				dataInfo.push(info);
			};

			for ( var i = 0; i < dataInfo.length; i++ ) {
				
				var pos = new google.maps.LatLng(dataInfo[i][0], dataInfo[i][1]);
				
				var icon = {
					url: 'img/police.ico',
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

function findLibrary(){

	var dataInfo = [];
	
	//create a new httprequest for this session
	var xmlhttp = new XMLHttpRequest();
	//json format data resource url 
	var url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
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
				
				info.push(json.data[i][18][1]); // lat
				info.push(json.data[i][18][2]); // long
				info.push(json.data[i][8]); // name

				dataInfo.push(info);
			};

			for ( var i = 0; i < dataInfo.length; i++ ) {
				
				var pos = new google.maps.LatLng(dataInfo[i][0], dataInfo[i][1]);
				
				var icon = {
					url: 'img/library.ico',
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

/*
function find(newurl, lat, log, name, iconUrl){

	var dataInfo = [];
	
	//create a new httprequest for this session
	var xmlhttp = new XMLHttpRequest();
	//json format data resource url 
//	var url = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";
	var url = newurl;
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
				
				info.push(json.data[i][lat]); // lat
				info.push(json.data[i][log]); // log
				info.push(json.data[i][name]); // name

				dataInfo.push(info);
			};

			for ( var i = 0; i < dataInfo.length; i++ ) {
				
				var pos = new google.maps.LatLng(dataInfo[i][0], dataInfo[i][1]);
				
				var icon = {
					url: iconUrl,
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

function findparks(){
	var urlpark = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";
	find(urlpark, 13, 12, 8, 'img/park.ico');
}

*/
