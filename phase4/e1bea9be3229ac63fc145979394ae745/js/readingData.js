var cityCircle;
var dicPark = {};
var disAffordable;


function libraryData(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		function1(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function function1(xml){
		bestOptionLibrary = {}		
		var distance = 1000;
    			
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("name_").length;

		var lat, lng, latDistance, lngDistance, latAux, lngAux, position, nameLibrary;
				
		for (var j = 0; j < countRow; j++) {
			var a = {}
			for (var k = 1; k <= 8; k++) {
    			var x = auxXml.getElementsByTagName(library[k])[j];
    			var y = "";			
    			if(x != undefined){
    				var z = x.tagName;
    				if (k == 7 || k == 8) {
    					if(k == 8){
    						lat = x.getAttribute(libraryAttr[k]);
    						lng = x.getAttribute(libraryAttr[9]);
    						latDistance = Math.pow(centerUniversity['lat'] - parseFloat(lat), 2);
    						lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(lng), 2);
    						latAux = lat;
    						lngAux = lng;
    						position = {lat: parseFloat(lat), lng: parseFloat(lng)};
    						addMarker(position, nameLibrary + " Library", "images/marker library.png", j);

    						a[z + "(lat, lng)"] = lat + ", " + lng; 
    					}else{
    						y = x.getAttribute(libraryAttr[k]);
    						a[z] = y;
    					}
    				}else{
    					y = x.childNodes[0];
    					a[z] = y.textContent;
    					if(k == 1){
    						nameLibrary = y.textContent;
    					}
    					
   					}
   					
    			}
   			}
   			if(Math.sqrt(latDistance + lngDistance) < distance){
	   			distance = Math.sqrt(latDistance + lngDistance);
	   			bestOptionLibrary['lat'] = parseFloat(latAux);
				bestOptionLibrary['lng'] = parseFloat(lngAux);
   			}
   			fields.push(a);   				
		}

		drawBestOption(bestOptionLibrary, 700);
		$('#zone').text('Best zone with library');
	}

}

function policeData(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		function2(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function function2(xml){
		bestOptionSecurity = {}		
		var distance = 1000;
    			
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("district_name").length;

		var lat, lng, latDistance, lngDistance, latAux, lngAux, position, nameStation;
				
		for (var j = 0; j < countRow; j++) {
			var a = {}
			for (var k = 1; k <= 7; k++) {
    			var x = auxXml.getElementsByTagName(police[k])[j];
    			var y = "";			
    			if(x != undefined){
    				var z = x.tagName;
    				if (k == 3 || k == 4 || k == 5) {
    					y = x.getAttribute(policeAttr[k]); 
    					a[z] = y;
    				}else{
    					y = x.childNodes[0];
    					a[z] = y.textContent;
    					if(k == 1){
    						nameStation = y.textContent;
    					}
    					if(k == 6){
    						lat = y.textContent;
    						latDistance = Math.pow(centerUniversity['lat'] - parseFloat(lat), 2);
    						latAux = y;
    					}
    					if(k == 7){
    						lng = y.textContent;
    						lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(lng), 2);
    						lngAux = y;
    						position = {lat: parseFloat(lat), lng: parseFloat(lng)};
    						addMarker(position, nameStation + " Station", "images/marker police.png", j);
    					}
   					}
   					
    			}
   			}
   			if(Math.sqrt(latDistance + lngDistance) < distance){
	   			distance = Math.sqrt(latDistance + lngDistance);
	   			bestOptionSecurity['lat'] = parseFloat(latAux.textContent);
				bestOptionSecurity['lng'] = parseFloat(lngAux.textContent);
   			}

   			fields.push(a);   				
		}

		drawBestOption(bestOptionSecurity, 1000);
		$('#zone').text('Best Supervised Zone');
	}
}

function affordableRentalData(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		function3(this);
    	}
	};
	xhttp.send();

	function function3(xml){
		bestOptionAffordable = {}		
		var distance = 1000;
    			
		var auxXml = xml.responseXML;
		
		var lat, lng, latDistance, lngDistance, latAux, lngAux, position, nameProperty;
				
		for (var j = 0; j < 200; j++) {
			var a = {};
			for (var k = 1; k <= 9; k++) {
    			var x = auxXml.getElementsByTagName(affordableRental[k])[j];
    			var y = "";			
    			if(x != undefined){
    				var z = x.tagName;
    				y = x.childNodes[0];
    				a[z] = y.textContent;
    				switch(k){
    					case 3:
    						nameProperty = y.textContent;
    						break;
    					case 8:
    						lat = y.textContent;
    						latDistance = Math.pow(centerUniversity['lat'] - parseFloat(lat), 2);
    						latAux = y;
    						break;
    					case 9:
    						lng = y.textContent;
    						lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(lng), 2);
    						lngAux = y;
    						position = {lat: parseFloat(lat), lng: parseFloat(lng)};
    						addMarker(position, nameProperty, "images/marker rental.png", j);
    						break;
    					default:
    						break;
    				}
   					
   				}
    		}
    		if(Math.sqrt(latDistance + lngDistance) < distance){
	   			distance = Math.sqrt(latDistance + lngDistance);
	   			bestOptionAffordable['lat'] = parseFloat(latAux.textContent);
				bestOptionAffordable['lng'] = parseFloat(lngAux.textContent);
   			}   						
   			fields.push(a);
   		}
   		
   		disAffordable = distance;
   		drawBestOption(bestOptionAffordable, 500);
		$('#zone').text('Best Affordable Rental');
		disHouseToLibrary(fields);
		disHouseToPolice(fields);
		disHouseToFire(fields);
		disHouseToMarket(fields);
		disHouseToPark(fields);
	}
}

function publicArtData(){
	var request = new XMLHttpRequest();
	request.open("GET", "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json");
	request.responseType = 'json';
	request.send();

	request.onload = function() {
  		var r = request.response;
  		function4(r);
	}

	function function4(r){
		var count = r["data"].length;

		var lat, lng, position, namePublicArt;

		for (var i = 0; i < count; i++) {
			var a = {};
			for(var ele in publicArt){
				x = r["data"][i][publicArt[ele]];
				a[publicArtAttr[ele]] = x;
				switch(ele){
    				case '0':
    					namePublicArt = x;
    					break;
    				case '1':
    					namePublicArt += " - " + x;
    					break;
    				case '3':
    					lat = x;
    					break;
    				case '4':
    					lng = x;
    					position = {lat: parseFloat(lat), lng: parseFloat(lng)};
    					addMarker(position, namePublicArt, "images/marker art.png", i);
    					break;
    				default:
    					break;
    			}
			}
			fields.push(a);
		}		
	}
}

function fireData(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/28km-gtjn/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		function5(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function function5(xml){

		bestOptionFire = {}		
		var distance = 1000;
    			
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("name").length;

		var lat, lng, latDistance, lngDistance, latAux, lngAux, position, nameStation;
				
		for (var j = 0; j < countRow; j++) {
			var a = {}
			for (var k = 1; k <= 5; k++) {
    			var x = auxXml.getElementsByTagName(fire[k])[j];
    			var y = "";			
    			if(x != undefined){
    				var z = x.tagName;
    				if (k == 5) {
    					y1 = x.getAttribute(fireAttr[k]);
    					 
    					lat = y1;
    					latDistance = Math.pow(centerUniversity['lat'] - parseFloat(lat), 2);
    					latAux = y1;

    					y2 = x.getAttribute(fireAttr[k + 1]); 
    					a[z] = y1 + ", " + y2;
    					lng = y2;
    					lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(lng), 2);
    					lngAux = y2;
    					position = {lat: parseFloat(lat), lng: parseFloat(lng)};

						addMarker(position, nameStation + " Station", "images/marker fire.png", j);
    				}else{
    					y = x.childNodes[0];
    					a[z] = y.textContent;
    					if(k == 1){
    						nameStation = y.textContent;
    					}
   					}
   					
    			}
   			}
   			if(Math.sqrt(latDistance + lngDistance) < distance){
				distance = Math.sqrt(latDistance + lngDistance);
	   			bestOptionFire['lat'] = parseFloat(latAux);
				bestOptionFire['lng'] = parseFloat(lngAux);
   			}
   			fields.push(a);   				
		}

		drawBestOption(bestOptionFire, 500);
		$('#zone').text('Best Fire Zone');
	}
}

function marketData(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		function6(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function function6(xml){
		bestOptionMarket = {}
		var distance = 1000;
    			
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("location").length;

		var lat, lng, latDistance, lngDistance, latAux, lngAux, position, nameMarket;
				
		for (var j = 0; j < countRow; j++) {
			var a = {}
			for (var k = 1; k <= 8; k++) {
    			var x = auxXml.getElementsByTagName(market[k])[j];
    			var y = "";			
    			if(x != undefined){
    				var z = x.tagName;
    				if (k == 5) {
    					y = x.getAttribute(policeAttr[k]); 
    					a[z] = y;
    				}else{
    					y = x.childNodes[0];
    					a[z] = y.textContent;
    					if(k == 1){
    						nameMarket = y.textContent;
    					}
    					if(k == 7){
    						lat = y.textContent;
    						latDistance = Math.pow(centerUniversity['lat'] - parseFloat(lat), 2);
    						latAux = y;
    					}
    					if(k == 8){
    						lng = y.textContent;
    						lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(lng), 2);
    						lngAux = y;
    						position = {lat: parseFloat(lat), lng: parseFloat(lng)};
    						addMarker(position, nameMarket, "images/marker market.png", j);
    					}
   					}
   					
    			}
   			}
   			if(Math.sqrt(latDistance + lngDistance) < distance){
				distance = Math.sqrt(latDistance + lngDistance);
	   			bestOptionMarket['lat'] = parseFloat(latAux.textContent);
				bestOptionMarket['lng'] = parseFloat(lngAux.textContent);
   			}

   			fields.push(a);   				
		}

		drawBestOption(bestOptionMarket, 500);
		$('#zone').text('Best area with farmers market');
	}
}

function schoolData(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/8i6r-et8s/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		function7(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function function7(xml){	
		
		bestOptionSchool = {}	

		var distance = 1000;
    			
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("short_name").length;

		var lat, lng, latDistance, lngDistance, latAux, lngAux, position, nameSchool;
				
		for (var j = 0; j < countRow; j++) {
			var a = {}
			for (var k = 1; k <= 21; k++) {
    			var x = auxXml.getElementsByTagName(school[k])[j];
    			var y = "";			
    			if(x != undefined){
    				var z = x.tagName;
    				if (k == 8) {
    					y = x.getAttribute(policeAttr[k]); 
    					a[z] = y;
    				}
    				else if(k == 21){
    					var y1 = x.getAttribute(schoolAttr[k]);
    					 
    					lat = y1;
    					latDistance = Math.pow(centerUniversity['lat'] - parseFloat(lat), 2);
    					latAux = y1;

    					var y2 = x.getAttribute(schoolAttr[k + 1]); 
    					a[z] = y1 + ", " + y2;
    					lng = y2;
    					lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(lng), 2);
    					lngAux = y2;
    					position = {lat: parseFloat(lat), lng: parseFloat(lng)};

						addMarker(position, nameSchool, "images/marker school.png", j);
    				}else{
    					y = x.childNodes[0];
    					a[z] = y.textContent;
    					if(k == 2){
    						nameSchool = y.textContent;
    					}
   					}
   					
    			}
   			}
   			if(Math.sqrt(latDistance + lngDistance) < distance){
				distance = Math.sqrt(latDistance + lngDistance);
	   			bestOptionSchool['lat'] = parseFloat(latAux);
				bestOptionSchool['lng'] = parseFloat(lngAux);
   			}

   			fields.push(a);
		}

		drawBestOption(bestOptionSchool, 500);
		$('#zone').text('Best area with access to school');
	}
}

function parksData(){
	var request = new XMLHttpRequest();
	request.open("GET", "https://data.cityofchicago.org/api/views/eix4-gf83/rows.json");
	request.responseType = 'json';
	request.send();

	request.onload = function() {
  		var r = request.response;
  		function8(r);
	}
	
	function function8(r){
		var bestOptionPark = {}
		var count = r["data"].length;
		var lat, lng, latDistance, lngDistance, latAux, lngAux, position;
		var namePark = '';
		var distance = 1000;

		for (var i = 0; i < count; i++) {
			var a = {};

			var np = r["data"][i][park[0]]; 
			if(!(np in dicPark)){
				dicPark[np] = 1;
				for(var ele in park){
					var x = r["data"][i][park[ele]];
					a[parkAttr[ele]] = x;

					switch(ele){
	    				case '0':
	    					namePark = x;
	    					break;
	    				case '1':
	    					lat = x;
	    					latDistance = Math.pow(centerUniversity['lat'] - parseFloat(lat), 2);
    						latAux = x
	    					break;
	    				case '2':
	    					lng = x;
	    					lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(lng), 2);
    						lngAux = x;
	    					position = {lat: parseFloat(lat), lng: parseFloat(lng)};
	    					addMarker(position, namePark, "images/marker park.png", i);
	    					break;
	    				default:
	    					break;
	    			}
				}
				if(Math.sqrt(latDistance + lngDistance) < distance){
					distance = Math.sqrt(latDistance + lngDistance);
	   				bestOptionPark['lat'] = parseFloat(latAux);
					bestOptionPark['lng'] = parseFloat(lngAux);
   				}
			}
			
			fields.push(a);
		}
		drawBestOption(bestOptionPark, 300);
		$('#zone').text('Best area with access to a park');
	}
}


function addMarker(position, title, url, i){	
	var icon = {
		url: url,
   		scaledSize: new google.maps.Size(20, 20),
   		origin: new google.maps.Point(0,0),
	};

	var marker = new google.maps.Marker({
   		position: position,
   		icon: icon,
   		title: title,
   		map: map
	});

	marker.addListener('click', function() {
		document.getElementById("pInformation").innerHTML = "";
		var text0 = "";
		var text1 = "";
		for( var f in fields[i]){
			text0 = f + ": " 
			text1 = "" + fields[i][f];
			document.getElementById("pInformation").innerHTML += $('pInformation').text() + "<b><u>" + text0 + "</b></u>" 
			+ text1 + "<br>";
		}
 		map.setCenter(marker.getPosition());
 		if (url == 'images/marker rental.png'){
 			var dis;
 			var dlat = Math.pow(centerUniversity['lat'] - position['lat'], 2);
 			var dlng = Math.pow(centerUniversity['lng'] - position['lng'], 2);
 			dis = Math.sqrt(dlat + dlng);
 			data[0] = Math.floor(((dis - disAffordable)*(0 - 100)/(0.3 - disAffordable) ) + 100);
 			
 			dis = dHTL[title];
 			data[1] = Math.floor(((dis - distanceHouseToLibrary)*(0 - 100)/(2.5 - distanceHouseToLibrary) ) + 100);

 			dis = dHTP[title];
 			data[2] = Math.floor(((dis - distanceHouseToPolice)*(0 - 100)/(10 - distanceHouseToPolice) ) + 100);

 			dis = dHTF[title];
 			data[3] = Math.floor(((dis - distanceHouseToFire)*(0 - 100)/(25 - distanceHouseToFire) ) + 100);

 			dis = dHTM[title];
 			data[4] = Math.floor(((dis - distanceHouseToMarket)*(0 - 100)/(3 - distanceHouseToMarket) ) + 100);

			dis = dHTP2[title];
 			data[5] = Math.floor(((dis - distanceHouseToPark)*(0 - 100)/(2 - distanceHouseToPark) ) + 100);
 			

 			barChart();
 			countBarChart++;
 		}
 		if (url == 'images/marker art.png'){
 			document.getElementById("formText").value = title;
 			$('#form').show()
 		}
 		if(url == 'images/marker park.png'){
 			$.ajax({
   				url: "https://data.cityofchicago.org/api/views/eix4-gf83/rows.json",
   				type: "GET"
			}).done(function(data) {
				l = data['data'].length;
				document.getElementById("pInformation").innerHTML += "<b><u>Activities: </u></b> <br>";
				for(var i = 0; i < l; i++){
					if(data['data'][i][10] == title){
						document.getElementById("pInformation").innerHTML += data['data'][i][12] + "<br>";
					}	
				}
  				
  				
			});
 		}
	});

	markers.push(marker);
}

function deleteMarkers() {
	for (var i = 0; i < markers.length; i++ ) {
		markers[i].setMap(null);
	}
	markers.length = 0;
	fields = [];
}

function drawBestOption(besOptionCenter, radius){
	cityCircle = new google.maps.Circle({
    	strokeColor: '#FF0000',
      	strokeOpacity: 0.8,
      	strokeWeight: 2,
      	fillColor: 'green',
      	fillOpacity: 0.35,
      	map: map,
      	center: besOptionCenter,
      	radius: radius
    });
}