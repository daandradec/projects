function addMarker(pinToSet, timeout) {
    var marker = new google.maps.Marker({
        position: pinToSet.position,
        icon: pinToSet.img,
        map: map,
        draggable: pinToSet.draggable,
        title: pinToSet.title
    });
    marker.setVisible(false);
    window.setTimeout(function () {
        marker.setVisible(true);
        marker.setAnimation(google.maps.Animation.DROP);
    }, timeout + 715);
    return marker;
}



function fromPixelToLatLng(pixel) {
    var scale = Math.pow(2, map.getZoom());
    var proj = map.getProjection();
    var bounds = map.getBounds();
    var nw = proj.fromLatLngToPoint(
        new google.maps.LatLng(
            bounds.getNorthEast().lat(),
            bounds.getSouthWest().lng()
        ));
    var point = new google.maps.Point();

    point.x = pixel.x / scale + nw.x;
    point.y = pixel.y / scale + nw.y;

    return proj.fromPointToLatLng(point);
}

function fromLatLngToPoint(position) {
    var scale = Math.pow(2, map.getZoom());
    var nw = new google.maps.LatLng(
        map.getBounds().getNorthEast().lat(),
        map.getBounds().getSouthWest().lng()
    );
    var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
    var worldCoordinate = map.getProjection().fromLatLngToPoint(position);
    var pixelOffset = new google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    );
    return pixelOffset;
}



function distanceMarkers(position1, position2) {
    var radians = function (angle) {
        return angle * Math.PI / 180;
    };

    var radius = 6371e3; // metres
    var Lat1Rad = radians(position1.lat);
    var Lat2Rad = radians(position2.lat);
    var dLatRad = radians(position2.lat - position1.lat);
    var dLonRad = radians(position2.lng - position1.lng);

    var a = Math.pow(Math.sin(dLatRad / 2), 2) + Math.cos(Lat1Rad) * Math.cos(Lat2Rad) * Math.pow(Math.sin(dLonRad / 2), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
}

function delayAnimation(pin1, pin2) {
    return distanceMarkers(pin1.position, pin2.position) * 0.5;
}

function setUser(userPin) {
    userMarker = addMarker(userPin, 0.01);
    setMarkerRightClick(userMarker);
    setMarkerDragStart(userMarker);
    setMarkerDrag(userMarker);
    setMarkerDragEnd(userMarker);
    //setMarkerMouseOver(userMarker, map);
    setMapDragStart(userMarker);
    setMapDragEnd(userMarker);
    setMarkerClick(userMarker);
    //setMarkerMouseOut(userMarker);
    map.panTo(userPin.position);
    markerSelected = userMarker;
}

function setOthers(pinReference) {
    setRentHouses();
}

function setMarkerDragStart(marker) {
    marker.addListener("dragstart", function () {
        userMove = marker.title == "user";
        openSide ? closeSideBarR() : null;
        closeContextMenu();
        closeInfoPopUp(1);
        toggleMarkerBlueIcon(markerSelected);
        markerSelected = userMarker;
    });
}

function setMarkerDrag(marker) {
    marker.addListener("drag", function () {
        setPanoramaMarker(userMarker, true);
    });
}

function setMarkerDragEnd(marker) {
    marker.addListener("dragend", function () {
        !openSide ? openSideBarR() : null;
        userMove = marker.title == "user";
        setPanoramaMarker(marker, true);
        translateCenter(marker.getPosition());
        pinUser.position = mar.getPosition();
    });
}

function setMarkerClick(marker) {
    marker.addListener("click", function () {
        selectMarker(marker);
        translateCenter(marker.getPosition());
        setTextPopUpInfo(marker);
        closeContextMenu(1);
        tabInfoClick("weatherTab");
        openSideAgain = true;
        openSideL ? closeSideBarL() : null;
    });
}

function selectMarker(marker) {
    toggleMarkerBlueIcon(markerSelected);
    toggleMarkerBlueIcon(marker);
    markerSelected = marker;
    userMove = marker.title == "user";
    showTabs(userMove);
}

function setMarkerRightClick(marker) {
    marker.addListener("rightclick", function () {
        closeContextMenu(1);
        closeInfoPopUp(1);
        alert("hello marker")
    });
}

function setMarkerMouseOver(marker) {
    marker.addListener("mouseover", function () {
        //setTextPopUpInfo(marker);
    });
}

function setMarkerMouseOut(marker) {
    marker.addListener("mouseout", function () {
        null;
    });
}

function toogleMarkerMinIcon(marker) {
    switch (marker.icon) {
        case pinUser.img:
            marker.setIcon(pinUser.img);
            break;
        case pinHouse.img:
            marker.setIcon(pinHouse.imgMin);
            break;
        case pinHouse.imgMin:
            marker.setIcon(pinHouse.img);
            break;
        case pinHouse.imgBlue:
            marker.setIcon(pinHouse.imgBlueMin);
            break;
        case pinHouse.imgBlueMin:
            marker.setIcon(pinHouse.imgBlue);
            break;
        default:
            marker.setIcon(pinOther.img);
            break;
    }
}

function toggleMarkerBlueIcon(marker) {
    switch (marker.icon) {
        case pinUser.img:
            marker.setIcon(pinUser.img);
            break;
        case pinHouse.img:
            marker.setIcon(pinHouse.imgBlue);
            break;
        case pinHouse.imgBlue:
            marker.setIcon(pinHouse.img);
            break;
        default:
            marker.setIcon(pinOther.img);
            break;
    }
}

function deleteMarker(marker) {
    marker.setMap(null);
    marker = null;
}

function deleteAllMarkers() {
    $.each(markers, function (i, house) {
        deleteMarker(house.marker);
    });
    markers = {};
}

function setMarkerBestOption(marker) {

    window.setTimeout(function () {
        setTextPopUpInfo(marker);
        selectMarker(marker);
        tabInfoClick("weatherTab");
        openSideAgain = true;
        openSideL ? closeSideBarL() : null;
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }, 3000);
    window.setTimeout(function () {
        marker.setAnimation(null);
    }, 10000);

}