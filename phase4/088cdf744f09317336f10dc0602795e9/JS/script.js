/*
script
*/

var map,marker,point;

function myMap() {



	var mapOptions = {
		center: new google.maps.LatLng(41.8708, -87.6505),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP

	}
	map = new google.maps.Map(document.getElementById("map"), mapOptions);	
	marker = new google.maps.Marker({position:mapOptions.center});
	marker.setMap(map);
	
	
}
function rent(){
	

	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.xml?&appid=LyZAusKpBwuVTvrprJvY7SnjV";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var xmlDoc,lat,long;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(myArr,"text/xml");
			var txt = "<tr><th>Address</th><th>Phone number</th></tr>";
			//txt += "<table border='2'>"
			for(var i = 30; i <=50; i++){
				lat = xmlDoc.getElementsByTagName("latitude")[i].childNodes[0].nodeValue;
				long = xmlDoc.getElementsByTagName("longitude")[i].childNodes[0].nodeValue; 
				point = new google.maps.LatLng(lat,long);
				marker = new google.maps.Marker({position:point});
				marker.setMap(map);

				txt += "<tr><td>" +
				xmlDoc.getElementsByTagName("address")[i].childNodes[0].nodeValue +
				"</td><td>" +
				xmlDoc.getElementsByTagName("phone_number")[i].childNodes[0].nodeValue +
				"</td><tr>";	 
				

				
				//txt += "<tr><td>" + xmlDoc.getElementsByTagName("phone_number")[i].childNodes[0].nodeValue + "</td></tr>";
			}
			//txt += "</table>" ;
			document.getElementById("rent").innerHTML = txt;
			//document.getElementById("rent").innerHTML = xmlDoc.getElementsByTagName("phone_number")[0].childNodes[0].nodeValue;
		}
	};

}


function rentLocation(){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz19a0mrzk4y3_3h0lo&zpid=100";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var xmlDoc;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(myArr,"text/xml");
			var txt = "";
			document.getElementById("rent").innerHTML = myArr;
			//txt += "<table border='1'>"
			/*for(var i = 0; i <= 20; i++){
				txt += "<tr><td>" + xmlDoc.getElementsByTagName("latitude")[i].childNodes[0].nodeValue + "</td></tr>";
			}*/
			//txt += "</table>" ;
    		document.getElementById("rent").innerHTML = txt;
			//document.getElementById("rent").innerHTML = xmlDoc.getElementsByTagName("phone_number")[0].childNodes[0].nodeValue;
		}
	};

}

function closest(){
	

	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.xml?$where=within_circle(location, 41.8708, -87.6505, 3000)&appid=LyZAusKpBwuVTvrprJvY7SnjV";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var xmlDoc;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(myArr,"text/xml");
			var txt = "<tr><th>community_area</th><th>phone_number</th></tr>";
			txt += "<table border='1'>"
			for(var i = 0; i <= 20; i++){
				
				txt += "<tr><td>" + xmlDoc.getElementsByTagName("community_area")[i].childNodes[0].nodeValue + "</td></td>" +
				xmlDoc.getElementsByTagName("phone_number")[i].childNodes[0].nodeValue + "</td></tr>";

			}
			//txt += "</table>" ;
    		document.getElementById("rent").innerHTML = txt;
			//document.getElementById("rent").innerHTML = xmlDoc.getElementsByTagName("phone_number")[0].childNodes[0].nodeValue;
		}
	};
}

function crimeLocation(){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location, 41.8708, -87.6505, 3000)",
		type: "GET",
		dataType:"json",
		data: {

			"$limit" :50 ,
			"$$app_token" : "LyZAusKpBwuVTvrprJvY7SnjV"
		}
	}).done(function(data) {

		alert("Retrieved " + data.length + " records from the dataset!");

		var la,lo;
		for(x in data){
			la = data[x].latitude;
			lo = data[x].longitude;
			//$(".coo").append ('<p>' + la +","+ lo + '</p>');
			$('body').append('<p>' + la +","+ lo + '</p>');
			marker = new google.maps.Marker({position:new google.maps.LatLng(la,lo)});
			marker.setMap(map);
			
			/*var marker = new google.maps.Marker({position:data[x].coordinates});
			marker.setMap(map);*/
		}


		/*
		var x = JSON.parse(data.description);
		$('body').append('<p>' + x.description + '</p>');
		document.getElementById("crimes").innerHTML = data;*/
	});
}/*var location = new google.maps.coordinate(data)*/



/*https://data.cityofchicago.org/api/views/ijzp-q8t2

data from id of incident
https://data.cityofchicago.org/resource/3uz7-d32j.json?case_=JA146947

data from 2001 to present
https://data.cityofchicago.org/resource/6zsd-86xi.json
way to use coordinate ratio with Soql queries
https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle(location, 41.8708, -87.6505, 1000)

zillow

X1-ZWz19a0mrzk4y3_3h0lo
http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz19a0mrzk4y3_3h0lo&zpid=48749425

rental house data.gov
?$where=within_circle(location, 41.8708, -87.6505, 3000)
https://data.cityofchicago.org/api/views/s6ha-ppgi.json?$where=within_circle(location, 41.8708, -87.6505, 1000)


var xmlhttp = new XMLHttpRequest();
var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi.xml?$where=within_circle(location, 41.8708, -87.6505, 1000)&appid=LyZAusKpBwuVTvrprJvY7SnjV";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var myArr = xmlhttp.responseText;
var text = myArr;
}
};

*/


