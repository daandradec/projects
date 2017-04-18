
function initMap(){
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14});

  var marker = new google.maps.Marker({
    position: {lat: 41.8708, lng: -87.6505},
    map: map,
    title: 'illinois University',
    icon: 'img/u_ico.png'
  });
  
  
  
  //loadingRentalHouses();
}
/*function loadingRentalHouses() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var myArr;
	var text;
	var json;
	var numberOfPA;
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myArr = xmlhttp.responseText;
	        text = myArr;
	        json = JSON.parse(text);
	        numberOfPA = json.data.length;
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            var namePlayArt ="";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
            namePlayArt = json.data[i][11];
	        	var n = new google.maps.Marker({
						    	position: latLng,
						   		map: map,
						  		title: namePlayArt,
						  		icon: 'img/house_ico.png'
						  	});
	        }
		}
	}	
}*/
function search(){
	initMap();
	var LatU=41.8708;
	var LonU=-87.6505
	var MaxDistInx=document.getElementById("SelcNear").selectedIndex;
	var MaxDist = parseInt(document.getElementById("SelcNear").options[MaxDistInx].value);
	
	//document.getElementById("demo").innerHTML = x;
	var xmlhttp = new XMLHttpRequest(); 
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var myArr;
	var text;
	var json;
	var numberOfPA;
	 var markers = [];
	 var windows = [];
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myArr = xmlhttp.responseText;
	        text = myArr;
	        json = JSON.parse(text);
	        numberOfPA = json.data.length;
	        var prev_infowindow =false;
	       
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            	var namePlayArt =json.data[i][11];
            	var type = json.data[i][10];
            	var comu = json.data[i][8];
            	var address = json.data[i][12];
            	var phone = json.data[i][14];
            	var compa = json.data[i][15];
            	var units = json.data[i][16];
            	if (MaxDist!=0){
	            	var x=((parseFloat(json.data[i][19])-LatU)*10000)/90;
	            	var y=((parseFloat(json.data[i][20])-LonU)*40000)/360;
	            	var dist=  (Math.sqrt((Math.pow(x, 2)+Math.pow(y, 2))))
	            	document.getElementById("demo").innerHTML = "You can click the map on the house that you want more information";
		        	if(dist<=MaxDist){
			        	latLng = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
		            	var infowindow = new google.maps.InfoWindow();
		            	//var content = "blablabla";
			        	var marker = new google.maps.Marker({
								    	position: latLng,
								   		map: map,
								  		title: namePlayArt,
								  		icon: 'img/house_ico.png'
								  	});
						var infowindow = new google.maps.InfoWindow();
						 
						var cont = '<p style= "font-size: 1.0em ">Name: '+namePlayArt+ '</p> <p style= "font-size: 1.0em ">Type: '+ type+' </p>'
						+'<p style= "font-size: 1.0em ">Community: '+comu+ '</p> <p style= "font-size: 1.0em ">Address: '+ address+' </p>'
						+'<p style= "font-size: 1.0em ">Phone: '+phone+ '</p> <p style= "font-size: 1.0em ">Management company: '+ compa+' </p>'
						+'<p style= "font-size: 1.0em ">Units: '+units+ '</p>'
						;
						google.maps.event.addListener(marker, 'click', (function(marker,cont,infowindow) {  
						             
						           return function() {
						           	   
						               var content = cont;  
						               infowindow.setContent(content);  
						               infowindow.open(map, marker);  
						           }  
						         })(marker,cont,infowindow));  
						/*google.maps.event.addListener(marker,'click', (function(n,content,infowindow){ 
						    return function() {
						        infowindow.setContent(content);
						        infowindow.open(map,n);
						    };
						})(n,content,infowindow));  */
					}
				}
				/*else{
					latLng = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
		            namePlayArt = json.data[i][11];
			        var n = new google.maps.Marker({
				    	position: latLng,
				   		map: map,
				  		title: namePlayArt,
				  		icon: 'img/house_ico.png'
				  	});
				  	markers.push(n);
						n.addListener('click', function() {
							
                            infowindow.setContent("blabla");
    						infowindow.open(map, n);
  						});
					
				}	*/
	        }
		}
	}	
	
}

/*function SeeCrimes(){
	var LatU=41.8708;
	var LonU=-87.6505
	var VerIndx=document.getElementById("SelcSecu").selectedIndex;
	var Ver = document.getElementById("SelcSecu").options[VerIndx].value; //yes or not
	var xmlhttp = new XMLHttpRequest(); 
	var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var myArr;
	var text;
	var json;
	var numberOfPA;
	
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myArr = xmlhttp.responseText;
	        text = myArr;
	        json = JSON.parse(text);
	        numberOfPA = json.data.length;
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            	if (Ver=="Yes"){	            	
		        	latLng = JSON.parse('{ "lat":'+ json.data[i][20] +', "lng":'+ json.data[i][21] +' }');
		        	var n = new google.maps.Marker({
							    	position: latLng,
							   		map: map,
							  		icon: 'img/crimes_ico.png'
							  	});
					
				}
			
	        }
		}
	}	
	
}*/
