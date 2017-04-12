function setRentHouses() {
    var uuidMarkerBest;
    var minDistance = 10e6;
    var maxDistance = 0;
    var minUnits = 10e6;
    var maxUnits = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlARHD, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, house) {
                var info = {
                    uuid: house[1],
                    community_area: house[8],
                    community_area_number: house[9],
                    propertyType: house[10],
                    propertyName: house[11],
                    address: house[12],
                    zip_code: house[13],
                    phoneNumber: house[14],
                    management_company: house[15],
                    units: Number(house[16]),
                    position: {
                        lat: Number(house[19]),
                        lng: Number(house[20])
                    },
                    distance: distanceMarkers({
                        lat: Number(house[19]),
                        lng: Number(house[20])
                    }, pinUser.position)
                };
                if (info.units > maxUnits) {
                    maxUnits = info.units;
                }
                if (info.distance > maxDistance) {
                    maxDistance = info.distance;
                }
                if (info.distance < radiusSearch && info.units < maxPrice) {
                    if (info.distance < minDistance && info.units < minUnits) {
                        uuidMarkerBest = info.uuid;
                        minUnits = info.units;
                        minDistance = info.distance;
                    }
                    pinHouse.title = info.uuid;
                    pinHouse.position = info.position;
                    markers[pinHouse.title] = {
                        house: info,
                        marker: addMarker(pinHouse, delayAnimation(pinUser, pinHouse))
                    };
                    setMarkerMouseOver(markers[pinHouse.title].marker);
                    setMapDragStart(markers[pinHouse.title].marker);
                    setMapDragEnd(markers[pinHouse.title].marker);
                    setMarkerClick(markers[pinHouse.title].marker);
                    setMarkerRightClick(markers[pinHouse.title].marker);
                    setMarkerMouseOut(markers[pinHouse.title].marker);
                }

            });
            if (firstSet) {
                maxPrice = maxUnits;
                radiusSearch = maxDistance;
                setMaxPrice();
                setSliderDistance();
                firstSet = false;
            }
            setMarkerBestOption(markers[uuidMarkerBest].marker);
        }
    };
}