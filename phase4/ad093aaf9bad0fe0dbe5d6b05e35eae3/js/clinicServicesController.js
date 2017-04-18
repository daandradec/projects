function getClinics(summaryObj) {
    var markersClinic = [];
    $.ajax({
        url: urlClinicLocations,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        $.each(json.data, function (i, clinic) {
            var clinicJson = {
                name: clinic[8],
                type: clinic[9],
                hours_operation: clinic[11],
                address: clinic[12],
                phone_1: clinic[16],
                phone_2: clinic[17],
                phone_3: clinic[18],
                phone_4: clinic[19],
                phone_5: clinic[20],
                fax: clinic[21],
                position: {
                    lat: Number(clinic[27]),
                    lng: Number(clinic[28])
                },
                distance: distanceMarkers(markerSelected.position.toJSON(), {
                    lat: Number(clinic[27]),
                    lng: Number(clinic[28])
                })
            };
            markersClinic.push(clinicJson);

        });
        setMarkerClinic(markersClinic, summaryObj);
    });
}

function getNearClinic(markersClinic, center) {
    var ClinicStation = null;
    var distance = 9e9;
    $.each(markersClinic, function (i, Clinic) {
        if (distance > Clinic.distance) {
            ClinicStation = Clinic;
            distance = Clinic.distance;
        }
    });
    return ClinicStation;
}

function getNearbyClinic(markersClinic, center) {
    var Clinic = getNearClinic(markersClinic, center);
    var markers = [];
    $.each(markersClinic, function (i, clinic) {
        if (radiusClinic >= clinic.distance || clinic.distance == Clinic.distance)
            markers.push(clinic);
    });
    return markers;
}

function setMarkerClinic(markersClinic, summaryObj) {
    if (!summaryObj) {
        var mapClinic = new google.maps.Map(document.getElementById("clinicMapCanvas"), {
            zoom: 12,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        mapClinic.setCenter(markerSelected.position);
        var center = new google.maps.Marker({
            position: markerSelected.position,
            icon: markerSelected.icon,
            map: mapClinic,
            draggable: false,
            title: markerSelected.title
        });

        center.setMap(mapClinic);
        var clinic = getNearbyClinic(markersClinic, center);
        setClinicMarkers(clinic, mapClinic);
        drawClinicMarkers(clinic);

    } else {
        summaryObj.clinic = getNearClinic(markersClinic, markerSelected);
        setSummarryClinic(summaryObj);
    }
}


function drawClinicMarkers(clinic) {
    $("#clinicDivInformation").remove();
    var container = d3.select("#clinicDiv")
        .append("div")
        .attr("id", "clinicDivInformation")
        .attr("class", "infoDiv");

    container.selectAll("div")
        .data(clinic)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return d.name.replace(/\s+/g, "");
        })
        .attr("class", "clinicRow")
        .on("click", function (d) {
            selectClinicMarker(d);
        })
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Name: </strong>" + d.name + "<br/>" +
                "<strong>Type: </strong>" + d.type + "<br/>" +
                "<strong>Opened: </strong>" + d.hours_operation + "<br/>" +
                "<strong>Address :</strong>" + d.address + "<br/>" +
                (d.phone_1 ? "<strong>Phone: </strong>" + d.phone_1 + "<br/>" : "") +
                (d.phone_2 ? "<strong>Phone: </strong>" + d.phone_2 + "<br/>" : "") +
                (d.phone_3 ? "<strong>Phone: </strong>" + d.phone_3 + "<br/>" : "") +
                (d.phone_4 ? "<strong>Phone: </strong>" + d.phone_4 + "<br/>" : "") +
                (d.phone_5 ? "<strong>Phone: </strong>" + d.phone_5 + "<br/>" : "") +
                (d.fax ? "<strong>Fax: </strong>" + d.fax + "<br/>" : "") +
                "<strong>Distance: </strong>" + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
}

function setClinicMarkers(clinic, mapClinic) {
    var positions = [markerSelected.position.toJSON()];
    $.each(clinic, function (i, Clinic) {
        Clinic.marker = new google.maps.Marker({
            position: Clinic.position,
            icon: pinClinic.img,
            map: mapClinic,
            draggable: false,
            title: Clinic.name
        });
        Clinic.marker.addListener("click", function () {
            selectClinicMarker(Clinic);
        });
        positions.push(Clinic.position);
    });
    var bounds = getBoundsOfList(positions);
    mapClinic.fitBounds(bounds);
}

function selectClinicMarker(clinic) {
    clinic.marker.map.panTo(clinic.position);
    $("#clinicDivInformation").animate({
        scrollTop: $("#" + clinic.name.replace(/\s+/g, "")).prop("offsetTop")
    }, 500);
    $(".clinicRow").removeClass("active");
    $("#" + clinic.name.replace(/\s+/g, "")).toggleClass("active");
    animateMarker(clinic.marker, 700)
}