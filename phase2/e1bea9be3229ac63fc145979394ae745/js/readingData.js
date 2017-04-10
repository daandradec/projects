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

function policeData(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		function1(this);
    	}
	};
	xhttp.send();

	countRow = 0;

	function function1(xml){
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
    						latDistance = Math.abs(centerUniversity['lat'] - parseFloat(y.textContent));
    						latAux = y;
    					}
    					if(k == 7){
    						lng = y.textContent;
    						lngDistance = Math.abs(centerUniversity['lng'] - parseFloat(y.textContent));
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

		drawBestOption(bestOptionSecurity);
		$('#zone').text('Supervised Zone');
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
	});
	markers.push(marker);
}

function deleteMarkers() {
	for (var i = 0; i < markers.length; i++ ) {
		console.log(markers);
  		markers[i].setMap(null);
	}
	markers.length = 0;
	m = [];
	fields = [];
}

function drawBestOption(besOptionCenter){
	var cityCircle = new google.maps.Circle({
    	strokeColor: '#FF0000',
      	strokeOpacity: 0.8,
      	strokeWeight: 2,
      	fillColor: 'green',
      	fillOpacity: 0.35,
      	map: map,
      	center: besOptionCenter,
      	radius: 1000
    });
}