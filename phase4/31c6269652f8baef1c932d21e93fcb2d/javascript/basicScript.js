var distance = 5
var uLocation = [41.8708, -87.6505]

var map
var cityCircle
var parkPoints = []
var policeStations = []
var rentalPlaces = []



function loadParks(obj) {
    if ($(obj).is(":checked")) {
        if (parkPoints.length == 0) {
            var url = "https://data.cityofchicago.org/api/views/ejsh-fztr/rows.json?accessType=DOWNLOAD"
            $.getJSON(url, function(result) {
                $.each(result.data, function(i, x) {

                    if (x[12] > 5) {
                        getCoordinateFromAddress(x[10])
                    }

                })
            });
        } else {
            printPoints(parkPoints)
        }
    } else {
        removePoints(parkPoints)
    }
}


function loadPoliceStations(obj) {
    if ($(obj).is(":checked")) {
        if (policeStations.length == 0) {
            var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD"
            $.getJSON(url, function(result) {
                $.each(result.data, function(i, x) {
                    latLong = new google.maps.LatLng(x[20], x[21])
                    //console.log(latLong.lat(), latLong.lng)
                    policeStations.push(getMarker(latLong, 2));
                    //policeStations.slice(-1)[0].setMap(map)
                })
                printPoints(policeStations)
            });
        } else {
            printPoints(policeStations)
        }
    } else {
        removePoints(policeStations)
    }

}

function loadRentalPropieties(){
    if (rentalPlaces.length == 0) {
        var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD"
        $.getJSON(url, function(result) {
            $.each(result.data, function(i, x) {
                latLong = new google.maps.LatLng(x[19], x[20])
                console.log(latLong.lat(), latLong.lng)
                rentalPlaces.push(getMarker(latLong, 3));
                //policeStations.slice(-1)[0].setMap(map)
            })
            printPoints(rentalPlaces)
        });
    } else {
        printPoints(rentalPlaces)
    }
}


function loadClimate() {
    loadRentalPropieties()
    console.log("gola")
    url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=PRCP&locationid=CITY:US170006&startdate=2016-01-01&enddate=2017-12-31&limit=100"
    //url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes/TMIN"//?datasetid=GHCND&locationid=CITY:US170006&startdate=2017-03-03&enddate=2017-04-03"
    //url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?limit=1000"
    token = "SijxlnpadadUKFpGRosBqUEOldkLMjoo"
    $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("token", token);
        },
        dataType: "json",
        url: url,
        success: function(data) {
            console.log(data.results)
        }
    });
}


function changeRange(range) {
    distance = range.value * 0.1;
    cityCircle.setRadius(distance * 1000)
    reprintAll()
    console.log(distance)
}

function reprintAll() {
    removePoints(policeStations)
    removePoints(parkPoints)
    removePoints(rentalPlaces)
    printPoints(parkPoints)
    printPoints(policeStations)
    printPoints(rentalPlaces)
}

//AIzaSyBa4EuIstiwuHUymZ-gykKt7Ge7L_MfcVM

function getCoordinateFromAddress(address) {
    var latLong
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="
    url = url + encodeURI(address) + ",chicago,il,&key=AIzaSyBa4EuIstiwuHUymZ-gykKt7Ge7L_MfcVM"
    $.getJSON(url, function(result) {
        var aux = result.results[0].geometry.location;
        auxMarker = getMarker(new google.maps.LatLng(aux.lat, aux.lng), 1)
        parkPoints.push(auxMarker);
        if (checkDistance(auxMarker)) {
            parkPoints.slice(-1)[0].setMap(map)
        }
    });

}
