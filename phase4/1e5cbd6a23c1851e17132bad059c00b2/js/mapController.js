var map;	
var elevator;
// 2-level array for washed markets data
var washedData = [];


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
//http://www.rentrent.org/RENT/Ads.aspx?xmin=-88.69123528&ymin=41.85081542&xmax=-86.69123528&ymax=42.85081542&bd=&ba=&pets=-1&type=2&throwErrorIfOverLimit=false&callback=xxx
function initMap() {
    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.8708, lng: -87.6505},
        zoom: 11
    });


    var infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    
    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/resource/uahe-iimk.json";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(myArr);
            //alert(json.data[1][1]);
            //document.getElementById("id01").innerHTML = myArr;
            
            //
            //add the information of the markets here 
            //
            for (var i = 10; i<252; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json[i].latitude);
                //longitude - 1
                dataLine.push(json[i].longitude);
                //name - 2
                dataLine.push(json[i].management_company);
                //street - 3
                dataLine.push(json[i].address);
                //day in week - 4
                dataLine.push(json[i].units);
                //start time - 5
                dataLine.push(2);
                //end time - 6
                dataLine.push(1);
                //start date -7
                dataLine.push(2);
                //end date - 8
                dataLine.push(1);
                //website - 9
                dataLine.push(json[i].property_type);
                //telephone - 10
                dataLine.push(json[i].phone_number);
                //building name - 11
                dataLine.push(json[i].property_name);

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
                    var satM = new google.maps.Marker({
                        position: {lat: 41.8008, lng: -87.5903},
                        map: map,
                        icon: "./img/sat.png",
                    })

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
                            document.getElementById("market-name").innerHTML = "<center><b>Management Company</b>: " + washedData[key][2] + "</em>";
                            document.getElementById("street-name").innerHTML = "<center><b>Address</b>: <em>" + washedData[key][3] + "</em>";
                            document.getElementById("website").innerHTML = "<center><b>Property type: </b>: <em>" + washedData[key][9] + "</a></em>";
                            document.getElementById("telephone").innerHTML = "<center><b>Telephone</b>: <em> "+ washedData[key][10] + "</em>";
                            document.getElementById("building_name").innerHTML = "<center><b> Building Name </b>: <em> "+ washedData[key][11]+"</em>";
                            document.getElementById("units").innerHTML = "<center> <b> Units : </b> <em> " + washedData[key][4]+"</em>";
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

                            //document.getElementById("scores").innerHTML = "The final score for this market is <b><em>" + parseInt(score(array)*100) + "</b></em> out of <b><em>100</b></em>";                            

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
                            //RadarChart.draw("#chart", d, mycfg);
                        });
                        
                    });
                }
            });
        
        });

        }
    };

}