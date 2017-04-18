function initMap() {
    setMaxCrime();
    blockRightClick();
    showTabs(true);
    map = new google.maps.Map(document.getElementById("mapDiv"), {
        zoom: 13,
        scaleControl: true,
        rotateControl: true,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER,

        },
        streetViewControl: false,
    });
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("panoramaCanvas"), {
            pov: {
                zoom: 0,
                heading: 0,
                pitch: 0
            },
            zoomControl: true,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: true,
            visible: false
        });
    map.setCenter(getLocation(true));
    setMapRightClick();
    setMapClick();
    setMapZoomChange();
    setMapDoubleClick();
    openSideBarL();

}

function translateCenter(position) {
    map.panTo(position);
}

function setMapRightClick() {
    map.addListener("rightclick", function (event) {
        closeInfoPopUp(1);
        var positionXY = event.pixel;
        openContextMenu(positionXY);
    });
}

function getLocation(userSet) {
    var positionCenter = pinUser.position;
    if (autoLocation) {
        //Try autolocation
        if (navigator.geolocation) {
            // Browser support Geolocation
            navigator.geolocation.getCurrentPosition(function (position) {
                positionCenter.lat = position.coords.latitude;
                positionCenter.lng = position.coords.longitude;
                if (userSet) {
                    pinUser.position = positionCenter;
                    setOthers(crimeMaxTolerance * 1000);
                    setUser(pinUser);
                }
            });
        }
    } else {
        if (userSet) {
            pinUser.position = positionCenter;
            setOthers(crimeMaxTolerance * 1000);
            setUser(pinUser);
        }
    }
    return positionCenter;
}

function setPanoramaMarker(marker, visible) {
    if (visible) {
        panorama.setPov({
            zoom: 0,
            heading: 0,
            pitch: 0
        });
        panorama.setPosition(marker.getPosition());
        if (marker.title == "user") {
            panorama.addListener("position_changed", function () {
                userMove ? userMarker.setPosition(this.getPosition()) : null;
            });
        }

    }
    panorama.setVisible(visible);
}

function setMapDragStart(marker) {
    map.addListener("dragstart", function () {
        if (marker.icon != pinUser.img)
            toogleMarkerMinIcon(marker);
        marker.icon == pinUser.img ?
            marker.setAnimation(google.maps.Animation.BOUNCE) : marker.setAnimation(null);
        if (openSide) {
            openSideAgain = true;
            closeSideBarR();
        }
        closeContextMenu();
        closeInfoPopUp(1);
    });
}

function setMapDragEnd(marker) {
    map.addListener("dragend", function () {
        toogleMarkerMinIcon(marker);
        marker.setAnimation(null);
        if (openSideAgain) {
            openSideBarR();
        }
    });

}

function setMapDoubleClick() {
    map.addListener("dblclick", function () {
        closeInfoPopUp(1);
        unselectAllTabs();
        closeContextMenu();
    });
}

function setMapClick() {
    map.addListener("click", function (event) {
        mapClick();
        closeSideBarL();
    });
}

function mapClick() {
    closeInfoPopUp(1);
    openSideAgain = false;
    closeContextMenu();
    selectMarker(userMarker);
    openSide ? closeSideBarR() : null;
    unselectAllTabs();
    removeGraphWeather();
}

function setMapZoomChange() {
    map.addListener("zoom_changed", function () {
        openSideAgain = false;
        closeContextMenu();
        closeInfoPopUp();
        removeGraphWeather();
        unselectAllTabs();
        openSide ? closeSideBarR() : null;
    });
}


function getBoundsOfList(positions) {
    var bounds = {};
    bounds.north = 0;
    $.each(positions, function (key, position) {
        if (position.lat > bounds.north)
            bounds.north = position.lat;
    });
    bounds.south = 1e3;
    $.each(positions, function (key, position) {
        if (position.lat < bounds.south)
            bounds.south = position.lat;
    });
    bounds.east = -1e3;
    $.each(positions, function (key, position) {
        if (position.lng > bounds.east)
            bounds.east = position.lng;
    });
    bounds.west = 1e3;
    $.each(positions, function (key, position) {
        if (position.lng < bounds.west)
            bounds.west = position.lng;
    });
    return bounds;
}