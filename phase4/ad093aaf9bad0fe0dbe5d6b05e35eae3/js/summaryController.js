function calculateRute(routeObj) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(summaryObj.map);
    directionsService.route(routeObj.request, function (response, status) {
        if (status === 'OK') {
            summaryObj.route ? summaryObj.route.setMap(null) : null;
            summaryObj.route = new google.maps.Polyline({
                path: response.routes[0].overview_path,
                geodesic: true,
                strokeColor: routeObj.strokeColor,
                strokeOpacity: 0.5,
                strokeWeight: 6
            });
            summaryObj.route.setMap(summaryObj.map);
            summaryObj.map.fitBounds(response.routes[0].bounds)
            summaryObj.route.addListener("mouseover", function () {
                //alert("hello");
            });
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function tabRouteClick(tabRouteId) {
    $(".tabRoutesItem").removeClass("active");
    var routeObj = {
        request: {
            origin: summaryObj.user.position,
            destination: summaryObj.house.position,
            travelMode: google.maps.TravelMode.DRIVING
        },
        strokeColor: "#00ff00",
    };
    switch (tabRouteId) {
        case "driveTab":
            routeObj.strokeColor = "#ff0000";
            routeObj.request.travelMode = google.maps.TravelMode.DRIVING;
            break;
        case "walkTab":
            routeObj.strokeColor = "#00ff00";
            routeObj.request.travelMode = google.maps.TravelMode.WALKING;
            break;
        case "bicycleTab":
            routeObj.strokeColor = "#0000ff";
            routeObj.request.travelMode = google.maps.TravelMode.BICYCLING;
            break;
        case "transitTab":
            routeObj.strokeColor = "#990099";
            routeObj.request.travelMode = google.maps.TravelMode.TRANSIT;
            break;
    }
    $("#" + tabRouteId + "Btn").toggleClass("active");
    calculateRute(routeObj);
}

function setSummary() {
    var houseSelected = markers[markerSelected.title].house;
    var house = new google.maps.Marker({
        position: markerSelected.position,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "red",
            fillOpacity: 0.5,
            strokeColor: 'white',
            strokeWeight: 0.5,
            scale: 10
        },
        draggable: false,
        title: markerSelected.title
    });
    var user = new google.maps.Marker({
        position: userMarker.position,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "green",
            fillOpacity: 0.5,
            strokeColor: 'white',
            strokeWeight: 0.5,
            scale: 10
        },
        draggable: false,
        title: userMarker.title
    });
    var summaryMap = new google.maps.Map(document.getElementById("summaryMapCanvas"), {
        zoom: 11,
        scaleControl: false,
        rotateControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
    });
    house.setMap(summaryMap);
    user.setMap(summaryMap);
    summaryMap.setCenter(getMiddlePoint({
        lat: house.position.lat.call(),
        lng: house.position.lng.call()
    }, {
        lat: user.position.lat.call(),
        lng: user.position.lng.call()
    }));
    summaryObj = {
        map: summaryMap,
        house: house,
        user: user,
        houseSelected: houseSelected,
        route: null
    };
    getPoliceStations(summaryObj);


}

function setSummarryPolice(summaryObj) {
    var markerPolice = new google.maps.Marker({
        position: summaryObj.policeStation.position,
        icon: pinPolice.imgMin,
        draggable: false,
        title: "Police Station: " + summaryObj.policeStation.name,
        map: summaryObj.map
    });

    getFireStations(summaryObj);
}

function setSummarryFire(summaryObj) {
    var markerFire = new google.maps.Marker({
        position: summaryObj.fireStation.position,
        icon: pinFire.imgMin,
        draggable: false,
        title: "Fire Station: " + summaryObj.fireStation.name,
        map: summaryObj.map
    });

    getClinics(summaryObj);
}

function setSummarryClinic(summaryObj) {
    var markerClinic = new google.maps.Marker({
        position: summaryObj.clinic.position,
        icon: pinClinic.imgMin,
        draggable: false,
        title: "Public Health Clinic: " + summaryObj.clinic.name,
        map: summaryObj.map
    });
    getParks(summaryObj);
}

function setSummarryPark(summaryObj) {
    var markerPark = new google.maps.Marker({
        position: summaryObj.park.location,
        icon: pinPark.imgMin,
        draggable: false,
        title: "Park: " + summaryObj.park.park_name,
        map: summaryObj.map
    });
    getFood(summaryObj);
}

function setSummarryFood(summaryObj) {
    var markerFarmerMarket = new google.maps.Marker({
        position: summaryObj.farmerMarket.position,
        icon: pinFarmerMarket.imgMin,
        draggable: false,
        title: "Farmer market: " + summaryObj.farmerMarket.location,
        map: summaryObj.map
    });

    var markerGroceryStore = new google.maps.Marker({
        position: summaryObj.GroceryStores.position,
        icon: pinGroceryStores.imgMin,
        draggable: false,
        title: "Grocery store: " + summaryObj.GroceryStores.store_name,
        map: summaryObj.map
    });
    getPublicSchool(summaryObj);
}

function setSummarrySchool(summaryObj) {
    var markerSchool = new google.maps.Marker({
        position: summaryObj.schoolNear.position,
        icon: pinSchool.imgMin,
        draggable: false,
        title: "Public school: " + summaryObj.schoolNear.school_nm,
        map: summaryObj.map
    });
    getLibraries(summaryObj);
}

function setSummarryLibrary(summaryObj) {
    var markerLibrary = new google.maps.Marker({
        position: summaryObj.libraryNear.position,
        icon: pinLibrary.imgMin,
        draggable: false,
        title: "Library: " + summaryObj.libraryNear.name_,
        map: summaryObj.map
    });
    drawSummarry(summaryObj);
}

function drawSummarry(summaryObj) {
    var positions = {
        user: summaryObj.user.position.toJSON(),
        house: summaryObj.house.position.toJSON(),
        GroceryStores: summaryObj.GroceryStores.position,
        clinic: summaryObj.clinic.position,
        farmerMarket: summaryObj.farmerMarket.position,
        fireStation: summaryObj.fireStation.position,
        libraryNear: summaryObj.libraryNear.position,
        park: summaryObj.park.location,
        policeStation: summaryObj.policeStation.position,
        schoolNear: summaryObj.schoolNear.position,
    };
    var bounds = getBoundsOfList(positions);
    tabRouteClick("walkTab");
    summaryObj.map.fitBounds(bounds);
    $("#summaryDivInformation").remove();
    var container = d3.select("#summaryDiv")
        .append("div")
        .attr("id", "summaryDivInformation")
        .attr("class", "infoDiv");

    var housing = container.append("div")
        .style("width", "100%");

    housing.selectAll("div")
        .data([summaryObj.houseSelected])
        .enter()
        .append("div")
        .attr("class", "houseRow")
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Propery name: </strong>" + d.propertyName + "<br/>" +
                "<strong>Propery type: </strong>" + d.propertyType + "<br/>" +
                "<strong>Adress: </strong>" + d.address + "<br/>" +
                "<strong>Phone: </strong>" + d.phoneNumber + "<br/>" +
                "<strong>Value: </strong> " + d.units + " units<br/>" +
                "<strong>Distance: </strong> " + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
}