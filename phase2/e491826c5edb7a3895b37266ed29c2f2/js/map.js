/**
Author: Omar Sneyder Eraso Acero
This is the initial vercion of file js. 
This is based on the example of the sample_project tutorial of Priyank Jain.
**/

//variables for map and marks
var elevator;
var map;
// 2-level array for washed markets data
var washedData = [];


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//init the google map in the webpage
function initMap() {
    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.870796, lng: -87.650512},
        zoom: 13

        //Latitude and longitude of Colombia
        //center: {lat: 4.0000000, lng: -72.0000000},
        //zoom: 8
    });


    var infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    
    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //var json;
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
        }
    }

    

    elevator = new google.maps.ElevationService();

    var markers = [];
    google.maps.event.addListener(map, 'idle', function() {

        elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
        
        var m=new google.maps.Marker({
            position: {lat: Number(41.870796), lng: Number(-87.650512)},
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            map: map,
            //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + "5".toString()).slice(-2) + '.png'
        });
        
        for(i=0;i<json.data.length;i++){
            var m=new google.maps.Marker({
                position: {lat: Number(json.data[i][18]), lng: Number(json.data[i][19])},
                map: map,
                //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + "5".toString()).slice(-2) + '.png'
            });
        }
        
    })
}







