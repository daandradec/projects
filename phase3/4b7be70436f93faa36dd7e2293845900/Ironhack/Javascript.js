var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  } 
}

function notAva() {
    confirm("Sorry but this option is not available at the moment");
}




//First Button

    function reiniciar_mapa(){
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
        var UIC = {
                url: "imagenes/university2.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow  = new google.maps.InfoWindow({
            content: "Department of Computer Science – University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker, 'click', function(){ infoWindow.open(map, marker);});
        
         var map;
        var dataLine = [];
        var info = [];
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            //add the information of the markets here 
            //
            for (var i = 0; i<262; i++) {
                
                dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            for(var i=0; i<dataLine.length; i++){
                var marker = new google.maps.Marker({position: dataLine[i], map:map, title: 'Place to rent', icon:icon});
                
                /*Multiples infowindows doesn't work
                var infoWindow  = new google.maps.InfoWindow({
                    content: "testing"
                });
                google.maps.event.addListener(marker, 'click', function(){ infoWindow.open(map, marker);});
                */
            }

        }
	}
    }

//4 button
   function safe(){
       confirm("This is a beta version, at the moment only shows the location of 1000 crimes")
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
        var UIC = {
                url: "imagenes/university2.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow  = new google.maps.InfoWindow({
            content: "Department of Computer Science – University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker, 'click', function(){ infoWindow.open(map, marker);});
        
         var map;
        var dataLine = [];
        var info = [];
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/x2n5-8w5q/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            //add the information of the markets here 
            //
            for (var i = 0; i<1000; i++) {
                
                dataLine.push(new google.maps.LatLng(json.data[i][22], json.data[i][23]));
            };
            var icon = {
                url: "imagenes/crime.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            for(var i=0; i<dataLine.length; i++){
                var marker = new google.maps.Marker({position: dataLine[i], map:map, title: 'Place to rent', icon:icon});
                
                /*Multiples infowindows doesn't work
                var infoWindow  = new google.maps.InfoWindow({
                    content: "testing"
                });
                google.maps.event.addListener(marker, 'click', function(){ infoWindow.open(map, marker);});
                */
            }

        }
	}
    }
//Fifth button Radius
    var r=0;
    function radio(){
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 12});
        var UIC = {
                url: "imagenes/university2.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
			map: map,//Line 3: Reference to map object
            icon: UIC,
			title: 'UIC' //Line 4: Title to be given
		});
        var infoWindow  = new google.maps.InfoWindow({
            content: "Department of Computer Science – University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker, 'click', function(){ infoWindow.open(map, marker);});
        
         var map;
        var dataLine = [];
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            //add the information of the markets here 
            if(r==0){
                confirm("Please select a radius")
            }
            for (var i = 0; i<262; i++) {
                
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map.getCenter();
                var distance = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                //
                
                if(distance < r){
                    dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
                }
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            for(var i=0; i<dataLine.length; i++){
                var marker = new google.maps.Marker({position: dataLine[i], map:map, title: 'Place to rent', icon:icon})
            }

        }
	}
    }

// radio
function getRadio() {
    r = document.getElementById("r").value;
    //calculo del radio
        var porcentaje=(29200*r)/100;
        r=porcentaje+800;
        //
    document.getElementById("demo").innerHTML = r+" meters";
}
   

