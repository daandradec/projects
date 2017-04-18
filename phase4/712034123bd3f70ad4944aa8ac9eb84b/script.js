// Code goes here
function initMap() {
    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.8708, lng: -87.6505},
        zoom: 15
    });


    var infowindow = new google.maps.InfoWindow({ content: "" });
    
    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function distance(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
  return Value * Math.PI / 180;
}

function dataDispSchools(url, table) {
  
  var lat = 41.8708;
  var lon = -87.6505;
  
  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rString = "<tr>";
      var xlat = x[17];
      var xlon = x[18];
      
      var d = distance(lat, lon, xlat, xlon)
      
      if (d <= 6.21371){
        rString += "<td>" + x[9] + "</td>"
        rString += "<td>" + x[12] + "</td>"
        rString += "<td>" + x[19] + "</td>"
      }
      rString += "</tr>"
      $(table).append(rString);
    });
  });
}


function dataDispLibraries(url, table) {
  
  var lat = 41.8708;
  var lon = -87.6505;
  

  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rString = "<tr>";
      var xlat = x[18][1];
      var xlon = x[18][2];
      
      var d = distance(lat, lon, xlat, xlon)
      
      if (d <= 6.21371){
        rString += "<td>" + x[8] + "</td>"
        rString += "<td>" + x[12] + "</td>"
        rString += "<td>" + x[16] + "</td>"
        rString += "<td>" + x[9] + "</td>"
      }
      rString += "</tr>"
      $(table).append(rString);
    });
  });
}

function dataDispFire(url, table) {
  
  var lat = 41.8708;
  var lon = -87.6505;
  

  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rString = "<tr>";
      var xlat = x[14][1];
      var xlon = x[14][2];
      
      var d = distance(lat, lon, xlat, xlon)
      
      if (d <= 6.21371){
        rString += "<td>" + x[10] + "</td>"
        rString += "<td>" + x[12] + "</td>"
      }
      rString += "</tr>"
      $(table).append(rString);
      console.log(x[14][0]["zip"]);
      
      
    });
  });
}

function dataDispHospitals(url, table) {
  
  var lat = 41.8708;
  var lon = -87.6505;
  

  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rString = "<tr>";
      var xlat = x[27];
      var xlon = x[28];
      console.log(x[27], x[28]);
      var d = distance(lat, lon, xlat, xlon)
      
      if (d <= 6.21371){
        rString += "<td>" + x[8] + "</td>"
        rString += "<td>" + x[9] + "</td>"
        rString += "<td>" + x[12] + "</td>"
        rString += "<td>" + x[18] + "</td>"
        rString += "<td>" + x[11] + "</td>"
      }
      rString += "</tr>"
      $(table).append(rString);
      
      
      
    });
  });
}


function parks() {
    document.getElementById("parks").classList.toggle('active');
}

function schools() {
    document.getElementById("schools").classList.toggle('active');
    document.getElementById("schools info").classList.toggle('hidden');
}

function services() {
    document.getElementById("services").classList.toggle('active');
    document.getElementById("services info").classList.toggle('hidden');
}
function police() {
    document.getElementById("police").classList.toggle('active');
    document.getElementById("police info").classList.toggle('hidden');
}
function crime() {
    document.getElementById("crime").classList.toggle('active');
}
