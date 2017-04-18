var map;
function myMap() {
	var myCenter = new google.maps.LatLng(41.8708,-87.6505);
	var mapCanvas = document.getElementById("map");
	var mapOptions = {center: myCenter, zoom: 14};
	map = new google.maps.Map(mapCanvas, mapOptions);
	var marker = new google.maps.Marker({position:myCenter});
	marker.setMap(map);
}

/* Farnes narket */

var xhttp;
xhttp = new XMLHttpRequest();
var entry= "Hoo";

xhttp.onreadystatechange = function(entry) {
	if (this.readyState == 4 && this.status == 200) {
		myFunction(this);
	}
};

xhttp.open("GET", "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.xml?accessType=DOWNLOAD", true);
xhttp.send();
function myFunction(xml) {
	var x, i, txt, xmlDoc; 
	xmlDoc = xml.responseXML;
	txt = "";
	x = xmlDoc.getElementsByTagName("latitude");
	y = xmlDoc.getElementsByTagName("longitude");
	for (i = 0; i < x.length, i < y.length; i++) { 
	txt += x[i].childNodes[0].nodeValue + " " + y[i].childNodes[0].nodeValue + "<br>";
	var latLng = new google.maps.LatLng(x[i].childNodes[0].nodeValue,y[i].childNodes[0].nodeValue);
	var marker = new google.maps.Marker({
	position: latLng,
	icon: "Images/Iconos/farmstand.png",
	map: map
	});
	}

}

/*Police stations */

var xhttp2;
xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		myFunction2(this);
	}
};
xhttp2.open("GET", "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.xml?accessType=DOWNLOAD", true);
xhttp2.send();
function myFunction2(xml) {
	var x, i, txt, xmlDoc; 
	xmlDoc = xml.responseXML;
	txt = "";
	x = xmlDoc.getElementsByTagName("latitude");
	y = xmlDoc.getElementsByTagName("longitude");
	for (i = 0; i < x.length, i < y.length; i++) { 
	txt += x[i].childNodes[0].nodeValue + " " + y[i].childNodes[0].nodeValue + "<br>";
	var latLng = new google.maps.LatLng(x[i].childNodes[0].nodeValue,y[i].childNodes[0].nodeValue);
	var marker = new google.maps.Marker({
	position: latLng,
	icon: "Images/Iconos/police2.png",
	map: map
	});
	}




}