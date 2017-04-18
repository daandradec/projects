function myMap() {
	var mapCanvas = document.getElementById("map");
	var myCenter = new google.maps.LatLng(41.8708,-87.6505); 
	var mapOptions = {center: myCenter, zoom: 16};
	var map = new google.maps.Map(mapCanvas,mapOptions);
	var marker = new google.maps.Marker({
        position: myCenter, 
        animation: google.maps.Animation.BOUNCE
	});
	marker.setMap(map);
    
    
    // Create a <script> tag and set the USGS URL as the source.
    //var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    //script.src = 'https://data.cityofchicago.org/resource/9rg7-mz9y.json';
    //document.getElementsByTagName('map')[0].appendChild(script);
    
}

//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "http://api.openweathermap.org/data/2.5/weather?q=Chicago,US&appid=102b1170c24d8266cc3e5d66f3c8967b";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
    
        document.getElementById("weather").innerHTML = " At this moment the weather is <em><b>" + json.weather[0].main + "</b></em>";
	}
};


var jpol = new XMLHttpRequest();

var url1 = "https://data.cityofchicago.org/resource/9rg7-mz9y.json";
jpol.open("GET", url1, true);
jpol.send();

jpol.onreadystatechange = function() {
    if (jpol.readyState == 4 && jpol.status == 200) {
        var myArr = jpol.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        
        for (var i = 0; i < json.length; i++) {
            //var coords = results.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(json[i].location.coordinates[1],json[i].location.coordinates[0]);
            var marker = new google.maps.Marker({
                position: latLng, 
                setMap: map 
            });
            //marker.setMap(map);
        }
        
        console.log(json);
        //document.getElementById("police").innerHTML = " location Police <em><b>" + json.location.coordinates[0] +" , "+ json.location.coordinates[1] + "</b></em>";
	}
};

