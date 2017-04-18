/* Estadísticas de Salud Pública- Selección de indicadores de salud pública por el área comunitaria de Chicago */

var xhttp3;
xhttp3 = new XMLHttpRequest();
xhttp3.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		myFunction3(this);
	}
};
xhttp3.open("GET", "https://data.cityofchicago.org/api/views/kcki-hnch/rows.xml?accessType=DOWNLOAD", true);
xhttp3.send();
function myFunction3(xml) {
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
	icon: "Images/Iconos/health.jpg",
	map: map
	});
	}

}

var xhttp4;
xhttp4 = new XMLHttpRequest();
xhttp4.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		myFunction4(this);
	}
};

xhttp4.open("GET", "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.xml?accessType=DOWNLOAD", true);
xhttp4.send();
function myFunction4(xml) {
	var x, i, txt, xmlDoc; 
	xmlDoc = xml.responseXML;
	txt = "";
	x = xmlDoc.getElementsByTagName("location");
	for (i = 0; i < x.length, i < y.length; i++) { 
	txt += x[i].getAttribute('latitude')+ " " + x[i].getAttribute('longitude') + "<br>";
	var latLng = new google.maps.LatLng(x[i].getAttribute('latitude'),x[i].getAttribute('longitude'));
	var marker = new google.maps.Marker({
	position: latLng,
	icon: "Images/Iconos/library.png",
	map: map
	});
	}
}