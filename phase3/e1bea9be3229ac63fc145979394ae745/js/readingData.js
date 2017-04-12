var cityCircle

var library = {
	1: "name_",
	2: "address",
	3: "hours_of_operation",
	4: "cybernavigator",
	5: "teacher_in_the_library",
	6: "phone",
	7: "website",
	8: "location"	
};

var libraryAttr = {
	7: "url",
	8: "latitude", 
	9: "longitude"
};

var police = {
	1: "district_name",
	2: "address",
	3: "website",
	4: "phone",
	5: "fax",
	6: "latitude",
	7: "longitude"
};

var policeAttr = {
	3: "url",
	4: "phone_number",
	5: "phone_number",
};


var affordableRental = {
	1: "community_area",
	2: "property_type",
	3: "property_name",
	4: "address",
	5: "phone_number",
	6: "management_company",
	7: "units",
	8: "latitude",
	9: "longitude"	
};

var publicArt = [10, 14, 8, 13, 12];
var publicArtAttr = ["Name: ", "Artist: ", "Park: ", "Latitude: ", "Longitude: "];

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
		var latitudeValue = 1000;
    	var longitudeValue = 1000;
    			
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
    						latDistance = Math.abs(centerUniversity['lat'] - parseFloat(lat));
    						lngDistance = Math.abs(centerUniversity['lng'] - parseFloat(lng));
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
   					m.push([position, nameLibrary]);
    			}

    			if(latDistance < latitudeValue && lngDistance < longitudeValue){
	   				latitudeValue = latDistance;
	   				longitudeValue = lngDistance;
	   				bestOptionLibrary['lat'] = parseFloat(latAux);
					bestOptionLibrary['lng'] = parseFloat(lngAux);
   				}   						
   			}
   			fields.push(a);   				
		}

		//console.log(bestOptionLibrary);
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
		var latitudeValue = 1000;
    	var longitudeValue = 1000;
    			
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
    						latDistance = Math.abs(centerUniversity['lat'] - parseFloat(lat));
    						latAux = y;
    					}
    					if(k == 7){
    						lng = y.textContent;
    						lngDistance = Math.abs(centerUniversity['lng'] - parseFloat(lng));
    						lngAux = y;
    						position = {lat: parseFloat(lat), lng: parseFloat(lng)};
    						addMarker(position, nameStation + " Station", "images/marker police.png", j);
    					}
   					}
   					m.push([position, nameStation]);
    			}
    			if(latDistance < latitudeValue && lngDistance < longitudeValue){
	   				latitudeValue = latDistance;
	   				longitudeValue = lngDistance;
	   				bestOptionSecurity['lat'] = parseFloat(latAux.textContent);
					bestOptionSecurity['lng'] = parseFloat(lngAux.textContent);
   				}   						
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
    						latDistance = Math.pow(centerUniversity['lat'] - parseFloat(y.textContent), 2);
    						latAux = y;
    						break;
    					case 9:
    						lng = y.textContent;
    						lngDistance = Math.pow(centerUniversity['lng'] - parseFloat(y.textContent), 2);
    						lngAux = y;
    						position = {lat: parseFloat(lat), lng: parseFloat(lng)};
    						addMarker(position, nameProperty, "images/marker rental.png", j);
    						break;
    					default:
    						break;
    				}
   					m.push([position, nameProperty]);
   				}
    		}
    		if(Math.sqrt(latDistance + lngDistance) < distance){
	   			distance = Math.sqrt(latDistance + lngDistance);
	   			bestOptionAffordable['lat'] = parseFloat(latAux.textContent);
				bestOptionAffordable['lng'] = parseFloat(lngAux.textContent);
   			}   						
   			fields.push(a);
   		}

   		drawBestOption(bestOptionAffordable, 500);
		$('#zone').text('Best Affordable Rental');
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
		count = r["data"].length;

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
 		if (url == 'images/marker art.png'){
 			document.getElementById("formText").value = title;
 			$('#form').show()
 		}	
	});
	markers.push(marker);
}

function deleteMarkers() {
	for (var i = 0; i < markers.length; i++ ) {
		markers[i].setMap(null);
	}
	markers.length = 0;
	m = [];
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