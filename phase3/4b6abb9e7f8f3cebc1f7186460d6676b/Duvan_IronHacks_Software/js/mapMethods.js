function mapRoute(lat,lng) {
  var start = new google.maps.LatLng(mainMarker.getPosition().lat() ,mainMarker.getPosition().lng());
  var end = new google.maps.LatLng(lat ,lng);
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setMap(map);
        directionsDisplay.setDirections(result);
    } else {
      alert("couldn't get directions:" + status);
    }
  });
}
function updateMap(data,size,index){
    for(var i = 0;i < size;++i)
        addMarker(new google.maps.LatLng(parseFloat(data[i][0]),parseFloat(data[i][1])),index);
}
function hideMarkers(index){
    updateMarkers(null,markers[index]);
}
function showMarkers(index){
    updateMarkers(map,markers[index]);
}
function updateMarkers(map,markers){
    for(var i = 0;i < markers.length;++i)
        markers[i].setMap(map);
}
function addMarker(location,index) {
    var image_icon = '../img/blue-dot.png';
    switch(index){
        case 0:
            image_icon = '../img/group.png';
            break;
        case 1:
            image_icon = '../img/tennis.png';
            break;
        case 2:
            image_icon = '../img/market.png';
            break;
        case 3:
            image_icon = '../img/food.png';
            break;
        case 4:
            image_icon = '../img/station.png';
            break;
        case 5:
            image_icon = '../img/van.png';
            break;
    }
    marker = new google.maps.Marker({
        position: location,
        icon: image_icon,
        map: map
    });
    marker.addListener('click',function(){
        mapRoute(this.getPosition().lat(),this.getPosition().lng());
        //map.setZoom(6);
    });
    markers[index].push(marker);
}