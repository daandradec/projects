var map;
var select;
var infowindow;
var auxScroll = 0; 
var listMarkers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 41.8708, lng: -87.6505},
		zoom:15
	});

	infowindow = new google.maps.InfoWindow({
		content: ""
	});

	var marker = new google.maps.Marker({
		position: {lat: 41.8708, lng: -87.6505},
		map: map,
		icon : 	{
			url: 'img/marca3.png',
			scaledSize: new google.maps.Size(30, 46)
		}
	});

	marker.addListener('click', function(){				
		infowindow.close();
		infowindow = new google.maps.InfoWindow({
			content: "Department of Computer Science University of Illinois"
		});
		infowindow.open(marker.get('map'), marker);	
	});
	
	loadData();
	loadData2();
	loadData3();

}

//POLICE STATIONS DATESET
function loadData(){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/z8bn-74gv.json",
		type: "GET",
		data: {
			"$where" : "latitude IS NOT NULL" ,
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {	
		for (var i = data.length - 1; i >= 0; i--) {
			var aux = data[i];
			var locatio = new google.maps.LatLng(data[i].latitude,data[i].longitude);
			for (var j = listMarkers.length - 1; j >= 0; j--) {
				//console.log(distancePoints(listMarkers[j].position,markerrr.position) );
				//console.log();
				if (distancePoints(listMarkers[j].position,locatio) <= 3500){
					listMarkers[j].security += 10;
				}
			}
			
		};
	});
}

//CRIMES DATASET
function loadData3(){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
		type: "GET",
		data: {
			"$limit" : 2000,
			"year" : 2017,
			"$where" : "latitude IS NOT NULL AND longitude IS NOT NULL " ,
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {	

		for (var i = data.length - 1; i >= 0; i--) {
			var aux = data[i];
			var locatio = new google.maps.LatLng(data[i].latitude,data[i].longitude);
			for (var j = listMarkers.length - 1; j >= 0; j--) {
				//console.log(distancePoints(listMarkers[j].position,markerrr.position) );
				//console.log();
				if (distancePoints(listMarkers[j].position,locatio) <= 500){
					listMarkers[j].security += -1;
				}
			}
			
		};
	});

}

//Affordable Rental Housing Developments DATA SET

function loadData2(){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
		type: "GET",
		data: {
			//"$limit" : 10,
			"$where" : "latitude IS NOT NULL" ,
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {	
		for (var i = data.length - 1; i >= 0; i--) {
			var locatio = new google.maps.LatLng(data[i].latitude,data[i].longitude);
			var li = document.createElement("li");
			var marker = new google.maps.Marker({
				position: locatio,
				map: map,
				icon : {
					url: 'img/marca2.png',
					scaledSize: new google.maps.Size(46, 70)
				},
				property_name : data[i].property_name ,
				property_type : data[i].property_type ,
				address : data[i].address ,
				phone_number : data[i].phone_number ,
				community_area : data[i].community_area,
				distance : dis(locatio),
				elementList : li,
				security : 0

			});

			var li = document.createElement("li");
			li.setAttribute("myvar","desactive");
			li.setAttribute("class","itemA list-group-item");
			li.markerr = marker;
			li.setAttribute("onclick","selectMarker(this.markerr)");
			li.innerHTML = marker.property_name + "<span class='badge'>"+Math.round(marker.distance/10)/100+" km</span>";


			marker.elementList = li;
			marker.addListener('click',function(){
				if (select != null){
					select.icon = {
						url: 'img/marca2.png',
						scaledSize: new google.maps.Size(46, 70)
					};
					select.setMap(map);
				}
				select = this;
				infowindow.close();
				infowindow = new google.maps.InfoWindow({
					content: this.property_name
				});
				infowindow.open('map', this);	
				this.icon = {
					url: 'img/marca4.png',
					scaledSize: new google.maps.Size(46, 70)
				};
				select.setMap(map);
				document.getElementById('name').innerHTML = '<b>Name</b>:  ' + this.property_name + " </em> <BR>";
				document.getElementById('propType').innerHTML =  '<b>Property type</b>:   ' + this.property_type + "<BR>";
				document.getElementById('addre').innerHTML =   '<b>Address</b>:  ' + this.address + "<BR>";
				document.getElementById('phone').innerHTML =  '<b>Phone number</b>:  ' + this.phone_number + "<BR>";
				document.getElementById('commu').innerHTML =   '<b>Name of community</b>:  ' + this.community_area + "<BR>";
				document.getElementById('distan').innerHTML =   '<b>Distance to Department of Computer Science </b>:  ' + this.distance/1000 + " Km <BR>";

				$(".itemA").attr("myvar","desactive");
				this.elementList.setAttribute("myvar","active");
				document.getElementById("listCont").scrollTop = this.elementList.scrollx;


			});

			listMarkers.push(marker);
			//console.log(aux.latitude);
		};		 
		addListOrderD();
		//console.log(data.length + " Datos recolectados");
	});
}

function addListOrderD(){

	listMarkers.sort(function(a, b){return b.distance - a.distance}); 

	auxScroll = 0;
	for (var i = listMarkers.length - 1; i >= 0; i--) {
		listMarkers[i].elementList.innerHTML = listMarkers[i].property_name + "<span class='badge'>"+Math.round(listMarkers[i].distance/10)/100+" km</span>";

		listMarkers[i].elementList.scrollx = auxScroll;
		auxScroll += 41;
		document.getElementById("listCont").appendChild(listMarkers[i].elementList);
	}
}
function addListOrderS(){

	listMarkers.sort(function(a, b){return  a.security - b.security}); 

	auxScroll = 0;
	for (var i = listMarkers.length - 1; i >= 0; i--) {		
		listMarkers[i].elementList.innerHTML = listMarkers[i].property_name + "<span class='badge'>"+listMarkers[i].security+"</span>";
		listMarkers[i].elementList.scrollx = auxScroll;
		auxScroll += 41;
		document.getElementById("listCont").appendChild(listMarkers[i].elementList);
	}
}


function dis(locatio){
	return Math.round(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(41.8708, -87.6505),locatio));	
}

function selectMarker(elem){
	if (select != null){
		select.icon = {
			url: 'img/marca2.png',
			scaledSize: new google.maps.Size(46, 70)
		};
		select.setMap(map);
	}
	select = elem;
	infowindow.close();
	infowindow = new google.maps.InfoWindow({
		content: elem.property_name
	});
	infowindow.open('map', elem);	
	elem.icon = {
		url: 'img/marca4.png',
		scaledSize: new google.maps.Size(46, 70)
	};
	select.setMap(map);
	document.getElementById('name').innerHTML = '<b>Name</b>:  ' + elem.property_name + " </em> <BR>";
	document.getElementById('propType').innerHTML =  '<b>Property type</b>:   ' + elem.property_type + "<BR>";
	document.getElementById('addre').innerHTML =   '<b>Address</b>:  ' + elem.address + "<BR>";
	document.getElementById('phone').innerHTML =  '<b>Phone number</b>:  ' + elem.phone_number + "<BR>";
	document.getElementById('commu').innerHTML =   '<b>Name of community</b>:  ' + elem.community_area + "<BR>";
	document.getElementById('distan').innerHTML =   '<b>Distance to Department of Computer Science </b>:  ' + elem.distance/1000 + " Km <BR>";

	$(".itemA").attr("myvar","desactive");
	elem.elementList.setAttribute("myvar","active");

}





function distancePoints(locatio1,locatio2){
	return Math.round(google.maps.geometry.spherical.computeDistanceBetween(locatio1,locatio2));	
}

/*
NOT YET IMPLEMENTED 


*/

/*
TEST TOOLS

function origen (){
	map.setCenter({lat: 41.8708, lng: -87.6505});
}

function clear (){
	map.c;
}


function clearr(){
	console.log("HOLA");
	console.log(document.getElementById("listCont").scrollTop);
	document.getElementById("listCont").scrollTop = 0;

}


*/