function loadParksData(){
    map.data.loadGeoJson('https://data.cityofchicago.org/api/geospatial/e9ef-hrzb?method=export&format=GeoJSON')
}

function loadHousesData() {
    var rentalMarkerBest;
    var minDistance = 10e6;
    var maxDistance = 0;
    var minUnits = 10e6;
    var maxUnits = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlRental, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, house) {
                var dataset = {
                    rental: house[1],
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
                    distance: distanceMovedMarkers({
                        lat: Number(house[19]),
                        lng: Number(house[20])
                    }, pinUser.position)
                };
                if (dataset.units > maxUnits) {
                    maxUnits = dataset.units;
                }
                if (dataset.distance > maxDistance) {
                    maxDistance = dataset.distance;
                }
                if (dataset.distance < radiusSearch && dataset.units < maxPrice) {
                    if (dataset.distance < minDistance && dataset.units < minUnits) {
                        rentalMarkerBest = dataset.rental;
                        minUnits = dataset.units;
                        minDistance = dataset.distance;
                    }
                    rentalPin.title = dataset.rental;
                    rentalPin.position = dataset.position;
                    markers[rentalPin.title] = {
                        marker: addMarker(rentalPin)
                    };
                }

            });
            }
        }
    };