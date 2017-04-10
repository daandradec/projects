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
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 13
  });
  //setMarkers(map);
}
function setMarkers(map) {
  /*var image = {
    url: 'a.png',
    scaledSize: new google.maps.Size(20, 20),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };*/
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < document.getElementById('rental').hlat.length; i++) {
    var lat = document.getElementById('rental').hlat[i];
    var lon = document.getElementById('rental').hlon[i];
    var marker = new google.maps.Marker({
      position: {lat: lat[1], lng: lon[2]},
      map: map,
      //icon: image, 
      shape: shape,
    });
  }
}

