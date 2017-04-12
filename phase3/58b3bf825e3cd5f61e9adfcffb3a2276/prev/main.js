/* Option controllers */
var option1 = false;
var option2 = false;
var option3 = false;
var option4 = false;
var option5 = false;
var ready = false;
var runtimes = 0;
var washedData = []; //rental data
var crimesData = []; //crimes data
var crimelocations = [];//Array for crime locations
var fireStationsData = [];
var policeStationsData = [];
var clinicsData = [];
var map; // map
var elevator; //variable to set map locations
var directionsDisplay;
var iconMainMarker = 'icons/mainmarker.png'; //icon for main marker
var houseIcon = 'icons/casa.png' ;//icon for house markers
var crimeIcon = 'icons/crime.png' ;//icon for house markers
var fsIcon = 'icons/fsicon.png'; //icon for fire station
var policeIcon = 'icons/police.png'; //icon for police stations
var clinicIcon = 'icons/clinic.png'; //icon for clinic
var cases; // option cases
var thisYear = new Date().getFullYear();
//console.log(thisYear);
var beText = []; //This array contains text information about Chicago City
var displayText = setInterval(displayTheText,5000);



/* Initialize the map */
function initMap(){
  var mapDiv = document.getElementById('map');
  var themap = new google.maps.Map(mapDiv, {
    center: {lat: 41.870800, lng: -87.650500},
    zoom: 12});
    var mainmarker = new google.maps.Marker({ //Line 1
      position: {lat: 41.870800, lng: -87.650500}, //Line2: Location to be highlighted
      map: themap,//Line 3: Reference to map object
      title: 'Chicago, Il', //Line 4: Title to be given
      icon : iconMainMarker
    })

    console.log("map ready");
    return themap;
  }

  function min(a,b){
    if (a>=b) return b;
    else return a;
  }
  function max(a,b){
    if (a>=b) return a;
    else return b;

  }


  function climateData(){

    $.ajax({
      url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=CITY:US170006&startdate='+thisYear+'-01-01&enddate='+thisYear+'-12-31&datatypeid=TMAX&datatypeid=TMIN&units=METRIC&limit=365',
      method: "GET",
      datatype: "json",
      headers:{ token: 'cTMwlBjazrgVvkoZuMsjAdvNhSSZsMRP'},


      success: function(result){
        var minTmin;
        var maxTmax;
        var collectedData = result; //collectedData is a javascript object

        //console.log(collectedData.results[1]);
        minTmin = collectedData.results[0].value;
        maxTmax = minTmin;
        for (var i = 0;i<collectedData.results.length;i++){
          if (collectedData.results[i].datatype==='TMIN'){
            minTmin = min(minTmin,collectedData.results[i].value);
          }
          else if (collectedData.results.datatype === 'TMAX'){
            maxTmax = max(maxTmax,collectedData.results[i].value);
          }
        }
        beText.push("The Lowest temperature in the current year was: "+minTmin+" Celcius");
        beText.push("The Highest temperature in the current year was: "+maxTmax+" Celcius");
        //console.log(beText.length);
      }
    });

  }


  /* for save resources purposes, i consider only
  level one, this includes crimes with less or equal IUCR of 500, and
  only domestic crimes.
  for complete information about thst number and crime descriptions, you can go to
  https://data.cityofchicago.org/Public-Safety/Chicago-Police-Department-Illinois-Uniform-Crime-R/c7ck-438e

}
*/
//Crimes data, one year ago or less, raw 10.000 results
function criminalData(){
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/x2n5-8w5q/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",
    timeout: 10000,

  })
  .done (function(result){
    //  console.log(result.data[0]);
    //iucr : 11 ; name : 12; latitude: 22; longitude: 23;

    var i=0;
    while(crimesData.length<1000){
      var crimedata = [];
      if (result.data[i][11]<=500 && result.data[i][16]==='Y'){
        crimedata.push(result.data[i][11]);
        crimedata.push(result.data[i][12]);
        crimedata.push(result.data[i][22]);
        crimedata.push(result.data[i][23]);
        crimedata.push(result.data[i][16]);
        crimesData.push(crimedata);
        i+=1;
      }
      else{
        i+=1;
      }
    }

    console.log("crimes ready");
    beText.push("I've about "+result.data.length+" crimes data since one year ago");
    $('.startButton').text('READY TO START');
    ready = true;

  });

}



//Fire Stations data
//name,address,city,state,zip,engine,location
  function fireStations(){
    $.ajax({
      url: 'https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD',
      method: "GET",
      datatype: "json",


    })
    .done (function(result){
      //console.log(result);
      fireStationsData=result.data;
      beText.push("There are "+result.data.length+" fire stations available in the city");
      console.log("fire stations ready");
    });

  }

  //police stations data
  function policeStations(){
    $.ajax({
      url: 'https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD',
      method: "GET",
      datatype: "json",


    })
    .done (function(result){
    //  console.log(result.data[0][15][0]);
      for (var i=0;i<result.data.length;i++){
        var policeData=[];
        //latitude
        policeData.push(result.data[i][20]);
        //longitude
        policeData.push(result.data[i][21]);
        //site
        policeData.push(result.data[i][9]);
        //Address
        policeData.push(result.data[i][10]);
        //telephone
        policeData.push(result.data[i][15][0]);
        //fax
        policeData.push(result.data[i][16][0]);
        policeStationsData.push(policeData);
      }
      beText.push("There are "+result.data.length+" police stations available in the city");
      console.log("police stations ready");
    });

  }

  //Clinics data
  function clinics(){
    $.ajax({
      url: 'https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD',
      method: "GET",
      datatype: "json",


    })
    .done (function(result){
     console.log(result.data);
      /*for (var i=0;i<result.data.length;i++){
        var clinic=[];
        //latitude
        policeData.push(result.data[i][20]);
        //longitude
        policeData.push(result.data[i][21]);
        //site
        policeData.push(result.data[i][9]);
        //Address
        policeData.push(result.data[i][10]);
        //telephone
        policeData.push(result.data[i][15][0]);
        //fax
        policeData.push(result.data[i][16][0]);
        policeStationsData.push(policeData);

      }*/
      beText.push("There are "+result.data.length+" clinics available in the city");
      console.log("clinics ready");
    });

  }


  /*Search for rent places nearby*/
  function go(){
    directionsDisplay = new google.maps.DirectionsRenderer(); // variable to get route direction
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

    $('.startButton').on('click', function() {
      if(ready===false){alert('The page has not loaded yet, and maybe your user experience will be affected, we recommend reload page')}
      $('#Home').slideToggle(1500);
      $('.html-header').fadeIn(1000);
      $('.optionsButton').fadeIn(900);
      $('.goButton').fadeIn(900);
      $('#map').fadeIn(850);
      clearInterval(displayText);
      map = initMap();
      putIconsInMap(map);


    });


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
          alert('¡Surprise! Now let me show you the best that i can do for you.')
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
        alert('Looks like i liked to you. Would like you to try selecting all filtering options. What you will see?');
        runtimes=-20;
      }
    });
  }


  function displayTheText(){
    $('#text-it').text(settingTheText());
    var docHeight = $('#Home').height()/3,
    docWidth = $('#Home').width(),
    $div = $('#animated'),
    divWidth = $div.width(),
    divHeight = $div.height(),
    heightMax = docHeight - divHeight,
    widthMax = docWidth - divWidth;
    $div.css({

      left: Math.floor( Math.random() * widthMax ),
      top: Math.floor( Math.random() * heightMax ),
      opacity: 0.0
    });

    d3.select('#animated').transition().style("opacity", "0.8").duration(1000);

  }

  function settingTheText(){
    var cases = beText.length;
    var actual = Math.floor( Math.random() * cases );
    return "Chicago City Tips! = "+beText[actual];

  }

//In the initial map, show interest locations to user
  function putIconsInMap(){
    map = initMap();
    //crimes
    var crimesNumber = crimesData.length;

    for (var j = 0; j < crimesNumber; j++)
    {
      var location = new google.maps.LatLng(
        crimesData[j][2],crimesData[j][3]
      );
      crimelocations.push(location);
      new google.maps.Marker({
        position: location,
        map: map, icon :
        crimeIcon })

    }


    //fire stations
    var geocoder = new google.maps.Geocoder();
    for (var j = 0; j < fireStationsData.length; j++)
    {
      geocoder.geocode( { 'address': fireStationsData[j][12]}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            icon: fsIcon,
            position: results[0].geometry.location
        });
      }
    });
  }


}
  /* Main function */
  function main(){

    criminalData();
    d3.select('#home_container').transition().style("opacity", "0.6").duration(5000);
    optionsButtonManager();
    buttonManager();
    climateData();
    fireStations();
    policeStations();
    clinics();

  }





  /* Instruction to execute the main function just when the page has been succesfully loaded */
  $('.main-menu').hide();
  $('.routeButton').hide();
  $('.descriptionContainer').hide();
  $('.html-header').hide();
  $('.optionsButton').hide();
  $('.goButton').hide();
  $('#map').hide();

  $(document).ready(main);
