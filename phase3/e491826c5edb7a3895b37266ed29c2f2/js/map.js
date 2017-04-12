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
            console.log(json);
        }
    }
    var xmlhttp2 = new XMLHttpRequest();
    var url2 = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
    xmlhttp2.open("GET", url2, true);
    xmlhttp2.send();
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp2.responseText;
            var text = myArr;
            json2 = JSON.parse(text);
            
            console.log(json2);
        }
    }

    elevator = new google.maps.ElevationService();

    var mark = [];
    var mark2 = [];

    var m=new google.maps.Marker({
            position: {lat: Number(41.870796), lng: Number(-87.650512)},
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            map: map,
            //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + "5".toString()).slice(-2) + '.png'
        });

    google.maps.event.addListener(m, 'click', function() {
                var prev_infowindow =false;
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }
                
                infowindow.setContent("University of Illinois");
                infowindow.open(map, m);

    });

    //
    var cons=[];
    google.maps.event.addListener(map, 'idle', function() {
        elevator = new google.maps.ElevationService();
           /* $.each(mark, function(key, value)
            {
                console.log(key);
                value.setMap(null);
            });*/
        $.each(json.data, function(key, value) {
            var prev_infowindow =false;

            mark[key]=new google.maps.Marker({
                position: {lat: Number(json.data[key][18]), lng: Number(json.data[key][19])},
                map: map,
                //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + "5".toString()).slice(-2) + '.png'
            });

            google.maps.event.addListener(mark[key], 'click', function() {
                
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }
                
                infowindow.setContent(json.data[key][8]);
                infowindow.open(map, mark[key]);

                document.getElementById("street-name").innerHTML = "<b>Address</b>: <em>" + json.data[key][9] + "</em>";
                document.getElementById("market-name").innerHTML = "<b>Market Name</b>: " + json.data[key][8] + "</em>";
                if(json.data[key][15][0])
                    document.getElementById("website").innerHTML = "<b>Website</b>: <em><a href=\"" + json.data[key][15][0] + "\">" + json.data[key][15][0] + "</a></em>";
                else
                    document.getElementById("website").innerHTML = "<b>Website</b>: <em>Not available</em>";
            });
        });
        //points of police stations
        $.each(json2.data, function(key, value) {
            var prev_infowindow =false;

            mark2[key]=new google.maps.Marker({
                position: {lat: Number(json2.data[key][20]), lng: Number(json2.data[key][21])},
                icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                map: map,
                //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + "5".toString()).slice(-2) + '.png'
            });

            google.maps.event.addListener(mark2[key], 'click', function() {
                
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }
                
                infowindow.setContent(json2.data[key][9]);
                infowindow.open(map, mark2[key]);

                document.getElementById("street-name").innerHTML = "<b>Address</b>: <em>" + json2.data[key][10] + "</em>";
                document.getElementById("market-name").innerHTML = "<b>Market Name</b>: " + json2.data[key][9] + "</em>";
                if(json2.data[key][14][0])
                    document.getElementById("website").innerHTML = "<b>Website</b>: <em><a href=\"" + json2.data[key][14][0] + "\">" + json2.data[key][14][0] + "</a></em>";
                else
                    document.getElementById("website").innerHTML = "<b>Website</b>: <em>Not available</em>";
            });
        });
            
    });
}
