function getFood(summaryObj) {
    getFarmerMarket(summaryObj);
}

function getFarmerMarket(summaryObj) {
    var markersFarmerMarket = [];
    $.ajax({
        url: urlFarmersMarket,
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (i, farmerMarket) {
            farmerMarket.position = {
                lat: farmerMarket.map.coordinates[1],
                lng: farmerMarket.map.coordinates[0]
            };
            if (farmerMarket.position) {
                farmerMarket.distance = distanceMarkers(markerSelected.position.toJSON(), farmerMarket.position);
                markersFarmerMarket.push(farmerMarket);
            }
        });
        setMarkerFarmerMarket(markersFarmerMarket, summaryObj);
    });
}


function getNearFarmerMarket(markersFarmerMarket, center) {
    var farmerMarketStation = null;
    var distance = 9e9;
    $.each(markersFarmerMarket, function (i, farmerMarket) {
        if (distance > farmerMarket.distance) {
            farmerMarketStation = farmerMarket;
            distance = farmerMarket.distance;
        }
    });
    return farmerMarketStation;
}

function getNearbyFarmerMarket(markersFarmerMarket, center) {
    var FarmerMarket = getNearFarmerMarket(markersFarmerMarket, center);
    var markers = [];
    $.each(markersFarmerMarket, function (i, farmerMarket) {
        if (radiusFarmerMarket >= farmerMarket.distance || FarmerMarket.distance == farmerMarket.distance)
            markers.push(farmerMarket);
    });
    return markers;
}

function setMarkerFarmerMarket(markersFarmerMarket, summaryObj) {
    if (!summaryObj) {
        var mapFood = new google.maps.Map(document.getElementById("foodMapCanvas"), {
            zoom: 12,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        mapFood.setCenter(markerSelected.position);
        var center = new google.maps.Marker({
            position: markerSelected.position,
            icon: markerSelected.icon,
            map: mapFood,
            draggable: false,
            title: markerSelected.title
        });

        center.setMap(mapFood);

        var farmerMarket = getNearbyFarmerMarket(markersFarmerMarket, center);
        var positionsFood = setFarmerMarketMarkers(farmerMarket, mapFood);
        var foodObj = {
            mapFood: mapFood,
            positions: positionsFood
        };
        drawFarmerMarketMarkers(farmerMarket, foodObj);

    } else {
        summaryObj.farmerMarket = getNearFarmerMarket(markersFarmerMarket, markerSelected);
        getGroceryStores(null, summaryObj);
    }
}


function setFarmerMarketMarkers(farmerMarket, mapFood) {
    var positions = [markerSelected.position.toJSON()];
    $.each(farmerMarket, function (i, FarmerMarket) {
        FarmerMarket.marker = new google.maps.Marker({
            position: FarmerMarket.position,
            icon: pinFarmerMarket.img,
            map: mapFood,
            draggable: false,
            title: FarmerMarket.location
        });
        FarmerMarket.marker.addListener("click", function () {
            selectFarmerMarketMarker(FarmerMarket);
        });
        positions.push(FarmerMarket.position);
    });
    return positions;
}

function drawFarmerMarketMarkers(farmerMarket, foodObj) {
    $("#foodDivInformation").remove();
    var container = d3.select("#foodDiv")
        .append("div")
        .attr("id", "foodDivInformation")
        .attr("class", "infoDiv");

    foodObj.container = container;

    container
        .style("width", "100%")
        .selectAll("div")
        .data(farmerMarket)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return d.location.replace(/ /g, "");
        })
        .attr("class", "farmerMarketRow")
        .on("click", function (d) {
            selectFarmerMarketMarker(d);
        })
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Name: </strong>" + d.location + "<br/>" +
                /*"<strong>Type: </strong>" + d.type + "<br/>" +
                "<strong>Opened: </strong>" + d.hours_operation + "<br/>" +
                "<strong>Address :</strong>" + d.address + "<br/>" +
                (d.phone_1 ? "<strong>Phone: </strong>" + d.phone_1 + "<br/>" : "") +
                (d.phone_2 ? "<strong>Phone: </strong>" + d.phone_2 + "<br/>" : "") +
                (d.phone_3 ? "<strong>Phone: </strong>" + d.phone_3 + "<br/>" : "") +
                (d.phone_4 ? "<strong>Phone: </strong>" + d.phone_4 + "<br/>" : "") +
                (d.phone_5 ? "<strong>Phone: </strong>" + d.phone_5 + "<br/>" : "") +
                (d.fax ? "<strong>Fax: </strong>" + d.fax + "<br/>" : "") +*/
                "<strong>Distance: </strong>" + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });

    getGroceryStores(foodObj);
}

function selectFarmerMarketMarker(farmerMarket) {
    farmerMarket.marker.map.panTo(farmerMarket.position);
    $("#foodDivInformation").animate({
        scrollTop: $("#" + farmerMarket.location.replace(/ /g, "")).prop("offsetTop")
    }, 500);
    $(".groceryStoresRow").removeClass("active");
    $(".farmerMarketRow").removeClass("active");
    $("#" + farmerMarket.location.replace(/ /g, "")).toggleClass("active");
    animateMarker(farmerMarket.marker, 700);
}


function getGroceryStores(foodObj, summaryObj) {
    var markersGroceryStores = [];
    $.ajax({
        url: urlGroceryStores,
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (i, GroceryStores) {
            GroceryStores.position = {
                lat: GroceryStores.location.coordinates[1],
                lng: GroceryStores.location.coordinates[0]
            };
            if (GroceryStores.position) {
                GroceryStores.distance = distanceMarkers(markerSelected.position.toJSON(), GroceryStores.position);
                markersGroceryStores.push(GroceryStores);
            }
        });
        setMarkerGroceryStores(markersGroceryStores, foodObj, summaryObj);
    });
}


function getNearGroceryStores(markersGroceryStores, center) {
    var groceryStore = null;
    var distance = 9e9;
    $.each(markersGroceryStores, function (i, GroceryStores) {
        if (distance > GroceryStores.distance) {
            groceryStore = GroceryStores;
            distance = GroceryStores.distance;
        }
    });
    return groceryStore;
}

function getNearbyGroceryStores(markersGroceryStores, center) {
    var GroceryStores = getNearGroceryStores(markersGroceryStores, center);
    var markers = [];
    $.each(markersGroceryStores, function (i, groceryStores) {
        if (radiusGroceryStores >= groceryStores.distance || groceryStores.distance == GroceryStores.distance)
            markers.push(groceryStores);
    });
    return markers;
}

function setMarkerGroceryStores(markersGroceryStores, foodObj, summaryObj) {
    if (!summaryObj) {
        var GroceryStores = getNearbyGroceryStores(markersGroceryStores, foodObj.positions[0]);
        setGroceryStoresMarkers(GroceryStores, foodObj);
        drawGroceryStoresMarkers(GroceryStores, foodObj);

    } else {
        summaryObj.GroceryStores = getNearGroceryStores(markersGroceryStores, markerSelected);
        setSummarryFood(summaryObj);
    }
}


function drawGroceryStoresMarkers(GroceryStores, foodObj) {
    var container = foodObj.container;
    container
        .style("width", "100%")
        .selectAll("div")
        .data(GroceryStores)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return "grocery_" + d.license_id;
        })
        .attr("class", "groceryStoresRow")
        .on("click", function (d) {
            selectGroceryStoresMarker(d);
        })
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Name: </strong>" + d.store_name + "<br/>" +
                /*"<strong>Type: </strong>" + d.type + "<br/>" +
                "<strong>Opened: </strong>" + d.hours_operation + "<br/>" +
                "<strong>Address :</strong>" + d.address + "<br/>" +
                (d.phone_1 ? "<strong>Phone: </strong>" + d.phone_1 + "<br/>" : "") +
                (d.phone_2 ? "<strong>Phone: </strong>" + d.phone_2 + "<br/>" : "") +
                (d.phone_3 ? "<strong>Phone: </strong>" + d.phone_3 + "<br/>" : "") +
                (d.phone_4 ? "<strong>Phone: </strong>" + d.phone_4 + "<br/>" : "") +
                (d.phone_5 ? "<strong>Phone: </strong>" + d.phone_5 + "<br/>" : "") +
                (d.fax ? "<strong>Fax: </strong>" + d.fax + "<br/>" : "") +*/
                "<strong>Distance: </strong>" + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
}

function setGroceryStoresMarkers(GroceryStores, foodObj) {
    $.each(GroceryStores, function (i, GroceryStores) {
        GroceryStores.marker = new google.maps.Marker({
            position: GroceryStores.position,
            icon: pinGroceryStores.img,
            map: foodObj.mapFood,
            draggable: false,
            title: GroceryStores.store_name
        });
        GroceryStores.marker.addListener("click", function () {
            selectGroceryStoresMarker(GroceryStores);
        });
        foodObj.positions.push(GroceryStores.position);
    });
    var bounds = getBoundsOfList(foodObj.positions);
    foodObj.mapFood.fitBounds(bounds);
}

function selectGroceryStoresMarker(GroceryStores) {
    GroceryStores.marker.map.panTo(GroceryStores.position);
    $("#foodDivInformation").animate({
        scrollTop: $("#grocery_" + GroceryStores.license_id).prop("offsetTop")
    }, 500);
    $(".groceryStoresRow").removeClass("active");
    $(".farmerMarketRow").removeClass("active");
    $("#grocery_" + GroceryStores.license_id).toggleClass("active");
    animateMarker(GroceryStores.marker, 700);
}