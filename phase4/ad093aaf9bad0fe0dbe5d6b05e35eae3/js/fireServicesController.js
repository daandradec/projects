function getFireStations(summaryObj) {
    var markersFire = [];
    $.ajax({
        url: urlFireStations,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        $.each(json.data, function (i, fire) {
            var fireJson = {
                name: fire[8],
                address: fire[9],
                position: {
                    lat: Number(fire[14][1]),
                    lng: Number(fire[14][2])
                },
                distance: distanceMarkers(markerSelected.position.toJSON(), {
                    lat: Number(fire[14][1]),
                    lng: Number(fire[14][2])
                })
            };
            markersFire.push(fireJson);
        });
        setMarkerFire(markersFire, summaryObj);
    });
}

function getNearFire(markersFire, center) {
    var fireStation = null;
    var distance = 9e9;
    $.each(markersFire, function (i, fire) {
        if (distance > fire.distance) {
            fireStation = fire;
            distance = fire.distance;
        }
    });
    return fireStation;
}

function getNearbyFire(markersFire, center) {
    var fireStation = getNearFire(markersFire, center);
    var markers = [];
    $.each(markersFire, function (i, fire) {
        if (radiusFire >= fire.distance || fireStation.distance == fire.distance)
            markers.push(fire);
    });
    return markers;
}

function setMarkerFire(markersFire, summaryObj) {
    if (!summaryObj) {
        var mapFire = new google.maps.Map(document.getElementById("fireMapCanvas"), {
            zoom: 12,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        mapFire.setCenter(markerSelected.position);
        var center = new google.maps.Marker({
            position: markerSelected.position,
            icon: markerSelected.icon,
            map: mapFire,
            draggable: false,
            title: markerSelected.title
        });

        center.setMap(mapFire);
        var fireStations = getNearbyFire(markersFire, center);
        setFireMarkers(fireStations, mapFire);
        drawFireMarkers(fireStations);

    } else {
        summaryObj.fireStation = getNearFire(markersFire, markerSelected);
        setSummarryFire(summaryObj);
    }
}


function drawFireMarkers(fireStations) {
    var container = d3.select("#fireDiv")
        .append("div")
        .attr("id", "fireDivInformation")
        .attr("class", "infoDiv");

    container.selectAll("div")
        .data(fireStations)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return d.name.replace(/\s+/g, "");
        })
        .attr("class", "fireRow")
        .on("click", function (d) {
            selectFireMArker(d);
        })
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Name: </strong>" + d.name + "<br/>" +
                "<strong>Address :</strong>" + d.address + "<br/>" +
                "<strong>Distance: </strong>" + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
}

function setFireMarkers(fireStations, mapFire) {
    var positions = [markerSelected.position.toJSON()];
    $.each(fireStations, function (i, fire) {
        fire.marker = new google.maps.Marker({
            position: fire.position,
            icon: pinFire.img,
            map: mapFire,
            draggable: false,
            title: fire.name
        });
        fire.marker.addListener("click", function () {
            selectFireMArker(fire);
        });
        positions.push(fire.position);
    });
    var bounds = getBoundsOfList(positions);
    mapFire.fitBounds(bounds);
}

function selectFireMArker(fire) {
    fire.marker.map.panTo(fire.position);
    $("#fireDivInformation").animate({
        scrollTop: $("#" + fire.name.replace(/\s+/g, "")).prop("offsetTop")
    }, 500);
    $(".fireRow").removeClass("active");
    $("#" + fire.name.replace(/\s+/g, "")).toggleClass("active");
    animateMarker(fire.marker, 700)
}