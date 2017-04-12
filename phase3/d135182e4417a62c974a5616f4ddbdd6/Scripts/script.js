function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("openbtn").style.visibility= "hidden";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("openbtn").style.visibility= "visible";
}


var map;
var marker;
var hlat=[];
var hlon=[];
var plat=[];
var plon=[];
var flat=[];
var flon=[];
var loc=[];
d3.csv("Data/Affordable_Rental_Housing_Developments.csv", function(myArrayOfObjects) {
    myArrayOfObjects.forEach(function(d)
    { 
    hlat.push(+d.Latitude);
    hlon.push(+d.Longitude);
    })
})
d3.csv("Data/Police_Stations.csv", function(myArrayOfObjects) {
    myArrayOfObjects.forEach(function(d)
    { 
    plat.push(+d.LATITUDE);
    plon.push(+d.LONGITUDE);
    })
})

d3.csv("Data/Fire_Stations.csv", function(myArrayOfObjects) {
    myArrayOfObjects.forEach(function(d)
    { 
    var a= d.LOCATION.split(",").reverse();
    var b= a[0].split(")",1);
    var c= a[1].split("(");
    var d= c[1];
    flat.push(+d);
    flon.push(+b);
    })
})
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 13
  });
  setMarkers(map);
  if(document.getElementById('pchk').checked)
  setPMarkers(map);
  if(document.getElementById('fchk').checked)
  setFMarkers(map);
}
function setMarkers(map) {
  var image = {
    url: 'Icons/apartment.png',
    scaledSize: new google.maps.Size(25, 25),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < hlat.length; i++) {
    var lat = hlat[i];
    var lon = hlon[i];
   /* var input = +(document.getElementById("myRange").value);
    var clat= 41.8708;
    var clon= -87.6505;
    var a= +lat;
    var b=+lon;*/
     var marker = new google.maps.Marker({
       position: {lat: lat, lng: lon},
       map: map,
       icon: image, 
       shape: shape,
     });
  }
}
function setPMarkers(map) {
  var image = {
    url: 'Icons/City-Police-Badge-icon.png',
    scaledSize: new google.maps.Size(25., 25),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < plat.length; i++) {
    var lat = plat[i];
    var lon = plon[i];
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lon},
      map: map,
      icon: image, 
      shape: shape,
    });
  }
}
function setFMarkers(map) {
  var image = {
    url: 'Icons/fire-department-icon-16458.png',
    scaledSize: new google.maps.Size(25., 25),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < flat.length; i++) {
    var lat = flat[i];
    var lon = flon[i];
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lon},
      map: map,
      icon: image, 
      shape: shape,
    });
  }
}