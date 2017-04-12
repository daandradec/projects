/**
Author: Priyank Jain
This is the core js logic for adding markes and radarchart for Purdue 2016 Ironhacks Tutorials
**/
//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "https://www.ncdc.noaa.gov/cag/time-series/us/11/USW00094846/pcp/all/01/2014-2016.json?base_prd=true&begbaseyear=2016&endbaseyear=2017";
var pur_coor = {lat: 41.8708, lng: -87.6505};
var rentalData = [];

function initMap(){
	var mapDiv = document.getElementById('map');
	var map;
	map = new google.maps.Map(mapDiv, {
		center: pur_coor,
		zoom: 13
	});  
	var marker = new google.maps.Marker({ 
		position: {lat: 41.8708, lng: -87.6505},
		map: map,
		title: 'Purdue University'
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

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            for (var i = 0; i<263; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][19]);
                //longitude - 1
                dataLine.push(json.data[i][20]);
                //name - 2
                dataLine.push(json.data[i][11]);
                //street - 3
                dataLine.push(json.data[i][12]);

                rentalData.push(dataLine);
            };
            var numberOfMarkets = rentalData.length;
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
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(rentalData[key][0]), lng: Number(rentalData[key][1])},
                            map: map,
                        });
                        
                    });
                }
            });
        
        });

        }
    };
}



