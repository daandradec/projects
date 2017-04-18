var map;
var select;
var infowindow;
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
}


//SECURITY DATESET
function loadData2(){

	$.ajax({
		url: "https://data.cityofchicago.org/resource/z8bn-74gv.json",
		type: "GET",
		data: {
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			var aux = data[i];
			var locatio = new google.maps.LatLng(data[i].latitude,data[i].longitude);
			for (var j = listMarkers.length - 1; j >= 0; j--) {		
				if (distancePoints(listMarkers[j].position,locatio) <= 3500){
					listMarkers[j].security += 10;					
				}
			}		
		};
	});
	$.ajax({
		url: "https://data.cityofchicago.org/resource/b4bk-rjxe.json",
		type: "GET",
		data: {
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			var aux = data[i];
			var locatio = new google.maps.LatLng(data[i].location.coordinates[1],data[i].location.coordinates[0]);
			for (var j = listMarkers.length - 1; j >= 0; j--) {		
				if (distancePoints(listMarkers[j].position,locatio) <= 2000){
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
			"$limit" : 1000,
			"year" : 2017,
			"$where" : "latitude IS NOT NULL AND longitude IS NOT NULL " ,
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			var aux = data[i];
			var locatio = new google.maps.LatLng(data[i].location.coordinates[1],data[i].location.coordinates[0]);
			for (var j = listMarkers.length - 1; j >= 0; j--) {		
				if (distancePoints(listMarkers[j].position,locatio) <= 1500){
					listMarkers[j].security += -1;
				}
			}		
		};
	});
}


function loadData4(){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/psqp-6rmg.json",
		type: "GET",
		data: {
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			var aux = data[i];
			var locatio = new google.maps.LatLng(data[i].location.coordinates[1],data[i].location.coordinates[0]);			
			for (var j = listMarkers.length - 1; j >= 0; j--) {		
				if (distancePoints(listMarkers[j].position,locatio) <= 1500){
					listMarkers[j].utility += 1;
				}

			}					
		};
	});
	$.ajax({
		url: "https://data.cityofchicago.org/resource/4xwe-2j3y.json",
		type: "GET",
		data: {
			"$$app_token" : "sAFdYn2bqKywAwbfaxPq5Q83H"
		}
	}).done(function(data) {

		for (var i = data.length - 1; i >= 0; i--) {
			var aux = data[i];
			var locatio = new google.maps.LatLng(data[i].location.coordinates[1],data[i].location.coordinates[0]);			
			for (var j = listMarkers.length - 1; j >= 0; j--) {		
				if (distancePoints(listMarkers[j].position,locatio) <= 500){
					listMarkers[j].utility += 1;
				}

			}					
		};
	});

}

//Affordable Rental Housing Developments DATA SET

function loadData(){
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
				security : 0,
				utility : 0,

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
				map.setCenter(this.position);
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
				this.
				$(".itemA").attr("myvar","desactive");
				this.elementList.setAttribute("myvar","active");
				this.elementList.scrollIntoView();


			});

			listMarkers.push(marker);
			//console.log(aux.latitude);
		};		 
		addListOrderD();
		//console.log(data.length + " Datos recolectados");
		loadData2();
		loadData3();
		loadData4();
		//loadData5();
	});
}

function addListOrderD(){

	listMarkers.sort(function(a, b){return b.distance - a.distance}); 

	for (var i = listMarkers.length - 1; i >= 0; i--) {
		listMarkers[i].elementList.innerHTML = listMarkers[i].property_name + "<span class='badge'>"+Math.round(listMarkers[i].distance/10)/100+" km</span>";
		document.getElementById("listCont").appendChild(listMarkers[i].elementList);
	}
}
function addListOrderS(){

	listMarkers.sort(function(a, b){return  a.security - b.security}); 

	for (var i = listMarkers.length - 1; i >= 0; i--) {		
		listMarkers[i].elementList.innerHTML = listMarkers[i].property_name + "<span class='badge'>"+listMarkers[i].security+"</span>";
		document.getElementById("listCont").appendChild(listMarkers[i].elementList);
	}
}

function addListOrderU(){

	listMarkers.sort(function(a, b){return  a.utility - b.utility}); 

	for (var i = listMarkers.length - 1; i >= 0; i--) {		
		listMarkers[i].elementList.innerHTML = listMarkers[i].property_name + "<span class='badge'>"+listMarkers[i].utility+"</span>";
		document.getElementById("listCont").appendChild(listMarkers[i].elementList);
	}
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
	map.setCenter(elem.position);
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

function dis(locatio){
	return Math.round(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(41.8708, -87.6505),locatio));	
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