      /* Option controllers */
      var option1 = false;
      var option2 = false;
      var option3 = false;
      var option4 = false;
      var option5 = false;
      var runtimes = 0;
      var washedData = [];
      var map; // map
      var elevator; //variable to set map locations
      var directionsDisplay = new google.maps.DirectionsRenderer(); // variable to get route direction
      var iconMainMarker = 'icons/mainmarker.png'; //icon for main marker
      var houseIcon = 'icons/casa.png' //icon for house markers
      var cases; // option cases

      /* Initialize the map */
      function initMap(){
      		var mapDiv = document.getElementById('map');
      		 map = new google.maps.Map(mapDiv, {
      			center: {lat: 41.870800, lng: -87.650500},
      			zoom: 12});
      		var mainmarker = new google.maps.Marker({ //Line 1
      			position: {lat: 41.870800, lng: -87.650500}, //Line2: Location to be highlighted
      			map: map,//Line 3: Reference to map object
      			title: 'Chicago, Il', //Line 4: Title to be given
            icon : iconMainMarker
      		})
          return map;
      	}


      /*Search for rent places nearby*/
      function go(){
        map = initMap();
        var infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
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
              //  var size=0;
                var i = 0;
                while(washedData.length<50){
                  var rentalData = [];
                  var theDistance = distancemapped(41.870800,-87.650500,Number(json.data[i][19]),Number(json.data[i][20]));
                  if (theDistance <=7000){
                  //property Name
                  rentalData.push(json.data[i][11]);
                  //phone number
                  rentalData.push(json.data[i][14]);
                  //address
                  rentalData.push(json.data[i][12]);
                  //units
                  rentalData.push(json.data[i][16]);
                  //comunity area number
                  rentalData.push(json.data[i][9]);
                  //managment company
                  rentalData.push(json.data[i][15]);
                  //latitude
                  rentalData.push(json.data[i][19]);
                  //longitude
                  rentalData.push(json.data[i][20]);
                  rentalData.push(theDistance);
                  washedData.push(rentalData);
                  i+=1;
                //  size+=1;
                }
                else{
                  i+=1;
                }
                };
    var rentalNumbers = washedData.length;
        var markers = [];
      //  alert(rentalNumbers);
        //add markers

        google.maps.event.addListener(map, 'idle', function() {
          //Elevation service
          elevator = new google.maps.ElevationService();
          $.each(markers, function(key, value)
                  {
                      value.setMap(null);
                  });
                  /*
                  // getting bounds of current location
                          var boundBox = map.getBounds();
                          var southWest = boundBox.getSouthWest();
                          var northEast = boundBox.getNorthEast();
                          var lngSpan = northEast.lng() - southWest.lng();
                          var latSpan = northEast.lat() - southWest.lat();
                          */
                  //adding location markers to the map
                var locations = [];
                  for (var j = 0; j < rentalNumbers; j++)
              {
                    var location = new google.maps.LatLng(
                          washedData[j][6],washedData[j][7]
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
                        var prev_infowindow =false;

                        $.each(results, function(key, value) {

                          markers[key] = new google.maps.Marker({
                                position: {lat: Number(washedData[key][6]), lng: Number(washedData[key][7])},
                                map: map,
                                icon : houseIcon
                            });
                          google.maps.event.addListener(markers[key], 'click', function() {
                                    //if another window is open, close it
                                    if( prev_infowindow ) {
                                        prev_infowindow.close();
                                    }

                                    infowindow.setContent('Name : '+washedData[key][0]+', Tel: '+washedData[key][1]+'Distance: '+washedData[key][8]);
                                    infowindow.open(map, markers[key]);

                                    $('.routeButton').fadeIn(300);
                                    $('.routeButton').on('click', function() {
                                    displayRoute({lat: 41.870800, lng: -87.650500},{lat: Number(washedData[key][6]), lng: Number(washedData[key][7])},map);

                                  });


                        });
                    });
                  }
                });

              });
            }
            };


            //  }
      }
   //Calculating route between 2 points
   function displayRoute(start,end,theMap) {


      // set map to route
          directionsDisplay.setMap(theMap); // map should be already initialized.

      var request = {
          origin : start,
          destination : end,
          travelMode : google.maps.TravelMode.DRIVING
      };
      var directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
          }
      });
  }

  var rad = function(x) {
    return x * Math.PI / 180;
  };


    //distance between 2 points passing latlng objects
    function distancemapped(startlat,startlng,endlat,endlng){
      var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(endlat - startlat);
  var dLong = rad(endlng - startlng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(startlat)) * Math.cos(rad(endlat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
    }

        /* Toogle Options Button */
      function optionsButtonManager(){
        $('.main-menu').hide();
        $('.optionsButton').on('click', function() {
        $('.main-menu').slideToggle(200);
            });

      }

      /* Button Manager */
      function buttonManager(){


        /* Toogle Option 1 Button */
       $('.o1').on('click', function() {
          if(!option1){
          $(this).toggleClass('active');
          option1=true;
            if(option2){
            $('.o2').toggleClass('active');
            option2=false;
            }
            if(option3){
              $('.o3').toggleClass('active');
              option3=false;
            }
            if(option4){
              $('.o4').toggleClass('active');
              option4=false;
            }
            if(option5){
              $('.o5').toggleClass('active');
              option5=false;
            }
          }
          else{
            $(this).toggleClass('active');
            option1=false;

          }
              });

        /* Toogle Option 2 Button */
        $('.o2').on('click', function() {
         if(!option1){
         $(this).toggleClass('active');
         if (!option2) {option2=true;}
         else {option2=false;}
       }
       else{
         alert('Please disable Default option first')
       }
           });


        /* Toogle Option 3 Button */
        $('.o3').on('click', function() {
          if(!option1){
          $(this).toggleClass('active');
          if (!option3) {option3=true;}
          else {option3=false;}
        }
        else{
          alert('Please disable Default option first')
        }
              });

        /* Toogle Option 4 Button */
        $('.o4').on('click', function() {
          if(!option1){
          $(this).toggleClass('active');
          if (!option4) {option4=true;}
          else {option4=false;}
        }
        else{
          alert('Please disable Default option first')
        }
              });

        /* Toogle Option 5 Button */
        $('.o5').on('click', function() {
          if(!option1){
          $(this).toggleClass('active');
          if (!option5) {option5=true;}
          else {option5=false;}
        }
        else{
          alert('Please disable Default option first')
        }
              });

        /* Toogle Go Button */

        $('.goButton').on('click', function() {

            $('pa').hide();
            $('li').hide();
            $('.descriptionContainer').hide();

          if (option1 || (!option2 && !option3 && !option4 && !option5 )){
            $('#op1').fadeIn(100);
            $('#opDef').fadeIn(100);
            go();
          }
          else {

            if (option2){
              $('#op2').fadeIn(100);
              $('#opLc').fadeIn(100);
            }
            if (option3){
              $('#op3').fadeIn(100);
              $('#opCl').fadeIn(100);
            }
            if (option4){
              $('#op4').fadeIn(100);
              $('#opTr').fadeIn(100);
            }
            if (option5){
              $('#op5').fadeIn(100);
              $('#opPl').fadeIn(100);
            }
            if (option2 && option3 && option4 && option5){
              alert('¡Surprise! Now let me show you the best that i can.')
            }
          }
          $('.descriptionContainer').slideToggle(300);
          $('#final-paragraph').fadeIn(100);
          $('.optionsButton').hide();
          $('.goButton').hide();
          $('#map').hide();
          $('.optionsButton').fadeIn(500);
          $('.goButton').fadeIn(400);
          $('#map').fadeIn(350);
          runtimes+=1;
          if (runtimes>4){
            alert('Looks like you liked me. Would like you to try selecting all filtering options. What you will see?');
            runtimes=-20;
          }
                    });
      }


       /* Main function */
      function main(){


        optionsButtonManager();
        map = initMap();
        buttonManager();


      }
      /* Instruction to execute the main function just when the page has been succesfully loaded */
      $('.main-menu').hide();
      $('.routeButton').hide();
      $('.descriptionContainer').hide();
      $('.html-header').hide();
      $('.optionsButton').hide();
      $('.goButton').hide();
      $('#map').hide();
      $('.html-header').fadeIn(1000);
      $('.optionsButton').fadeIn(900);
      $('.goButton').fadeIn(900);
      $('#map').fadeIn(850);

      $(document).ready(main);
