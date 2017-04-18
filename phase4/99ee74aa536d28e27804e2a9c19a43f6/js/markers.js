var washedData=[];
var map;
var elevator;
var markers=[];

function clearOverlays() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
  washedData=[];
  markers=[];
}

var colLat=41.8708 
var colLng=-87.6505


function getPoliceStations(typeMarker, callback){
	var policexmlhttp = new XMLHttpRequest();
	//var policeurl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=FIPS:17&datatypeid=PRCP&startdate=2017-03-30&enddate=2017-03-30"//FIPS:37&startdate="+date+"&enddate="+date;
	var policeurl="https://data.cityofchicago.org/resource/9rg7-mz9y.json"

	policexmlhttp.open("GET", policeurl, true);
	policexmlhttp.send();
	var washedData=[];
	var maxDate=""
	var whole=["60613", "60608", "60612", "60644", "60616", "60622", "60610", "60624", "60607", "60623", "60605", "60601", "60647", "60642"]
	var near=["60612", "60616", "60608", "60607", "60605", "60601"]
	var nearest=["60607", "60608"]

	policexmlhttp.onreadystatechange = function(){
		var pinColor = "00ff00";
		if (policexmlhttp.readyState == 4 && policexmlhttp.status == 200){
		 	var resp=policexmlhttp.responseText;
		 	var plResult = JSON.parse(resp);
			var area;
			if (typeMarker===0){
				area=whole.slice();
			}else if (typeMarker===1){
				area=near.slice();
			}else{
				area=nearest.slice();
			}
			var result=[]
			for (var i = plResult.length - 1; i >= 0; i--) {
				var data=[]
				var rest=plResult[i];
				if (area.indexOf(rest.zip)!==-1){
					
					data.push(rest.district_name)
					data.push(rest.address)
					data.push(rest.phone)
					data.push(rest.latitude)
					data.push(rest.longitude)
					result.push(data)
				}
			}
			callback(result);
		}
	}
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function getPark(typeMarker, callback){
	var parkxmlhttp = new XMLHttpRequest();
	//var parkurl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=FIPS:17&datatypeid=PRCP&startdate=2017-03-30&enddate=2017-03-30"//FIPS:37&startdate="+date+"&enddate="+date;
	var parkurl="https://data.cityofchicago.org/resource/4xwe-2j3y.json"

	parkxmlhttp.open("GET", parkurl, true);
	parkxmlhttp.send();
	var washedData=[];
	var maxDate=""
	var whole=["60613", "60608", "60612", "60644", "60616", "60622", "60610", "60624", "60607", "60623", "60605", "60601", "60647", "60642"]
	var near=["60612", "60616", "60608", "60607", "60605", "60601"]
	var nearest=["60607", "60608"]

	parkxmlhttp.onreadystatechange = function(){
		var pinColor = "00ff00";
		if (parkxmlhttp.readyState == 4 && parkxmlhttp.status == 200){
		 	var resp=parkxmlhttp.responseText;
		 	var plResult = JSON.parse(resp);
			var area;
			if (typeMarker===0){
				area=whole.slice();
			}else if (typeMarker===1){
				area=near.slice();
			}else{
				area=nearest.slice();
			}
			var result=[]
			for (var i = plResult.length - 1; i >= 0; i--) {
				var data=[]
				var rest=plResult[i];
				if (area.indexOf(rest.zip)!==-1){
					
					data.push(rest.park_name)
					data.push(rest.street_address)
					data.push(rest.location.coordinates[1])
					data.push(rest.location.coordinates[0])
					result.push(data)
				}
			}
			
			callback(result);
		}
	}
}

function transcript(washedData,key, police=false, parks=false){
	kmDist=(washedData[key][9])/1000;
	kmDist=kmDist.toFixed(2);
	//weather_today=setclimate(washedData[key][3])
	weather_today="NOAA server error"
	document.getElementById("name").innerHTML = "<b>Name: </b><em>" + washedData[key][0] + "</em>";
	document.getElementById("address").innerHTML = "<b>Address: </b><em>" + washedData[key][1] + "</em>";
	document.getElementById("phone").innerHTML = "<b>Phone Number: </b><em>" + washedData[key][2] + "</em>";
	document.getElementById("zip").innerHTML = "<b>Zip Code: </b><em>" + washedData[key][3] + "</em>";
	document.getElementById("community_area").innerHTML = "<b>Community Area: </b><em>" + washedData[key][5] + "</em>";
	document.getElementById("available").innerHTML = "<b>Units Available: </b><em>" + washedData[key][4] + "</em>";
	document.getElementById("management").innerHTML= "<b>Management Company: </b><em>" + washedData[key][6] + "</em>";
	document.getElementById("distance").innerHTML= "<b>Distance from the department: </b><em>" + kmDist+ "Km</em>";
	document.getElementById("coordinates").innerHTML = "<b>Coordinates: </b><em>(" + washedData[key][7] + ","+washedData[key][8] +")</em>";
	document.getElementById("climate_datas").innerHTML=	'<h3><b>Climate today:</b><em>'+weather_today+'</em><h3>'

}



function pushJSON(nearCommunities, rentResult, police, park){
 	var home=new google.maps.LatLng(colLat, colLng);
 	var u=[]
 	for (var i = 0; i < rentResult.length; ++i){
 		var place=rentResult[i];
 		var dataLine = [];
 		var area=Number(place.community_area_number);
 		var notSupportive="Supportive"
 		var type= place.property_type;

 		if (nearCommunities.indexOf(area)!==-1 && type.indexOf(notSupportive)== -1){
			//0- Name of the property 
			dataLine.push(place.property_name);
			//1- Address
			dataLine.push(place.address);
			//2- Phone Number
			dataLine.push(place.phone_number);
			//3-Zip Code
			dataLine.push(place.zip_code);
			if(u.indexOf(place.zip_code)===-1){
				u.push(place.zip_code)
			}
			//4-Unit Available
			dataLine.push(place.units);
			//5-Community Area
			dataLine.push(place.community_area);
			//6-Management Company
			dataLine.push(place.management_company);
			//7-Latitude
			dataLine.push(place.latitude);
			//8-Longitude
			dataLine.push(place.longitude);
			//console.log(dataLine)
			//9-Distance
			var latP=Number(place.latitude);
			var lngP=Number(place.longitude);
			var loc=new google.maps.LatLng(latP, lngP)
			var dist=google.maps.geometry.spherical.computeDistanceBetween(home,loc);
			dataLine.push(dist.toFixed(2))
			//console.log(place.property_type)
			//washedData
			dataLine.push(place.community_area_number)
			washedData.push(dataLine)
 		}
	};

}

function distancesCalc(){
	tmp=[];
	distances=[];
	var home=new google.maps.LatLng(colLat, colLng);
	for (var i = 0; i < washedData.length; ++i){
		dist=washedData[i][9]
		distances.push(dist)
	}

	var minst=Math.min.apply(null, distances)
	var indexOfMin= distances.indexOf(String(minst))
	tmp.push(washedData[indexOfMin]);
	var tmpDistances=distances.slice();
	tmpDistances.splice(indexOfMin, 1);

	minst=Math.min.apply(null, tmpDistances);
	var indexOfMin2= distances.indexOf(String(minst));

	tmp.push(washedData[indexOfMin2]);

	washedData=tmp;
	
}


function typeOfCrimeList(respCrime){
	var registred=[]
	for (var i = 0; i < respCrime.length; i++) {
		var type = respCrime[i][0]
		if  (registred.indexOf(type)===-1){
			registred.push(type);
		}
	}

	return registred
}

function crime_table(array){
	max=Math.max.apply(null, array)
	if (max==0){
		max=9999
	}
	color_array=[]
	for (var i=0; i<array.length; i++){
		u=array[i]/max
		if (u>0.85){
			color_array[i]="class='danger'"
		}else if(u>0.50){
			color_array[i]="class='warning'"
		}else if (u>0.30){
			color_array[i]="class='info'"
		}else{
			color_array[i]="class='success'"
		}
	}
	str='<table class="table table-bordered"><tr><th>Type of crime</th><th>Cases this year<br>(Around the area)</th></tr>'
	str=str+'<tr '+color_array[0]+'><td>ASSAULT</td><td>'+array[0]+'</td></tr>'
	str=str+'<tr '+color_array[1]+'><td>BURGLARY</td><td>'+array[1]+'</td></tr>'
	str=str+'<tr '+color_array[2]+'><td>CRIMINAL DAMAGE</td><td>'+array[2]+'</td></tr>'
	str=str+'<tr '+color_array[3]+'><td>CRIMINAL TRESPASS</td><td>'+array[3]+'</td></tr>'
	str=str+'<tr '+color_array[4]+'><td>HOMICIDE</td><td>'+array[4]+'</td></tr>'
	str=str+'<tr '+color_array[5]+'><td>VEHICLE THEFT</td><td>'+array[5]+'</td></tr>'
	str=str+'<tr '+color_array[6]+'><td>NARCOTICS</td><td>'+array[6]+'</td></tr>'
	str=str+'<tr '+color_array[7]+'><td>CHILDREN VIOLENCE</td><td>'+array[7]+'</td></tr>'
	str=str+'<tr '+color_array[8]+'><td>OTHER</td><td>'+array[8]+'</td></tr>'
	str=str+'<tr '+color_array[9]+'><td>ROBBERY</td><td>'+array[9]+'</td></tr>'
	str=str+'<tr '+color_array[10]+'><td>STALKING</td><td>'+array[10]+'</td></tr>'
	str=str+'<tr '+color_array[11]+'><td>WEAPONS VIOLATION</td><td>'+array[11]+'</td></tr></table>'
	document.getElementById("crime_table").innerHTML=str
}


function markersPlacer(type_of_Maker, police_stations=false, parks_places=false){
	var mapDiv = document.getElementById('map');
	 var crime
	 	getCrimeWashedData(function(gc){
	 		crime=gc

		})
	var police
 		getPoliceStations( type_of_Maker,
 			function(pl){
 				police=pl
 			}
 		)

 	var parks
 		getPark( type_of_Maker,
 			function(pr){
 				parks=pr
 			}
 		)



	var map = new google.maps.Map(mapDiv, {
		center: {lat: 41.8708, lng: -87.6905},
		zoom: 12});

	if (type_of_Maker===1){
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 13});
	}else if(type_of_Maker===2){
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
	}


    var infowindow = new google.maps.InfoWindow({
    	content: ""
    });
	rentxmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
	rentxmlhttp.open("GET", url, true);
	rentxmlhttp.send();
	rentxmlhttp.onreadystatechange = function(){
		var pinColor = "ffa500";
		if (rentxmlhttp.readyState == 4 && rentxmlhttp.status == 200){
		 	var resp=rentxmlhttp.responseText;
		 	var rentResult = JSON.parse(resp);

		 	var nearCommunities=[28, 32, 33, 31, 29, 31, 25, 8, 34, 24, 27, 60, 59]
			if(type_of_Maker>0){
				pinColor = "6666ff";
		 		nearCommunities=[28, 32, 33, 31]
		 	}
		 	//typeOfCrimeList()

		 	//getCrimeWashedData()


		 	pushJSON(nearCommunities, rentResult, police, parks)

		 	if(type_of_Maker==2){
		 		distancesCalc()
		 	}


		 	var placesAvailables=washedData.length;
		 	google.maps.event.addListener(map, 'idle', function(){
		 		elevator = new google.maps.ElevationService();
		 		$.each(markers, function(key, value){
		 			value.setMap(null);
		 		});

		 		var boundBox=map.getBounds();
		 		var southWest= boundBox.getSouthWest();
		 		var northEast= boundBox.getNorthEast();
		 		var lngSpan = northEast.lng() - southWest.lng();
		 		var latSpan = northEast.lat() - southWest.lat();
		 		var locations= [];
		 		for (var j = 0; j<placesAvailables; j++){
		 			var location = new google.maps.LatLng(
		 				southWest.lat()+latSpan,
		 				southWest.lng()+lngSpan
		 			);
		 			locations.push(location);
		 		}
		 		var positionalRequest = {
		 			'locations':locations
		 		}
		 		elevator.getElevationForLocations(positionalRequest, function(results, status){
		 			if(status == google.maps.ElevationStatus.OK){
		 				if (crime=='undefined'){
			 				sleep(1000); 					
		 				}
		 				var prev_infowindow=false;
	 				 	t=typeOfCrimeList(crime)
					 	whole_list=[]
					 	coms=nearCommunities.length
					 	siz= t.length 
					 	crimes= crime.length
					 	maxCri={}
				 		for (var j = 0; j < siz; j++) {
							maxCri[t[j]]=0
								
				 		}
					 	for (var u = 0; u < coms; u++) {
					 		nc=nearCommunities[u]
					 		CRCOM=[]
					 		CRCOM.push(nc)
					 		typeOfSum={}
					 		for (var j = 0; j < siz; j++) {
								typeOfSum[t[j]]=0
								
					 		}
					 		for (var j = 0; j < crimes; j++) {
					 			if (Number(crime[j][2])==Number(nc)){
					 				var sumPoints=1;
					 				if (crime[j][1]==false){
					 					sumPoints=sumPoints*3
					 				}
					 				typeOfSum[crime[j][0]]+=sumPoints

					 				if (typeOfSum[crime[j][0]]>maxCri[crime[j][0]]){
					 					maxCri[crime[j][0]]=typeOfSum[crime[j][0]]
					 				}
					 			}
					 		}
					 		CRCOM.push(typeOfSum)
					 		whole_list.push(CRCOM)
					 	}
					 	console.log(maxCri)

		 				$.each(results, function(key, value){

		 					//console.log(washedData[key])
 							var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor)
		 					markers[key] = new google.maps.Marker({

		 						position: {lat: Number(washedData[key][7]),lng: Number(washedData[key][8])},
		 						map:map,
		 						icon: pinImage
		 					});

		 					google.maps.event.addListener(markers[key], 'click', function(){
		 						if (prev_infowindow){
		 							prev_infowindow.close();
		 						}
		 						place=String(washedData[key][0]);
		 						infowindow.setContent(place);
		 						infowindow.open(map, markers[key]);
		 						transcript(washedData,key);
	
	                            var w = 200,
	                            h = 250;
	                            var array  = [];
	                            var arrayammount=[];
	                            var found= false;
	                            for (var i = 0; i<coms; i++) {

	                                if (Number(whole_list[i][0])==Number(washedData[key][10])){
		                                for (var j=0; j<12; j++){
		                                	r=whole_list[i][1]
		                                	r=r[t[j]]
		                                	arrayammount[j]=r
		                                	if(maxCri[t[j]]!==0){
		                                		array[j]=(r/maxCri[t[j]])
		                                	}else{
		                                		array[j]=0
		                                	}

		                                }
		                                found=true
		 							}              
		 							if (found==true){
		 								break
		 							}                
	                            }
	                            console.log(array)
	                            crime_table(arrayammount)

	                          	 var d = [
	                                [
	                                    {axis:"Assault",value:array[0]},
	                                    {axis:"Burglary",value:array[1]},
	                                    {axis:"Criminal\nDamage",value:array[2]},
	                                    {axis:"Criminal\nTrespass",value:array[3]},
	                                    {axis:"Homicide",value:array[4]},
	                                    {axis:"Vehicle\nTheft",value:array[5]},
	                                    {axis:"Narcotics",value:array[6]},
	                                    {axis:"Children\nViolence",value:array[7]},
	                                    {axis:"Other",value:array[8]},
	                                    {axis:"Robbery",value:array[9]},
	                                    {axis:"Stalking",value:array[10]},
	                                    {axis:"Weapons\nViolation",value:array[11]}
	                                ]];
		                            var mycfg = {
		                              w: w,
		                              h: h,
		                              maxValue: 0.6,
		                              levels: 6,
		                              ExtraWidthX: 200
		                            }

		                            RadarChart.draw("#chart", d, mycfg);
                            	
		 					})

                            



		 				});
		 			}
		 		})

		 		if (police_stations){
		 		elevator = new google.maps.ElevationService();
		 		markers2=[]
		 		$.each(markers2, function(key, value){
		 			value.setMap(null);
		 		});

		 		var boundBox=map.getBounds();
		 		var southWest= boundBox.getSouthWest();
		 		var northEast= boundBox.getNorthEast();
		 		var lngSpan = northEast.lng() - southWest.lng();
		 		var latSpan = northEast.lat() - southWest.lat();
		 		var locations= [];
		 		for (var j = 0; j<police.length; j++){
		 			var location = new google.maps.LatLng(
		 				southWest.lat()+latSpan,
		 				southWest.lng()+lngSpan
		 			);
		 			locations.push(location);
		 		}
		 		var positionalRequest = {
		 			'locations':locations
		 		}
		 		elevator.getElevationForLocations(positionalRequest, function(results, status){
		 			if(status == google.maps.ElevationStatus.OK){
		 				var prev_infowindow=false;
		 				$.each(results, function(key, value){

		 					//console.log(washedData[key])

							var icon= {
								url: "icons/pol.ico",
								scaledSize: new google.maps.Size(25, 25),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(0, 0)

							}
		 					markers2[key] = new google.maps.Marker({

		 						position: {lat: Number(police[key][3]),lng: Number(police[key][4])},
		 						map:map,
		 						icon: icon,
		 						title: police[key][0]
		 					});
		 				});
		 			}
		 		})
				}

				if (parks_places){
		 		elevator = new google.maps.ElevationService();
		 		markers3=[]
		 		$.each(markers3, function(key, value){
		 			value.setMap(null);
		 		});

		 		var boundBox=map.getBounds();
		 		var southWest= boundBox.getSouthWest();
		 		var northEast= boundBox.getNorthEast();
		 		var lngSpan = northEast.lng() - southWest.lng();
		 		var latSpan = northEast.lat() - southWest.lat();
		 		var locations= [];
		 		for (var j = 0; j<parks.length; j++){
		 			var location = new google.maps.LatLng(
		 				southWest.lat()+latSpan,
		 				southWest.lng()+lngSpan
		 			);
		 			locations.push(location);
		 		}
		 		var positionalRequest = {
		 			'locations':locations
		 		}
		 		elevator.getElevationForLocations(positionalRequest, function(results, status){
		 			if(status == google.maps.ElevationStatus.OK){
		 				var prev_infowindow=false;
		 				$.each(results, function(key, value){

		 					//console.log(washedData[key])

							var icon= {
								url: "icons/Tree.ico",
								scaledSize: new google.maps.Size(25, 25),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(0, 0)

							}
		 					markers3[key] = new google.maps.Marker({

		 						position: {lat: Number(parks[key][2]),lng: Number(parks[key][3])},
		 						map:map,
		 						icon: icon,
		 						title: parks[key][0]
		 					});
		 				});
		 			}
		 		})
				}
		 	});
		}

	};
	var icon= {
		url: "icons/icon.ico",
		scaledSize: new google.maps.Size(25, 25),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(0, 0)

	}

	var marker = new google.maps.Marker({ //Line 1
		position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: 'Department of Electrical and Computer Engineering', //Line 4: Title to be given
		icon: icon
	})
}

