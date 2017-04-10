var map;
var arr;
function initMap() {
	var mapCanvas = document.getElementById("map");
	var mapOptions = {
    center: {lat: 41.8708, lng: -87.6505},    
    zoom: 14
  	}

   var map = new google.maps.Map(mapCanvas, mapOptions);
  //https://www.programmableweb.com/api/placeilive ---> para ver las otras vainas
  // map.data.loadGeoJson('https://gist.githubusercontent.com/cgansen/6458644/raw/5a9ec31defab0073853831b7fc7de0f87eb66a2d/wards-from-city-unsimplified.geojson');
   map.data.loadGeoJson('https://data.cityofchicago.org/api/geospatial/cauq-8yn6?method=export&format=GeoJSON');
   var bounds = new google.maps.LatLngBounds();
   map.data.addListener('click', function(event) 
   {    
        map.data.overrideStyle(event.feature, {fillColor: 'red'});
        document.getElementById("geo").innerHTML =  map.data.type;
   });
   // Set the global styles.
  
   var myLatLng = {lat: 41.8708, lng: -87.6505};
   //Illinois University Marker
   var image = 'js/i1.png';
   var Umarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Department of Computer Science – University of Illinois!',
    icon: image
  });

   document.getElementById("load").addEventListener("click", function(){

       var url="https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?";
        var xmlhttp = new XMLHttpRequest();
        //json format data resource url 
        
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              var myArr = xmlhttp.responseText;
              var text = myArr;
              var json = JSON.parse(text);

               for( i = 0; i < Object.keys(json.data).length; i++ ) 
               {
                  var position = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                  bounds.extend(position);
                  marker = new google.maps.Marker({
                      position: position,
                      map: map,
                      title: json.data[i][15],
                      address:json.data[i][12]
                  });

                   marker.addListener('click', function() 
                   {
                    document.getElementById("pr").innerHTML = "Name: "+this["title"]+" Address: "+this["address"];//json.data[i][15]"";
                   });

              }
              //alert(JSON.parse(text).coord.lon);
              //document.getElementById("id01").innerHTML = myArr;
          
              document.getElementById("clima").innerHTML = "Number of places in chicago: "+ Object.keys(json.data).length+ "</b></em>";
          //
          //variables for the title
  }};
    
});


 




   
}


function placeMarker(map, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map    
  });

//https://data.cityofchicago.org/api/views/igwz-8jzy/rows.json --> neighborhoods in "data" [ [ "row-tnxy~np7j_syn8", "00000000-0000-0000-0EF0-C72F49C41D70", 0, 1483449732, null, 1483449732, null, "{ }", "MULTIPOLYGON((()))’, "0", "0", "0", "0", "35", "DOUGLAS", "35", "46004621.1581", "31027.0545098" ],[]



/*
  var url="http://api.openweathermap.org/data/2.5/weather?lat="+location.lat()+"&lon="+location.lng()+"&appid=6aa0bdb1f586c5630d60b6237dfce45c";
  var xmlhttp = new XMLHttpRequest();
  //json format data resource url 
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
    
        document.getElementById("clima").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";
		//
		//variables for the title
	}};

  //document.getElementById("clima").innerHTML = url;
  var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() +
    '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);*/
}