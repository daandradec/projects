/* Option controllers */
var option1 = false;
var option2 = false;
var option3 = false;
var option4 = false;
var option5 = false;
var ready = false;
var runtimes = 0;
var medianUnits;
var unit10;
var washedData = []; //rental data
var crimesData = []; //crimes data
var nearCrimes = [];
var fireStationsData = [];
var nearFireStations = [];
var policeStationsData = [];
var nearPoliceStations = [];
var clinicsData = [];
var nearClinics = [];
var biciStationsData = [];
var nearBiciStations = [];
var librariesData = [];
var nearLibraries = [];
var parksData = [];
var nearParks = [];
var cartsData = [];
var nearCarts = [];
var nearTraffic = [];
var trafficData = [];
var map; // map
var elevator; //variable to set map locations
var directionsDisplay;
var iconMainMarker = 'icons/mainmarker.png'; //icon for main marker
var houseIcon = 'icons/casa.png' ;//icon for house markers
var crimeIcon = 'icons/crime.png' ;//icon for house markers
var fsIcon = 'icons/fsicon.png'; //icon for fire station
var policeIcon = 'icons/police.png'; //icon for police stations
var clinicIcon = 'icons/clinic.png'; //icon for clinic
var biciIcon = 'icons/bike.png';
var libIcon = 'icons/library.png';
var parkIcon = 'icons/park.png';
var cartIcon = 'icons/food.png';
var cases; // option cases
var thisYear = new Date().getFullYear();
//console.log(thisYear);
var beText = []; //This array contains text information about Chicago City
var displayText ;
var viewedTimes = 0;

/* Instruction to execute the main function just when the page has been succesfully loaded */
$('.main-menu').hide();
$('.routeButton').hide();
$('.viewButton').hide();
$('.descriptionContainer').hide();
$('.html-header').hide();
$('.optionsButton').hide();
$('.goButton').hide();
$('#map').hide();
$('#mapTitle').hide();
$('.infoContainer').hide();
$('#dataList').hide();
$('.buttonData').hide();
$(document).ready(main);


/* Main function */
function main(){


  displayText = setInterval(displayTheText,6000);
  weather();
  criminalData();
  climateData();
  fireStations();
  policeStations();
  clinics();
  biciStations();
  libraries();
  parks();
  carts();
  optionsButtonManager();
  buttonManager();
  d3.select('#home_container').transition().style("opacity", "0.7").duration(3000);

}


/* Initialize the map */
function initMap(theZoom){
  var mapDiv = document.getElementById('map');
  var themap = new google.maps.Map(mapDiv, {
    center: {lat: 41.870800, lng: -87.650500},
    zoom: theZoom});
    var mainmarker = new google.maps.Marker({ //Line 1
      position: {lat: 41.870800, lng: -87.650500}, //Line2: Location to be highlighted
      map: themap,//Line 3: Reference to map object
      title: 'Department of computers science of Purdue University, Chicago', //Line 4: Title to be given
      icon : iconMainMarker
    });

    //console.log("map ready");
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

//retrieve Climate data from Climate Data Online databases
//Seems like for specific locations, this data is outdated and useless (with some querys it takes a lot of time
// just for showing nothing)
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
        beText.push("The Lowest temperature in the current year was: "+minTmin);
        beText.push("The Highest temperature in the current year was: "+maxTmax);

        //console.log(beText.length);
      }
    });

  }


  /* for save resources purposes, i consider only
  level one crimes, this includes crimes with less or equal IUCR of 500, and
  only domestic crimes.
  for complete information about thst number and crime descriptions, you can go to
  https://data.cityofchicago.org/Public-Safety/Chicago-Police-Department-Illinois-Uniform-Crime-R/c7ck-438e

}
*/
//Crimes data, one year ago or less, raw 2.000 results
function criminalData(){
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/x2n5-8w5q/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",

  })
  .done (function(result){
    //  console.log(result.data[0]);
    //iucr : 11 ; name : 12; latitude: 22; longitude: 23;
    crimesData=[];
    var i=0;
    while(crimesData.length<2000){
      var crimedata = [];
      if (result.data[i][11]<=500 && result.data[i][16]==='Y'){
        crimedata.push(result.data[i][11]);
        crimedata.push(result.data[i][12]);
        crimedata.push(result.data[i][22]);
        crimedata.push(result.data[i][23]);

        crimesData.push(crimedata);
        i+=1;
      }
      else{
        i+=1;
      }
    }

    //console.log("crimes ready");
    beText.push("I've "+result.data.length+" one year ago crimes data");
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
    //console.log("fire stations ready");

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
    policeStationsData = [];
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
    //console.log("police stations ready");

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
    clinicsData = [];
    for (var i=0;i<result.data.length;i++){
      var clinic=[];
      //latitude
      clinic.push(result.data[i][27]);
      //longitude
      clinic.push(result.data[i][28]);
      //disponibility
      clinic.push(result.data[i][11]);
      //clinic type
      clinic.push(result.data[i][9]);
      //phone
      clinic.push(result.data[i][16]);
      clinicsData.push(clinic);
    }
    beText.push("There are "+result.data.length+" clinics available in the city");
    //console.log("clinics ready");

  });

}
//I Consider only bikes stations with availability greater than 20
//Bici Stations Data
function biciStations(){
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/bbyy-e7gq/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",
  })
  .done (function(result){
    biciStationsData = [];
    for (var i=0;i<result.data.length;i++){
      if(result.data[i][12]>15){
        var bici=[];
        //latitude
        bici.push(result.data[i][14]);
        //longitude
        bici.push(result.data[i][15]);
        //disponibility
        bici.push(result.data[i][13]);
        //capacity
        bici.push(result.data[i][11]);
        //docks available
        bici.push(result.data[i][12]);
        //name
        bici.push(result.data[i][9]);
        //address
        bici.push(result.data[i][10]);
        biciStationsData.push(bici);
      }
    }
    beText.push("There are "+result.data.length+" Bici stations available in the city");
    //console.log("Bici stations ready");

  });

}
//Actual weather in Chicago
function weather(){
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c',
    method: "GET",
    datatype: "json",
  })
  .done (function(result){
    beText.push("Today the weather is "+result.weather[0].main);
    //console.log("weather ready");

  });
}
//Libraries
function libraries(){
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",
  })
  .done (function(result){
    //  console.log(result.data[0]);
    librariesData = [];
    for (var i=0;i<result.data.length;i++){
      var library=[];
      //latitude
      library.push(result.data[i][18][1]);
      //longitude
      library.push(result.data[i][18][2]);
      //disponibility
      library.push(result.data[i][9]);
      //phone number
      library.push(result.data[i][16]);
      //name
      library.push(result.data[i][8]);
      //address
      library.push(result.data[i][12]);
      librariesData.push(library);

    }
    beText.push("You can go to "+result.data.length+" libraries in the city");
    //console.log("libraries ready");

  });
}

//Parks
function parks(){
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",
  })
  .done (function(result){
    //console.log(result.data[0]);
    parksData = [];
    for (var i=0;i<result.data.length;i++){
      var park=[];
      //latitude
      park.push(result.data[i][13]);
      //longitude
      park.push(result.data[i][12]);
      //name
      park.push(result.data[i][8]);
      parksData.push(park);


    }
    beText.push("I've info of "+result.data.length+" parks in the city");
    //console.log("parks ready");

  });
}
// Public carts
function carts(){
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/divg-mhqk/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",
  })
  .done (function(result){
    //console.log(result.data);
    cartsData = [];
    for (var i=0;i<result.data.length;i++){
      var cart=[];
      //latitude
      cart.push(result.data[i][9]);
      //longitude
      cart.push(result.data[i][10]);
      //address
      cart.push(result.data[i][8]);
      cartsData.push(cart);


    }
    beText.push("You can easily find the "+result.data.length+" produce carts in the city");
    //console.log("carts ready");

  });
}
/* traffic real-time performance by city region
it is evaluated in current speed:
0-9 Heavy traffic
10-15 Low Heavy traffic
16-19 Medium
20-24 light
25+ free way
*/

function traffic(){
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/t2qc-9pjd/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",
  })
  .done (function(result){
    trafficData = [];
    for (var i=0;i<result.data.length;i++){
      var speed=[];

      //latitude central
      var x = Number(result.data[i][12]);
      var y =Number(result.data[i][13]);
      var z = Number(x+y);
      var a = Number(z/2);
      speed.push(a);
      //longitude central
      var b = Number(result.data[i][10]);
      var c =Number(result.data[i][11]);
      var d = Number(c+b);
      var e = Number(d/2);
      speed.push(e);
      //Current speed
      speed.push(result.data[i][15]);
      trafficData.push(speed);

    }

    //console.log("traffic ready");

  });
}
/*Search for rent places nearby*/
function go(){
  directionsDisplay = new google.maps.DirectionsRenderer(); // variable to get route direction
  map = initMap(14);
  traffic();

  var infowindow = new google.maps.InfoWindow({
    content: ""
  });
  $.ajax({
    url: 'https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD',
    method: "GET",
    datatype: "json",
  })
  .done (function(result){
    var i = 0;
    var units = 0;
    washedData = [];
    while(washedData.length<100){
      var rentalData = [];
      var theDistance = distancemapped(41.870800,-87.650500,Number(result.data[i][19]),Number(result.data[i][20]));
      if (theDistance <=7000){
        //property Name
        rentalData.push(result.data[i][11]);
        //phone number
        rentalData.push(result.data[i][14]);
        //address
        rentalData.push(result.data[i][12]);
        //units
        rentalData.push(result.data[i][16]);
        units+=Number(result.data[i][16]);
        //comunity area number
        rentalData.push(result.data[i][9]);
        //managment company
        rentalData.push(result.data[i][15]);
        //latitude
        rentalData.push(result.data[i][19]);
        //longitude
        rentalData.push(result.data[i][20]);
        rentalData.push(theDistance);
        washedData.push(rentalData);
        i+=1;
        //  size+=1;
      }
      else{
        i+=1;
      }
    }
      console.log(units);
     medianUnits = Number(units/100);
     unit10=Number(medianUnits*0.1);
     console.log(medianUnits);
     console.log(unit10);
    //filtering options
    // If the option selected by the user gives a not excelent score, remove place

   for (var i=0;i<washedData.length;i++){
      findingNear(washedData[i][6],washedData[i][7]);
      if (option2){

        if (evaluateCrimes()<71){
          if (washedData[i]!==null){ washedData.pop(i);}
        }
      }
      if (option3){
        if(evaluateClinics()<50 || evaluateFire()<50 || evaluatePolice()<50){
          if (washedData[i]!==null){ washedData.pop(i);}
        }
      }
      if (option4){
        if(evaluateTraffic()<60){
          if (washedData[i]!==null){ washedData.pop(i);}
        }
      }
      if(option5){
        if(evaluateBici()<50 || evaluateCarts()<50 || evaluateParks()<50 || evaluateLibraries()<50){
          if (washedData[i]!==null){ washedData.pop(i);}
        }
      }
    }
    //washedData.pop(0);

    //console.log(option2,option3,option4,option5);
    var rentalNumbers = washedData.length;
    console.log(rentalNumbers);
    var markers = [];
    google.maps.event.addListener(map, 'idle', function() {
      //Elevation service
      elevator = new google.maps.ElevationService();
      $.each(markers, function(key, value)
      {
        value.setMap(null);
      });

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

          var  prev_infowindow = false;
          $.each(results, function(key, value) {
            markers[key] = new google.maps.Marker({
              position: {lat: Number(washedData[key][6]), lng: Number(washedData[key][7])},
              map: map,
              icon : houseIcon
            });
            google.maps.event.addListener(markers[key], 'click', function() {
              if(prev_infowindow){
                prev_infowindow.close();
              }
              $('.buttonData').hide();
              $('.infoContainer').hide();
              $('#dataList').hide();

              $('#dc3').hide();
              mainTable(key);
              nearPlacesMap(map,washedData[key][6],washedData[key][7]);
              //console.log(nearTraffic);
              var distanceTo = washedData[key][8];
              infowindow.setContent('Name : '+washedData[key][0]+', Tel: '+washedData[key][1]+'Distance: '+distanceTo);
              infowindow.open(map, markers[key]);
              $('.routeButton').fadeIn(2000);
              $('.viewButton').fadeIn(2000);
              $('.routeButton').on('click', function() {
                displayRoute({lat: 41.870800, lng: -87.650500},{lat: Number(washedData[key][6]), lng: Number(washedData[key][7])},map);

              });
              //View Button Click

              $('.viewButton').on('click',function(){
                if(viewedTimes===0){
                for (var i=0;i<beText.length;i++){
                $('#dataList').append('<li>'+beText[i]+'</li>');
                }
                $('.infoContainer').show();
                $('#dataList').fadeIn(3000);
                viewedTimes+=1;
              }
              else if (viewedTimes>0){

              for (var j=0;j<viewedTimes;j++){
              $('#dc3').children("svg").remove();
            }
            viewedTimes+=1;
          }
              $('.infoContainer').show();
              $('#dataList').fadeIn(3000);
              $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");

              if(nearParks.length>0){
                $('#b1').text("Parks near: "+nearParks.length);
                $('#b1').fadeIn(3500);
              }
              if(nearCarts.length>0){
                $('#b2').text("Produce Carts near: "+nearCarts.length);
                $('#b2').fadeIn(3500);
              }
              if(nearCrimes.length>0){
                $('#b3').text("Crimes near: "+nearCrimes.length);
                $('#b3').fadeIn(3500);
              }
              if(nearClinics.length>0){
                $('#b4').text("Clinics near: "+nearClinics.length);
                $('#b4').fadeIn(3500);
              }
              if(nearLibraries.length>0){
                $('#b5').text("Libraries near: "+nearLibraries.length);
                $('#b5').fadeIn(3500);
              }
              if(nearFireStations.length>0){
                $('#b6').text("Fire Stations near: "+nearFireStations.length);
                $('#b6').fadeIn(3500);
              }
              if(nearPoliceStations.length>0){
                $('#b7').text("Police Stations near: "+nearPoliceStations.length);
                $('#b7').fadeIn(3500);
              }
              if(nearBiciStations.length>0){
                $('#b8').text("Bici Stations near: "+nearBiciStations.length);
                $('#b8').fadeIn(3500);
              }

              $('#dc3').fadeIn(200);
              drawChart();
              //Evaluate Place Call, a good Place has overall 70+
              if (distanceTo<=3000){
                var cal=Number(averageEval()+20);
                $('#avgCal').text("Score: "+cal);
              }else{
              $('#avgCal').text("Score: "+averageEval());
            }
              });
            });
          });
        }
      });
    });
  })
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
    if(ready===false){alert('The page has not fully loaded yet and maybe your user experience will be affected, we recommend reload page')}
    $('#Home').slideToggle(1500);
    $('.html-header').fadeIn(1000);
    $('.optionsButton').fadeIn(900);
    $('.goButton').fadeIn(900);
    $('#mapTitle').fadeIn(850);
    $('#map').fadeIn(850);
    clearInterval(displayText);
    map = initMap(14);
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
    go();
    $('pa').hide();
    $('.optionsListli').hide();
    $('.descriptionContainer').hide();
    d3.select('#mapTitle').transition().text("Affordable Places Overview").duration(2000);
    $('#map').css("height","30em");
    //d3.select('#map').transition().style("height", "40em").duration(2000);
    if (option1 || (!option2 && !option3 && !option4 && !option5 )){
      $('#op1').fadeIn(100);
      $('#opDef').fadeIn(100);
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

//In the initial map, show locations to user
function putIconsInMap(map){

  var crimesNumber = crimesData.length;
  for (var j = 0; j < crimesNumber; j++)
  {
    var location = new google.maps.LatLng(
      crimesData[j][2],crimesData[j][3]
    );

    new google.maps.Marker({
      position: location,
      map: map, icon :
      crimeIcon,
      title: 'Crime happened near'
    });
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
          position: results[0].geometry.location,
          title: 'Fire Station'
        });
      }
    });
  }

  //police stations
  for (var j = 0; j < policeStationsData.length; j++)
  {
    var location = new google.maps.LatLng(
      policeStationsData[j][0],policeStationsData[j][1]
    );
    new google.maps.Marker({
      position: location,
      map: map,
      icon : policeIcon,
      title: 'Police Station'
    })
  }
  //clinics
  for (var j = 0; j < clinicsData.length; j++)
  {
    var location = new google.maps.LatLng(
      clinicsData[j][0],clinicsData[j][1]
    );
    new google.maps.Marker({
      position: location,
      map: map,
      icon : clinicIcon,
      title: 'Clinic Location'
    })
  }
  // Bici Icons
  for (var j = 0; j < biciStationsData.length; j++)
  {
    var location = new google.maps.LatLng(
      biciStationsData[j][0],biciStationsData[j][1]
    );

    new google.maps.Marker({
      position: location,
      map: map,
      icon : biciIcon,
      title: 'Bici Station'
    })
  }
  //library Icons
  for (var j = 0; j < librariesData.length; j++)
  {
    var location = new google.maps.LatLng(
      librariesData[j][0],librariesData[j][1]
    );

    new google.maps.Marker({
      position: location,
      map: map,
      icon : libIcon,
      title: 'Library'
    })
  }
  //Parks Icons
  for (var j = 0; j < parksData.length; j++)
  {
    var location = new google.maps.LatLng(
      parksData[j][0],parksData[j][1]
    );

    new google.maps.Marker({
      position: location,
      map: map,
      icon : parkIcon,
      title: 'Park'
    })
  }
  //produce carts Icons
  for (var j = 0; j < cartsData.length; j++)
  {
    var location = new google.maps.LatLng(
      cartsData[j][0],cartsData[j][1]
    );

    new google.maps.Marker({
      position: location,
      map: map,
      icon : cartIcon,
      title: 'Produce Cart'
    })
  }
  d3.select('#leyend').transition().style("opacity", "1.0").duration(200);
}

function nearPlacesMap(map,pointLat,pointLng)
{

  //crimes

  var crimesNumber = crimesData.length;
  nearCrimes = [];
  for (var j = 0; j < crimesNumber; j++){
    var theDistance = distancemapped(pointLat,pointLng,crimesData[j][2],crimesData[j][3]);
    if(theDistance<=1000){
      var location = new google.maps.LatLng(
        crimesData[j][2],crimesData[j][3]
      );

      new google.maps.Marker({
        position: location,
        map: map, icon :
        crimeIcon,
        title: 'Crime happened near'
      });
      nearCrimes.push(j);
    }
  }

  //fire stations
  nearFireStations = [];
  var geocoder = new google.maps.Geocoder();
  for (var j = 0; j < fireStationsData.length; j++)
  {
    geocoder.geocode( { 'address': fireStationsData[j][12]}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var theDistance = distancemapped(pointLat,pointLng,results[0].geometry.location.lat(),results[0].geometry.location.lng());
      //  console.log(results[0].geometry.location.lat());
        if(theDistance<=3000){
          var marker = new google.maps.Marker({
            map: map,
            icon: fsIcon,
            position: results[0].geometry.location,
            title: 'Fire Station'
          });
          nearFireStations.push(j);
        }
      }
    });
  }

  //police stations
  nearPoliceStations = [];

  for (var j = 0; j < policeStationsData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,policeStationsData[j][0],policeStationsData[j][1]);
    if(theDistance<=3000){
      var location = new google.maps.LatLng(
        policeStationsData[j][0],policeStationsData[j][1]
      );

      new google.maps.Marker({
        position: location,
        map: map,
        icon : policeIcon,
        title: 'Police Station'
      });
      nearPoliceStations.push(j);
    }
  }

  //clinics
  nearClinics = [];
  for (var j = 0; j < clinicsData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,clinicsData[j][0],clinicsData[j][1]);
    if(theDistance<=3000){
      var location = new google.maps.LatLng(
        clinicsData[j][0],clinicsData[j][1]
      );

      new google.maps.Marker({
        position: location,
        map: map,
        icon : clinicIcon,
        title: 'Clinic Location'
      });
      nearClinics.push(j);
    }
  }
  // Bici Icons
  nearBiciStations = [];
  for (var j = 0; j < biciStationsData.length; j++)
  {

    var theDistance = distancemapped(pointLat,pointLng,biciStationsData[j][0],biciStationsData[j][1]);
    if(theDistance<=1000){
      var location = new google.maps.LatLng(
        biciStationsData[j][0],biciStationsData[j][1]
      );

      new google.maps.Marker({
        position: location,
        map: map,
        icon : biciIcon,
        title: 'Bici Station'
      });
      nearBiciStations.push(j);
    }
  }
  //library Icons
  nearLibraries = [];
  for (var j = 0; j < librariesData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,librariesData[j][0],librariesData[j][1]);
    if(theDistance<=2000){
      var location = new google.maps.LatLng(
        librariesData[j][0],librariesData[j][1]
      );

      new google.maps.Marker({
        position: location,
        map: map,
        icon : libIcon,
        title: 'Library'
      });
      nearLibraries.push(j);
    }
  }
  //Parks Icons
  nearParks = [];
  for (var j = 0; j < parksData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,parksData[j][0],parksData[j][1]);
    if(theDistance<=1500){
      var location = new google.maps.LatLng(
        parksData[j][0],parksData[j][1]
      );

      new google.maps.Marker({
        position: location,
        map: map,
        icon : parkIcon,
        title: 'Park'
      });
      nearParks.push(j);
    }
  }

  //produce carts Icons
  nearCarts=[];
  for (var j = 0; j < cartsData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,cartsData[j][0],cartsData[j][1]);
    if(theDistance<=4000){
      var location = new google.maps.LatLng(
        cartsData[j][0],cartsData[j][1]
      );

      new google.maps.Marker({
        position: location,
        map: map,
        icon : cartIcon,
        title: 'Produce Cart'
      });
      nearCarts.push(j);
    }
}


//nearest traffic zone
nearTraffic=[];
//console.log(trafficData);
var i =0;
var x = 1000;
while(i<trafficData.length){
  var theDistance = distancemapped(pointLat,pointLng,trafficData[i][0],trafficData[i][1]);
  //console.log(theDistance);
  if (theDistance<=x){
    nearTraffic.push(i);
    //console.log(nearTraffic);
    break;
    i+=1;
  }
  else if (i===(trafficData.length-1)){
    x+=1000;
    i=0;
  }
  else{
    i+=1;
  }
}
}
function findingNear(pointLat,pointLng){
  //crimes
if (option2){
  var crimesNumber = crimesData.length;
  nearCrimes = [];
  for (var j = 0; j < crimesNumber; j++){
    var theDistance = distancemapped(pointLat,pointLng,crimesData[j][2],crimesData[j][3]);
    if(theDistance<=1000){
      var location = new google.maps.LatLng(
        crimesData[j][2],crimesData[j][3]
      );
      nearCrimes.push(j);
    }
  }
}
if (option3){
  //fire stations
  nearFireStations = [];
  var geocoder = new google.maps.Geocoder();
  for (var j = 0; j < fireStationsData.length; j++)
  {
    geocoder.geocode( { 'address': fireStationsData[j][12]}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var theDistance = distancemapped(pointLat,pointLng,results[0].geometry.location.lat(),results[0].geometry.location.lng());
        if(theDistance<=3000){
          nearFireStations.push(j);
        }
      }
    });
  }

  //police stations
  nearPoliceStations = [];

  for (var j = 0; j < policeStationsData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,policeStationsData[j][0],policeStationsData[j][1]);
    if(theDistance<=3000){
      var location = new google.maps.LatLng(
        policeStationsData[j][0],policeStationsData[j][1]
      );


      nearPoliceStations.push(j);
    }
  }

  //clinics
  nearClinics = [];
  for (var j = 0; j < clinicsData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,clinicsData[j][0],clinicsData[j][1]);
    if(theDistance<=3000){
      var location = new google.maps.LatLng(
        clinicsData[j][0],clinicsData[j][1]
      );


      nearClinics.push(j);
    }
  }
}
if(option5){
  // Bici Icons
  nearBiciStations = [];
  for (var j = 0; j < biciStationsData.length; j++)
  {

    var theDistance = distancemapped(pointLat,pointLng,biciStationsData[j][0],biciStationsData[j][1]);
    if(theDistance<=1000){
      var location = new google.maps.LatLng(
        biciStationsData[j][0],biciStationsData[j][1]
      );


      nearBiciStations.push(j);
    }
  }
  //library Icons
  nearLibraries = [];
  for (var j = 0; j < librariesData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,librariesData[j][0],librariesData[j][1]);
    if(theDistance<=2000){
      var location = new google.maps.LatLng(
        librariesData[j][0],librariesData[j][1]
      );

      nearLibraries.push(j);
    }
  }
  //Parks Icons
  nearParks = [];
  for (var j = 0; j < parksData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,parksData[j][0],parksData[j][1]);
    if(theDistance<=1500){
      var location = new google.maps.LatLng(
        parksData[j][0],parksData[j][1]
      );

      nearParks.push(j);
    }
  }

  //produce carts Icons
  nearCarts=[];
  for (var j = 0; j < cartsData.length; j++)
  {
    var theDistance = distancemapped(pointLat,pointLng,cartsData[j][0],cartsData[j][1]);
    if(theDistance<=4000){
      var location = new google.maps.LatLng(
        cartsData[j][0],cartsData[j][1]
      );

      nearCarts.push(j);
    }
}

}
if(option4){
//nearest traffic zone
nearTraffic=[];
//console.log(trafficData);
var i =0;
var x = 1000;
while(i<trafficData.length){
  var theDistance = distancemapped(pointLat,pointLng,trafficData[i][0],trafficData[i][1]);
  //console.log(theDistance);
  if (theDistance<=x){
    nearTraffic.push(i);
    //console.log(nearTraffic);
    break;
    i+=1;
  }
  else if (i==(trafficData.length-1)){
    x+=1000;
    i=0;
  }
  else{
    i+=1;
  }
}
}
}
