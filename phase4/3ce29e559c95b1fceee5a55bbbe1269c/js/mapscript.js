/** map showing js**/

var elevator;
var map;

var washedData = [];

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//init the google map in the webpage
function initMap() {
    
    var makrUniversity = {lat: 41.8708, lng: -87.6505}
    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: makrUniversity,
        zoom: 14
    });

    var infowindow = new google.maps.InfoWindow({
                            content: ""
    });

    var iconBase = './img/32px/';
    var iconBaseBig = './img/64px/';

    var universityText = 'Department of Computer Science – University of Illinois';

    var marker = new google.maps.Marker({
        position: makrUniversity,
        map: map,
        icon: iconBaseBig + 'Pencil.png',
    });

    var infowindow = new google.maps.InfoWindow({
        content: universityText,
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
        infowindow.setContent(universityText);
    });



    // google.maps.event.addListener(marker, 'click', function() {
    //     if( prev_infowindow ) {
    //         prev_infowindow.close();
    //     }
    //     // infowindow.setContent('Department of Computer Science – University of Illinois');                
    // }
    
    var xmlhttp = new XMLHttpRequest();

    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            var numOfHouses = json.data.length;
            
            for (var i = 0; i<numOfHouses; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][19]);
                //longitude - 1
                dataLine.push(json.data[i][20]);
                //name - 2
                dataLine.push(json.data[i][11]);
                //street - 3
                dataLine.push(json.data[i][20]);
                //day in week - 4
                dataLine.push(json.data[i][10]);
                //start time - 5
                dataLine.push(json.data[i][11]);
                //end time - 6
                dataLine.push(json.data[i][12]);
                //start date -7
                dataLine.push(json.data[i][13]);
                //end date - 8
                dataLine.push(json.data[i][14]);
                //website - 9
                dataLine.push(json.data[i][15][0]);

                washedData.push(dataLine);
            };
            var numberOfMarkets = washedData.length;

            //add markers on the map
            var markers = [];
            google.maps.event.addListener(map, 'idle', function() {
            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();
            // adding markers
            var locations = [];
            for (var j = 0; j < numberOfMarkets; j++)
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

                    $.each(results, function(key, value) {

                        //alert(key);
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                            icon: iconBase + 'Cabin.png'
                        });

                        var setLat = 0.0;
                        var setLon = 0.0;

                        var directionsService = new google.maps.DirectionsService();
                        

                        google.maps.event.addListener(markers[key], 'click', function() {
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();
                            }
                            infowindow.setContent(washedData[key][2]);
                            infowindow.open(map, markers[key]);
                            setLat = washedData[key][0];
                            setLon = washedData[key][1];
                            //set the menu information about the market
                            document.getElementById("market-name").innerHTML = "<b>Market Name</b>: " + washedData[key][3] + "</em>";
                            // document.getElementById("street-name").innerHTML = "<b>Address</b>: <em>" + washedData[key][3] + "</em>";
                            // if(washedData[key][9])
                            //     document.getElementById("website").innerHTML = "<b>Website</b>: <em><a href=\"" + washedData[key][9] + "\">" + washedData[key][9] + "</a></em>";
                            // else
                            //     document.getElementById("website").innerHTML = "<b>Website</b>: <em>Not available</em>";
                            // document.getElementById("open-status").innerHTML = "<b>Market Status</b>: <em>" + contain(washedData[key][4], day()).capitalizeFirstLetter() + "</em>";

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