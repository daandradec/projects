var elevator;
var map;

var washedData = [];
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var washedDataM = [];
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var washedDataL = [];
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/*function getZestimate(address,csz,citystatezip){
var xmlhttp2 = new XMLHttpRequest();

    var userdata = "address="+address+"&csz="+citystatezip;
    var url2 = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=$csz&address=$address&citystatezip=$citystatezip";
    xmlhttp2.open("GET",url2,true);

    xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp2.onreadystatechange = function(){
        if(xmlhttp2.readyState == 4 && xmlhttp2.status == 200){
            var res = xmlhttp2.responseText;
            retrieve = JSON.parse(res);
            document.getElementById("zillowP").innerHTML = retrieve.data;               
        }
        else{
            document.getElementById("zillowP").innerHTML = "Error!";
        }
    }

    xmlhttp2.send(userdata);
    document.getElementById("zillowP").innerHTML = "Generating...";

    return false;
}*/

function dataSetHouses(map){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            for (var i = 0; i<44; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][19]);
                //longitude - 1
                dataLine.push(json.data[i][20]);
                //Community area number
                dataLine.push(json.data[i][8]);
                //Property type
                dataLine.push(json.data[i][9]);
                //Property name
                dataLine.push(json.data[i][10]);
                //adress
                dataLine.push(json.data[i][11]);
                //zip-code
                dataLine.push(json.data[i][12]);
                //start date -7
                dataLine.push(json.data[i][13]);
                //end date - 8
                dataLine.push(json.data[i][14]);
                //website - 9
                dataLine.push(json.data[i][15][0]);

                washedData.push(dataLine);
            };
            var csz = "X1-ZWz1fqmvpafua3_70ucn";
            //getZestimate(json.data[1][11],csz,json.data[1][12]);
            var numberOfHouses = washedData.length;

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

            var locations = [];
            for (var j = 0; j < numberOfHouses; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            var positionalRequest = {
                'locations': locations
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {

                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                        });
                        
                        
                    });
                }
            });
        
        });
        }
    };
}

function dataSetMarkets(map){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            for (var i = 0; i<46; i++) {
                var dataMarkets = [];
                //latitude - 0
                dataMarkets.push(json.data[i][18]);
                //longitude - 1
                dataMarkets.push(json.data[i][19]);
                //Community area number
                dataMarkets.push(json.data[i][8]);
                //Property type
                dataMarkets.push(json.data[i][9]);
                //Property name
                dataMarkets.push(json.data[i][10]);
                //adress
                dataMarkets.push(json.data[i][11]);
                //zip-code
                dataMarkets.push(json.data[i][12]);
                //start date -7
                dataMarkets.push(json.data[i][13]);
                //end date - 8
                dataMarkets.push(json.data[i][14]);
                //website - 9
                dataMarkets.push(json.data[i][15][0]);

                washedDataM.push(dataMarkets);
            };

            var numberOfHouses = washedDataM.length;

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

            var locations = [];
            for (var j = 0; j < numberOfHouses; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            var positionalRequest = {
                'locations': locations
            };
            var image = {url: 'frut.png',
                        size: new google.maps.Size(30, 30)
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {

                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedDataM[key][0]), lng: Number(washedDataM[key][1])},
                            map: map,
                            icon: image
                        });
                        
                        
                    });
                }
            });
        
        });
        }
    };

}

function dataSetLibraries(map){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            for (var i = 0; i<46; i++) {
                var dataLib = [];
                //latitude - 0
                dataLib.push(json.data[i][18][1]);
                document.getElementById("zillowP").innerHTML = json.data[i][18][1];
                //longitude - 1
                dataLib.push(json.data[i][18][2]);
                //Community area number
                dataLib.push(json.data[i][8]);
                //Property type
                dataLib.push(json.data[i][9]);
                //Property name
                dataLib.push(json.data[i][10]);
                //adress
                dataLib.push(json.data[i][11]);
                //zip-code
                dataLib.push(json.data[i][12]);
                //start date -7
                dataLib.push(json.data[i][13]);
                //end date - 8
                dataLib.push(json.data[i][14]);
                //website - 9
                dataLib.push(json.data[i][15][0]);

                washedDataL.push(dataLib);
            };

            var numberOfHouses = washedDataL.length;

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

            var locations = [];
            for (var j = 0; j < numberOfHouses; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            var positionalRequest = {
                'locations': locations
            };
            var image = {url: 'lib.png',
                        size: new google.maps.Size(30, 30)
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {

                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedDataL[key][0]), lng: Number(washedDataL[key][1])},
                            map: map,
                            icon: image
                        });
                        
                        
                    });
                }
            });
        
        });
        }
    };

}

function initMap(){
		    var mapDiv = document.getElementById('map');
		    var map = new google.maps.Map(mapDiv, {
			   center: {lat: 41.8708, lng: -87.6505},
			   zoom: 12});  
		    var image = {url: 'UIC_logo1.png',
		    			size: new google.maps.Size(50, 50)
			};
		  var marker = new google.maps.Marker( { 
			   position: {lat: 41.8708, lng: -87.6505}, 
			   map: map,
			   icon: image,
			title: 'Department of Computer Science – University of Illinois'
		});
        dataSetHouses(map);
        dataSetMarkets(map);
        dataSetLibraries(map);

}