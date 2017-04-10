   function initMap() {
    
    var SW = new google.maps.LatLng(40.4237, -86.9212);
    var NE = new google.maps.LatLng(44.052234, -88.243685);
   var longitude = NE.lng() - SW.lng();
   var latitude = NE.lat() - SW.lat();

    var markers = [];

    var PurdueLocation = new google.maps.LatLng(40.4237, -86.9212); //Purdue's Location

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: PurdueLocation,
        label: 'Purdue University',
        map: map,
        title: 'Purdue University'
    });

    // Creating 10 random markers
    for (var i = 1; i < 10; i++) {

        var location = new google.maps.LatLng(SW.lat() + latitude * Math.random(), NE.lng() + longitude * Math.random());

        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        markers.push(marker);
    }
}   
initMap();