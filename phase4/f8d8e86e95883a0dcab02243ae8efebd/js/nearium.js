var map;
var washedData = [];
var elevator;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14});

    var marker = new google.maps.Marker({
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      position: {lat: 41.8708, lng: -87.6505},
      map: map,
      title: 'Department of Computer Science'
    })

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

        //
        //add the information of the markets here
        //
        for (var i = 0; i<262; i++) {
          var dataLine = [];
          //latitude - 0
          dataLine.push(json.data[i][19]);
          //longitude - 1
          dataLine.push(json.data[i][20]);
          //type
          dataLine.push(json.data[i][10]);
          //name
          dataLine.push(json.data[i][11]);
          //Phone number
          dataLine.push(json.data[i][14]);

          washedData.push(dataLine);
        };
        //window.alert(json.data[0][19]);

        //number of the markets
        var numberOfRent = washedData.length;

        //add rent houses on the map
        var rent = [];
        google.maps.event.addListener(map, 'idle', function() {
          // Create an ElevationService
          elevator = new google.maps.ElevationService();
          $.each(rent, function(key, value)
          {
            value.setMap(null);
          });
          // getting bounds of current location
          var boundBox = map.getBounds();
          var southWest = boundBox.getSouthWest();
          var northEast = boundBox.getNorthEast();
          var lngSpan = northEast.lng() - southWest.lng();
          var latSpan = northEast.lat() - southWest.lat();
          // adding all the rent houses to the map at random locations
          var locations = [];
          for (var j = 0; j < numberOfRent; j++)
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
                rent[key] = new google.maps.Marker({
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
