/**
Author: Priyank Jain
This is the core js logic for adding markes and radarchart for Purdue 2016 Ironhacks Tutorials
**/

//variables for map and marks
var elevator;
var map;
// 2-level array for washed markets data
var washedData = [];
var washedParks = [];
var xmlhttp;
var infowindow;

var markers = [];

var u_lat = 41.85081542;
var u_long = -87.69123528;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function readParks(){
    var xmlhttpParks = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/vcti-mbcd/rows.json?accessType=DOWNLOAD";
    xmlhttpParks.open("GET", url, true);
    xmlhttpParks.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttpParks.onreadystatechange = function() {
        if (xmlhttpParks.readyState == 4 && xmlhttpParks.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttpParks.responseText;
            var text = myArr;
            json = JSON.parse(text);

            for (var i = 0; i<44; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][27]);
                //longitude - 1
                dataLine.push(json.data[i][26]);
                //ParkName - 2
                dataLine.push(json.data[i][1]);
                //Address - 3
                dataLine.push(json.data[i][11]);

                washedParks.push(dataLine);
            };
            var image = 'http://maps.google.com/mapfiles/ms/micons/tree.png';
            //number of the markets
            var numberOfParks = washedParks.length;
            var markersParks = [];
            for (var key in washedParks){
                var myLatLng = {lat: Number(washedParks[key][0]), lng: Number(washedParks[key][1])};
                //alert(key);
                markersParks[key] = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image
                    //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                });
            }
        }
    };

}


//init the google map in the webpage
function initMap() {
    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: u_lat, lng: u_long},
        zoom: 12
    });


    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function setMap(  ){
    initMap();
    var showParks = document.getElementById('show-parks').checked;

    //create a new httprequest for this session
    if(showParks)
        readParks();
    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            //alert(json.data[1][1]);
            //document.getElementById("id01").innerHTML = myArr;
            
            //
            //add the information of the markets here 
            //
            for (var i = 0; i<44; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][19]);
                //longitude - 1
                dataLine.push(json.data[i][20]);
                //PropertyName - 2
                dataLine.push(json.data[i][11]);
                //Address - 3
                dataLine.push(json.data[i][12]);
                //Phone - 4  
                dataLine.push(json.data[i][14]);
                //ZipCode - 5
                dataLine.push(json.data[i][13]);
                //Community Area Name - 6
                dataLine.push(json.data[i][8]);
                //Property Type - 7
                dataLine.push(json.data[i][10]);
                //Price?? - 8
                dataLine.push(json.data[i][16]);

                washedData.push(dataLine);
            };
            //alert(washedData);
            //number of the markets
            var numberOfHouses = washedData.length;

            //add markers on the map
            google.maps.event.addListener(map, 'idle', function() {
            // Create an ElevationService
            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            // getting bounds of current location
            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();
            // adding 20 markers to the map at random locations
            var locations = [];
            for (var j = 0; j < numberOfHouses; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            // Create a LocationElevationRequest object using the array's one value
            var positionalRequest = {
                'locations': locations
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    //if the infowindow is open
                    var prev_infowindow =false;

                    var minPrice = document.getElementById('min-price').value;
                    var maxPrice = document.getElementById('max-price').value;
                    var maxDistance = document.getElementById('distance').value;


                    $.each(results, function(key, value) {
                        var actual_distance = geo_distance(u_lat, u_long, Number(washedData[key][0]), Number(washedData[key][1]), "K");
                        if( parseInt(washedData[key][8]) >= minPrice && parseInt(washedData[key][8]) <= maxPrice && actual_distance <= maxDistance){

                            var markers = [];
                            //alert(key);
                            var image = 'http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png';
                            markers[key] = new google.maps.Marker({
                                position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                                map: map,
                                icon: image
                                //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                            });
                            google.maps.event.addListener(markers[key], 'click', function() {
                                //if another window is open, close it
                                if( prev_infowindow ) {
                                    prev_infowindow.close();
                                }

                                infowindow.setContent(washedData[key][2]);
                                infowindow.open(map, markers[key]);
                                //set the menu information about the market
                                document.getElementById("property-name").innerHTML = "<b>Property Name</b>: " + washedData[key][2] + "</em>";
                                document.getElementById("community-name").innerHTML = "<b>Community Name Name</b>: " + washedData[key][6] + "</em>";
                                document.getElementById("address").innerHTML = "<b>Address</b>: <em>" + washedData[key][3] + "</em>";
                                document.getElementById("phone-number").innerHTML = "<b>Phone Number</b>: <em>" + washedData[key][4] + "</em>";
                                document.getElementById("price").innerHTML = "<b>Price</b>: <em>" + washedData[key][8] + "</em>";

                                //dtata - scored stores
                                //you will use scoring algorithm to get these value in the final project
                                //here we only use random method to show the process
                                var w = 200,
                                h = 250;
                                var array  = [];
                                for (var i = 0; i<9; i++) {
                                    array[i] = Math.random();
                                }
                                var d = [
                                    [
                                        {axis:"Open hours",value:array[0]},
                                        {axis:"Availability",value:array[1]},
                                        {axis:"Freshness",value:array[2]},
                                        {axis:"Distance",value:array[3]},
                                        {axis:"Prices",value:array[4]},
                                        {axis:"Customer ratings",value:array[5]},
                                        {axis:"Personal preference",value:array[6]},
                                        {axis:"Other",value:array[7]},
                                        {axis:"service",value:array[8]}
                                    ]
                                ];

                                document.getElementById("scores").innerHTML = "The final score for this market is <b><em>" + parseInt(score(array)*100) + "</b></em> out of <b><em>100</b></em>";                            

                                //Options for the Radar chart, other than default
                                var mycfg = {
                                  w: w,
                                  h: h,
                                  maxValue: 0.6,
                                  levels: 6,
                                  ExtraWidthX: 200
                                }

                                //Call function to draw the Radar chart
                                //Will expect that data is in %'s
                                RadarChart.draw("#chart", d, mycfg);
                            });
                        }   
                        
                    });
                }
            });
        
        });

        }
    };
    
}

//show the request function in the text format
function myRequestFunction(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            out += '<a href="' + arr[i].url + '">' + 
            arr[i].display + '</a><br>';
        }
        document.getElementById("id01").innerHTML = out;
    }
// Add a listener for idle event and call getElevation on a random set of marker in the bound

//get the result of whether contains a substring
function contain(str, substr) {
    if(str.indexOf(substr) > -1)
        return "open";
    else
        return "closed";
}

//get the day in a week by the number
function day() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[d.getDay()];
}

//the algorithm for scoring
//you should create your own reasonable methods for calculating scores
function score(data) {
    return data[0]*0.1 + data[2]*0.01 + data[3]*0.11 + data[1]*0.1 + data[4]*0.2 + data[5]*0.1 + data[6]*0.2 + data[7]*0.01 + data[8]*0.01;
}

function geo_distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}