
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
        center: {lat: 41.870800, lng: -87.650500},
        zoom: 14
    });




    var pinColor = "31bb10";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));


     var marker = new google.maps.Marker({
                position: {lat: 41.870800, lng: -87.650500},
                map: map,
                icon: pinImage,
                shadow: pinShadow
            });








    var infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    
    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

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
            for (var i = 0; i<json.data.length; i++) {
                var dataLine = [];
                //0 --- latitude 
                dataLine.push(json.data[i][19]);
                //1 --- longitude 
                dataLine.push(json.data[i][20]);
                //2  ----  Community Area name
                dataLine.push(json.data[i][8]);
                // 3 ------ Units
                dataLine.push(json.data[i][16]);
                // 4 -- Property Type
                dataLine.push(json.data[i][10]);
                // 5 --- Property Name
                dataLine.push(json.data[i][11]);
                // 6  --- Address 
                dataLine.push(json.data[i][12]);
                //-7  ---- Zip Code
                dataLine.push(json.data[i][13]);
                //- 8 ---- Phone Number
                dataLine.push(json.data[i][14]);
                // 9  ---- Management Company
                dataLine.push(json.data[i][15]);

                washedData.push(dataLine);
            };








            //alert(washedData);
            //number of the markets
            var numberOfMarkets = washedData.length;

            //add markers on the map
            var markers = [];
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
                            document.getElementById("property-name").innerHTML = "<b>Property Name</b>: " + washedData[key][5] + "</em>";
                            document.getElementById("property-type").innerHTML = "<b>Property Type</b>: <em>" + washedData[key][4] + "</em>";
                            document.getElementById("address").innerHTML = "<b>Address</b>: <em>" + washedData[key][6] + "</em>";
                            document.getElementById("rental-price").innerHTML = "<b>Rental price</b>: <em>" + "Not available" + "</em>";

                            //dtata - scored stores




                            //This is a test, I will implement scores based on other datasets




                            var w = 200,
                            h = 250;
                            var array  = [];
                            for (var i = 0; i<9; i++) {
                                array[i] = Math.random();
                            }
                            var d = [
                                [
                                    {axis:"Nearby parks",value:array[0]},
                                    {axis:"Safety",value:array[1]},
                                    {axis:"Transport",value:array[2]},
                                    {axis:"Distance",value:array[3]},
                                    {axis:"Prices",value:array[4]},
                                    {axis:"Fire stations nearby",value:array[5]},
                                    {axis:"Nearby police stations",value:array[6]},
                                    {axis:"Other",value:array[7]},
                                    {axis:"service",value:array[8]}
                                ]
                            ];

                            document.getElementById("scores").innerHTML = "The final score for is <b><em>" + parseInt(score(array)*100) + "</b></em> out of <b><em>100</b></em>";                            

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



//the algorithm for scoring
//This is a test, I will implement scores based on other datasets


function score(data) {
    return data[0]*0.1 + data[2]*0.01 + data[3]*0.11 + data[1]*0.1 + data[4]*0.2 + data[5]*0.1 + data[6]*0.2 + data[7]*0.01 + data[8]*0.01;
}




