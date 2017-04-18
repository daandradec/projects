function getParks(summaryObj) {
    var markersPark = [];
    $.ajax({
        url: urlParks,
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (i, park) {
            park.location = park.location ? {
                lat: park.location.coordinates[1],
                lng: park.location.coordinates[0]
            } : getPositionByAddress(park.park_name.replace(/ /g, "+"));
            if (park.location) {
                park.distance = distanceMarkers(markerSelected.position.toJSON(), park.location);
                markersPark.push(park);
            }
        });
        setMarkerPark(markersPark, summaryObj);
    });
}

function getPositionByAddress(address) {
    var position;
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "+park+Chicago+IL" + "&key=AIzaSyBCTSN0E8WkgDKCMSnySX9w0psxkJB4aFE",
        type: "GET",
        dataType: "json",
        async: false
    }).done(function (data) {
        if (data.result == "OK")
            position = data.results[0].geometry.location;
    });
    return position;
}

function getNearPark(markersPark, center) {
    var parkStation = null;
    var distance = 9e9;
    $.each(markersPark, function (i, park) {
        if (distance > park.distance) {
            parkStation = park;
            distance = park.distance;
        }
    });
    return parkStation;
}

function getNearbyPark(markersPark, center) {
    var Park = getNearPark(markersPark, center);
    var markers = [];
    $.each(markersPark, function (i, park) {
        if (radiusPark >= park.distance || Park.distance == park.distance)
            markers.push(park);
    });
    return markers;
}

function setMarkerPark(markersPark, summaryObj) {
    if (!summaryObj) {
        var mapPark = new google.maps.Map(document.getElementById("parkMapCanvas"), {
            zoom: 12,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        mapPark.setCenter(markerSelected.position);
        var center = new google.maps.Marker({
            position: markerSelected.position,
            icon: markerSelected.icon,
            map: mapPark,
            draggable: false,
            title: markerSelected.title
        });

        center.setMap(mapPark);
        var park = getNearbyPark(markersPark, center);
        setParkMarkers(park, mapPark);
        drawParkMarkers(park);

    } else {
        summaryObj.park = getNearPark(markersPark, markerSelected);
        setSummarryPark(summaryObj);
    }
}


function drawParkMarkers(park) {
    $("#parkDivInformation").remove();
    var container = d3.select("#parkDiv")
        .append("div")
        .attr("id", "parkDivInformation")
        .attr("class", "infoDiv");

    container.selectAll("div")
        .data(park)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return "park_" + d.park_number;
        })
        .attr("class", "parkRow")
        .on("click", function (d) {
            selectParkMarker(d);
        })
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Name: </strong>" + d.park_name + "<br/>" +
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

function setParkMarkers(park, mapPark) {
    var positions = [markerSelected.position.toJSON()];
    $.each(park, function (i, Park) {
        Park.marker = new google.maps.Marker({
            position: Park.location,
            icon: pinPark.img,
            map: mapPark,
            draggable: false,
            title: Park.park_name
        });
        Park.marker.addListener("click", function () {
            selectParkMarker(Park);
        });
        positions.push(Park.location);
    });
    var bounds = getBoundsOfList(positions);
    mapPark.fitBounds(bounds);
}

function selectParkMarker(park) {
    park.marker.map.panTo(park.location);
    $("#parkDivInformation").animate({
        scrollTop: $("#park_" +  park.park_number).prop("offsetTop")
    }, 500);
    $(".parkRow").removeClass("active");
    $("#park_" + park.park_number).toggleClass("active");
    animateMarker(park.marker, 700);
}