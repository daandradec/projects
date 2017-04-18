var distanceHouseToLibrary = 1000;
var dHTL = {};
var distanceHouseToPolice = 1000;
var dHTP = {};
var distanceHouseToFire = 1000;
var dHTF = {};
var distanceHouseToMarket = 1000;
var dHTM = {};
var distanceHouseToPark = 1000;
var dHTP2 = {};

function disHouseToLibrary(fields){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		functionHL(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function functionHL(xml){	
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("name_").length;
		var lat, lng, latDistance, lngDistance;

		for(var f in fields){
			var name = fields[f]['property_name'];
			var latHouse = fields[f]['latitude'];
			var lngHouse = fields[f]['longitude'];

			for (var j = 0; j < countRow; j++) {
				var x = auxXml.getElementsByTagName('location')[j];
	    		
	    		if(x != undefined){
	    			
	    			lat = x.getAttribute('latitude');
		    		latDistance = Math.pow(latHouse - parseFloat(lat), 2);
		    		
		    		lng = x.getAttribute('longitude');
		    		lngDistance = Math.pow(lngHouse - parseFloat(lng), 2);

		    		var d = Math.sqrt(latDistance + lngDistance)*100;
		    		if(dHTL[name] == undefined || dHTL[name] > d){
			    			dHTL[name] = d;
			    	}
		    		if(d < distanceHouseToLibrary){
			   			distanceHouseToLibrary = d;
		   			}
		   		}
	    	}
		}
	}
}

function disHouseToPolice(fields){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		functionHP(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function functionHP(xml){	
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("district_name").length;
		var lat, lng, latDistance, lngDistance;

		for(var f in fields){
			var name = fields[f]['property_name'];
			var latHouse = fields[f]['latitude'];
			var lngHouse = fields[f]['longitude'];

			for (var j = 0; j < countRow; j++) {
				var x = auxXml.getElementsByTagName('latitude')[j];
	    		var x2 = auxXml.getElementsByTagName('longitude')[j];
	    			
	    		var y = x.childNodes[0];
	    		var y2 = x2.childNodes[0];	
	    		
	    		lat = y.textContent;
	    		latDistance = Math.pow(latHouse - parseFloat(lat), 2);
	    		
	    		lng = y2.textContent;
	    		lngDistance = Math.pow(lngHouse - parseFloat(lng), 2);

	    		var d = Math.sqrt(latDistance + lngDistance)*100;
	    		if(dHTP[name] == undefined || dHTP[name] > d){
		    			dHTP[name] = d;
		    	}
	    		if(d < distanceHouseToPolice){
		   			distanceHouseToPolice = d;
	   			}
	    	}
		}
	}
}

function disHouseToFire(fields){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/28km-gtjn/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		functionHF(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function functionHF(xml){	
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("name").length;
		var lat, lng, latDistance, lngDistance;

		for(var f in fields){
			var name = fields[f]['property_name'];
			var latHouse = fields[f]['latitude'];
			var lngHouse = fields[f]['longitude'];

			for (var j = 0; j < countRow; j++) {
				var x = auxXml.getElementsByTagName('location')[j];

	    		var y1 = x.getAttribute('latitude');
	    		var y2 = x.getAttribute('longitude');
    					 
    			lat = y1;
    			latDistance = Math.pow(latHouse - parseFloat(lat), 2);

    			lng = y2;
    			lngDistance = Math.pow(lngHouse - parseFloat(lng), 2);

	    		var d = Math.sqrt(latDistance + lngDistance)*100;
	    		if(dHTF[name] == undefined || dHTF[name] > d){
		    			dHTF[name] = d;
		    	}
	    		if(d < distanceHouseToFire){
		   			distanceHouseToFire = d;
	   			}
	    	}
		}
	}
}

function disHouseToMarket(fields){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.xml", true);
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		functionHF(this);
    	}
	};
	xhttp.send();

	var countRow = 0;

	function functionHF(xml){	
		var auxXml = xml.responseXML;
		countRow = auxXml.getElementsByTagName("location").length;
		var lat, lng, latDistance, lngDistance;

		for(var f in fields){
			var name = fields[f]['property_name'];
			var latHouse = fields[f]['latitude'];
			var lngHouse = fields[f]['longitude'];

			for (var j = 0; j < countRow; j++) {
				var x = auxXml.getElementsByTagName('latitude')[j];
	    		var x2 = auxXml.getElementsByTagName('longitude')[j];
	    			
	    		if(x != undefined && x2 != undefined){	
		    		var y = x.childNodes[0];
		    		var y2 = x2.childNodes[0];	
		    		
		    		lat = y.textContent;
		    		latDistance = Math.pow(latHouse - parseFloat(lat), 2);
		    		
		    		lng = y2.textContent;
		    		lngDistance = Math.pow(lngHouse - parseFloat(lng), 2);

		    		var d = Math.sqrt(latDistance + lngDistance)*100;
		    		
		    		if(dHTM[name] == undefined || dHTM[name] > d){
		    			dHTM[name] = d;
		    		}

		    		if(d < distanceHouseToMarket){
			   			distanceHouseToMarket = d;

		   			}
		   		}
	    	}
		}
	}
}

function disHouseToPark(fields){
	var request = new XMLHttpRequest();
	request.open("GET", "https://data.cityofchicago.org/api/views/eix4-gf83/rows.json");
	request.responseType = 'json';
	request.send();

	request.onload = function() {
  		var r = request.response;
  		functionHP(r);
	}

	function functionHP(r){	
		var count = r["data"].length;
		var lat, lng, latDistance, lngDistance;
				
		for(var f in fields){
			var name = fields[f]['property_name'];
			var latHouse = fields[f]['latitude'];
			var lngHouse = fields[f]['longitude'];

			for (var j = 0; j < count; j++) {
				var x = r["data"][j][15];
				var x2 = r["data"][j][14];
	    			
	    		lat = x;
		    	latDistance = Math.pow(latHouse - parseFloat(lat), 2);
		    		
		    	lng = x2;
		    	lngDistance = Math.pow(lngHouse - parseFloat(lng), 2);

		    	var d = Math.sqrt(latDistance + lngDistance)*100;
		    	
		    	if(dHTP2[name] == undefined || dHTP2[name] > d){
		    		dHTP2[name] = d;
		    	}

		    	if(d < distanceHouseToPark){
			   		distanceHouseToPark = d;
		   		}
	    	}
		}
	}
}