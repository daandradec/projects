var map;
var myLatLng = {lat: 41.8708, lng: -87.6505};

var washedData = [];
var crimeData=[];

function initMap() {


    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 12
    });

    
    
      //Marker University
      var marker = new google.maps.Marker({
        position: myLatLng,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 15, //tamaño
          strokeColor: '#f00', //color del borde
          strokeWeight: 5, //grosor del borde
          fillColor: '#00f', //color de relleno
          fillOpacity:1// opacidad del relleno
        },
        map: map,
        title: 'Department of electrical & Computer Engeniering'
      });
     
    var xmlhttp1 = new XMLHttpRequest();
    var url1 = "https://data.cityofchicago.org/api/views/dfnk-7re6/rows.json?accessType=DOWNLOAD";
    xmlhttp1.open("GET", url1, true);
    xmlhttp1.send();
    xmlhttp1.onreadystatechange = function() {
      if (xmlhttp1.readyState == 4 && xmlhttp.status == 200) {
        var myArr1 = xmlhttp1.responseText;
        var text1 = myArr1;
        var json1 = JSON.parse(text1);
        

            for (var i = 0; i<50; i++) {
                    var dataLine = [];
                    //latitude - 0
                    dataLine.push(json.data[i][22]);
                    //longitude - 1
                    dataLine.push(json.data[i][23]);
                    
                    crimeData.push(dataLine);
            }

            for (var i = 0; i<50; i++) {
              myLatlng1 = {lat: Number(crimeData[i][0]), lng: Number(crimeData[i][1])};
              var marker = new google.maps.Marker({
                position: myLatlng1,
                map: map,
                title: 'Click to zoom'
              });
            }
      }

    };
    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    //https://data.cityofchicago.org/api/views/dfnk-7re6/rows.json?accessType=DOWNLOAD
    //var xmlhttp1 = new XMLHttpRequest();
    //json format data resource url 
    
    
    
    //document.getElementById("weather").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";


    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            
            var text = myArr;
            
            json = JSON.parse(text);
            for (var i = 0; i<44; i++) {
            //alert(json.data[1][i]);
            }//document.getElementById("id01").innerHTML = myArr;
            
            //
            //add the information of the markets here 
            //
            for (var i = 0; i<50; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][19]);
                //longitude - 1
                dataLine.push(json.data[i][20]);
                //name - 2
                dataLine.push(json.data[i][8]);
                //street - 3
                dataLine.push(json.data[i][12]);
                //phone - 4
                dataLine.push(json.data[i][14]);

                washedData.push(dataLine);
            };
            //alert(washedData[1][0]);
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
                            initMap();
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();
                            }
                            //Distance
                            var university = new google.maps.LatLng(41.8708,-87.6505);  
                            var objective = new google.maps.LatLng(washedData[key][0],washedData[key][1]); 
                            var distancia = parseInt(google.maps.geometry.spherical.computeDistanceBetween(university, objective))/1000;

                            var numberOfCrime = crimeData.length;
                            var countCrime=0
                            for (var j = 0; j < numberOfCrime; j++)
                            {
                                var crimeLocation = new google.maps.LatLng(crimeData[j][0],crimeData[j][1]);
                                var distanceCrime = parseInt(google.maps.geometry.spherical.computeDistanceBetween(objective, crimeLocation))/1000;
                                if (distanceCrime<3) {
                                  countCrime++
                                }
                            }
                            //alert(countCrime);

                            // var objConfigDR = {
                            //   map: map
                            // }

                            // var objConfigDS = {
                            //   origin:start,
                            //   destination:objective,
                            //   travelMode: google.maps.TravelMode.DRIVING
                            // }
                            //var ds = new google.maps.DirectionsService();
                            //var dr = new google.maps.DirectionsRenderer(objConfigDR);
                            
                          
                                //ds.route(objConfigDS, fnRutear) 

                            /*function fnRutear(result,status){
                              if (status == google.maps.DirectionsStatus.OK) {
                                dr.setDirections(result)
                                //alert(parseInt(distancia)/1000+"kilometros");
                              }else{
                                alert('Error '+status)
                              }
                            
                            };*/
                            var directionsDisplay = new google.maps.DirectionsRenderer;
                            var directionsService = new google.maps.DirectionsService;

                            directionsDisplay.setMap(map);


                            calculateAndDisplayRoute(directionsService, directionsDisplay,university,objective);
                            document.getElementById('mode').addEventListener('change', function() {
                            calculateAndDisplayRoute(directionsService, directionsDisplay,university,objective);
                            });


                            //infowindow.setContent(washedData[key][2]);
                            //infowindow.open(map, markers[key]);
                            //set the menu information about the market
                            document.getElementById("market-name").innerHTML = "<em>" + washedData[key][2] + "</em>";
                            document.getElementById("street-name").innerHTML = "<em>" + washedData[key][3] + "</em>";
                            document.getElementById("phone").innerHTML = "<em>" + washedData[key][4] + "</em>";
                            //document.getElementById("distanceTo").innerHTML = "<b>Distance</b>: <em>"+ distancia + " </em>";
                            document.getElementById("gauge").innerHTML = "<pre>                "+ distancia + " Km"+"</pre>";
                            document.getElementById("gauge1").innerHTML = "<pre>                "+ distancia + " Km"+"</pre>";
                            document.getElementById("gauge2").innerHTML = "<pre>                "+ distancia + " Km"+"</pre>";
                            document.getElementById("gauge3").innerHTML = "<pre>                "+ distancia + " Km"+"</pre>";

                            //pie
                            var g = new JustGage({
                              id: "gauge",
                              value: distancia,
                              min: 0.0,
                              max: 15.1,
                              title: "Distance"
                            });
                            var g = new JustGage({
                              id: "gauge1",
                              value: distancia,
                              min: 0.0,
                              max: 15.1,
                              title: "Distance2"
                            });
                            var g = new JustGage({
                              id: "gauge2",
                              value: distancia,
                              min: 0.0,
                              max: 15.1,
                              title: "Distance2"
                            });
                            var g = new JustGage({
                              id: "gauge3",
                              value: distancia,
                              min: 0.0,
                              max: 15.1,
                              title: "Distance2"
                            });


 
                        });
                        
                    });
                }
            });
        
        });

        }
    };


}


var datos = $.ajax({ url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&stationid=GHCND:US1ILCK0094&startdate=2017-02-01&enddate=2017-03-11",
                    data: '',
                    headers:{ token:"AbYWErkeNuzRhwKEomgoYmJvyDQsqgbI" }});

datos.done(function(data){ $('#wet').text(data.results[1].datatype); });

function calculateAndDisplayRoute(directionsService, directionsDisplay,start,end) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin:start, 
    destination:end,
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}







