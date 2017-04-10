$(document).ready(function(){
	$("button").click(function(){
		alert("select by type");
	});
	$("#id_btn1").click(function(){
		alert("select by id");
	});



 


})
            //variables for map and marks
            var elevator;
            var map;
            // 2-level array for washed markets data
            var washedData = [];

            var coords = {lat: 41.8708, lng: -87.6505};
               var rad = function(x) {
             return x * Math.PI / 180;
                                      };

           


            var getDistance = function(coords, sitecoords) 
            {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(sitecoords.lat - coords.lat);
            var dLong = rad(sitecoords.lng - coords.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(coords.lat)) * Math.cos(rad(sitecoords.lat)) *
             Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
             return d; // returns the distance in meter
            };


     function initMap() {
      var mapDiv = document.getElementById('map'); //Line 1: Save reference to div element where map would be shown

      var map = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
      center: {lat: 41.8708, lng: -87.6505}, //This is Purdue University's Location
      zoom: 13});

      var marker = new google.maps.Marker({ //Line 1
      position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
      map: map,//Line 3: Reference to map object
      title: 'Department of Computer Science – University of Illinois' //Line 4: Title to be given
      })
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
            
            

             for (var i = 0; i<263; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][19]);
                //longitude - 1
                dataLine.push(json.data[i][20]);
                //name - 2
                dataLine.push(json.data[i][11]);
                //type -3
                dataLine.push(json.data[i][10]);
                //street - 4
                dataLine.push(json.data[i][12]);
                //ZIP-5
                 dataLine.push(json.data[i][13]);
                //phone - 6
                dataLine.push(json.data[i][14]);
                  //distance -7 
              var sitecoords = {lat: Number(json.data[i][19]), lng: Number(json.data[i][20])};
                 dataLine.push(getDistance(coords,sitecoords)) ;
               //  document.getElementById("text").innerHTML = dataLine[6];
                washedData.push(dataLine);

             //   document.getElementById("text").innerHTML = getDistance(coords,sitecoords);
              

            };

            var numberOfMarkets = washedData.length;
            var markers = [];
             var image = 'imgs/'+'casita' + '.png';

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
                            title: washedData[key][2],
                            icon: image

                        });
////////////////////////////////////////////////////
                          google.maps.event.addListener(markers[key], 'click', function() {
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();
                            }
                            infowindow.setContent(washedData[key][2]);
                            infowindow.open(map, markers[key]);
                            //set the menu information about the market
                            document.getElementById("place-name").innerHTML = "<b>Place Name</b>: " + washedData[key][2] + "</em>";

                            document.getElementById("placetype").innerHTML = "<b>Property type</b>: <em>" + washedData[key][3] + "</em>";
                            document.getElementById("address1").innerHTML = "<b>Address</b>: <em>" + washedData[key][4] + "</em>";
                            document.getElementById("zip").innerHTML = "<b>ZIP-code</b>: <em>" + washedData[key][5] + "</em>";
                            document.getElementById("phone").innerHTML = "<b>Phone</b>: <em>" + washedData[key][6] + "</em>";
                            document.getElementById("distance").innerHTML = "<b>Distance</b>: <em>" + Math.round((washedData[key][7])/1000* 100) / 100 + "Km away from Computer Science Department</em>";
                            
                            

                        });
               

                    });
                 }

            });

        });


      }//status=200bracket
      
      }
      
     

     // document.getElementById("text").innerHTML += "noo";
      

  }