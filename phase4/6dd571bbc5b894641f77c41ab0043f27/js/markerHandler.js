function loadDataInitial(pinReference) {
    loadHousesData();
}

function addMarker(markerAdd) {
    var marker = new google.maps.Marker({
        position: markerAdd.position,
        icon: markerAdd.img,
        map: map,
        title: markerAdd.title
    });
    marker.setVisible(true);
    return marker;
}

function deleteMarker(marker) {
    marker.setMap(null);
    marker = null;
}

function deleteAllMarkers() {
    $.each(markers, function (i, rental) {
        deleteMarker(rental.marker);
    });
    markers = {};
}


function distanceMovedMarkers(position1, position2) {
    var radians = function (angle) {
        return angle * Math.PI / 180;
    };

    var radius = 6371e3; // metres
    var firstLatRad = radians(position1.lat);
    var scndLatRad = radians(position2.lat);
    var dLatRad = radians(position2.lat - position1.lat);
    var divisor = 2
    var dLonRad = radians(position2.lng - position1.lng);

    var a = Math.pow(Math.sin(dLatRad / (divisor)), 2) + Math.cos(firstLatRad) * Math.cos(scndLatRad) * Math.pow(Math.sin(dLonRad / (divisor)), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
}


