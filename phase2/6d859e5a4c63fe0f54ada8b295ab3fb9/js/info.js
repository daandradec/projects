
   var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();



var xmlhttp1 = new XMLHttpRequest();
var url1 = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp1.open("GET", url, true);
xmlhttp1.send();

var map;
var elevator;
var rentalsData = []:

// Google map: future integration with markers 
function initMap() {
    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.8708, lng: 87.6505},
        zoom: 12
    });


xmlhttp1.onreadystatechange = function() {
    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
    
        document.getElementById("weather").innerHTML = "Weather is: <em><b>" + json.weather[0].main + "</b></em>";


    }
}
xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var array = xmlhttp.responseText;
            var text = array;
            json = JSON.parse(text);
 
            
            
            //add the information of the markets here 
            
            for (var i = 0; i<263; i++) {
                var dataRental = [];
                //comunity_area
                dataRental.push(json.data[i][9]);
               	//propertype_name
                dataRental.push(json.data[i][12]);
                //address
                dataRental.push(json.data[i][13]);
                //phone_number
                dataRental.push(json.data[i][15]);
                //management_Company
                dataRental.push(json.data[i][16]);
                //latitude
                dataRental.push(json.data[i][20]);
                //longitude
                dataRental.push(json.data[i][21]);
        

                wData.push(dataRental);
            };
       
            //number of the markets
            var numberPlaces = wData.length;

            //add markers on the map
            var markers = [];
            google.maps.event.addListener(map, 'idle', function() {
            // Create an ElevationService
            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
   
            // adding  markers to the map locations places
          
            for (var j = 0; j < numberPlaces; j++)
            {
                var location = new google.maps.LatLng(
                        json.data[j][20],json.data[j][21]
                        );
        
            }

           