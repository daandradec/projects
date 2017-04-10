var latitude = 40.4237;
var longitude = -86.9212;

function initMap()
{
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
            center: {lat: latitude, lng: longitude},
            zoom: 12});
    var marker = new google.maps.Marker({ 
            position: {lat: latitude, lng: longitude},
            map: map,
            title: 'Purdue University'
    });
}