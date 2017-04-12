var mapDiv,map,mainMarker;
var markers = [[],[],[],[],[],[]];
var directionsService,directionsDisplay;;

function initMap(){
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv,{
       center: {lat:41.8708 ,lng:-87.6505},
       zoom:10
    });
    var image_icon = '../img/blue-dot.png';
    mainMarker = new google.maps.Marker({
       position: {lat:41.8708 ,lng:-87.6505},
       map:map,
       tittle:'Purdue University',
       icon: image_icon
    });
}


