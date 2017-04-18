var map;

function initMap() {
	
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.667577},
    zoom: 13
  });	  
  var marker = new google.maps.Marker({ 
		position: {lat: 41.8708, lng: -87.667577}, 
		map: map,
		title: 'University of Illinois', 
		icon: 'un.png'
	})	
	rentHouses();
	libraries();
	policeStations();
	fireStations();
}
var rh=new Array();
function rentHouses(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'rh.png',					
					title: row[i].getElementsByTagName("property_name")[0].childNodes[0].nodeValue ,
				});				
				rh[i]=marker;
				rh[i].setMap(map);
			}
			
		}
	
	}
}
var libs=new Array();
function libraries(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/wa2i-tm5d/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'books.png',					
				});
				libs[i]=marker;
			}
		}
	}
}
var ps=new Array();
function policeStations(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'police.png',					
				});
				ps[i]=marker;
				
			}
		}
	}
}
var fs=new Array();
function fireStations(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'fire.png',					
					
				});
				fs[i]=marker;
			}
		}
	}
}
	
	$(document).ready(function(){		
		$("#libraries").change(function(){
			if(this.checked){
				checkLibraries();
				
			}else{
				uncheckLibraries();
			}
			
		
		});
		$("#fs").change(function(){
			if(this.checked){
				checkFS();
				
			}else{
				uncheckFS();
			}		
		})
		$("#ps").change(function(){
			if(this.checked){
				checkPS();
				
			}else{
				uncheckPS();
			}		
		})
	});
	
function checkLibraries(){
	for(var i=0;i<rh.length;i++){
		libs[i].setMap(map);
	}	
}
function uncheckLibraries(){
	for(var i=0;i<rh.length;i++){
		libs[i].setMap(null);
	}	
}
function checkFS(){
	for(var i=0;i<rh.length;i++){
		fs[i].setMap(map);
	}	
}
function uncheckFS(){
	for(var i=0;i<rh.length;i++){
		fs[i].setMap(null);
	}	
}
function checkPS(){
	for(var i=0;i<rh.length;i++){
		ps[i].setMap(map);
	}	
}
function uncheckPS(){
	for(var i=0;i<rh.length;i++){
		ps[i].setMap(null);
	}	
}