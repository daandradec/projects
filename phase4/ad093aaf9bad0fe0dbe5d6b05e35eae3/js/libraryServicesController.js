function getLibraries(summaryObj) {
    var markersLibrary = [];
    $.ajax({
        url: urlLibraries,
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (i, library) {
            library.position = {
                lat: library.location.coordinates[1],
                lng: library.location.coordinates[0]
            };
            if (library.position) {
                library.distance = distanceMarkers(markerSelected.position.toJSON(), library.position);
                markersLibrary.push(library);
            }
        });
        setMarkerLibrary(markersLibrary, summaryObj);
    });
}

function getNearLibrary(markersLibrary, center) {
    var libraryNear = null;
    var distance = 9e9;
    $.each(markersLibrary, function (i, library) {
        if (distance > library.distance) {
            libraryNear = library;
            distance = library.distance;
        }
    });
    return libraryNear;
}

function getNearbyLibrary(markersLibrary, center) {
    var libraryNear = getNearLibrary(markersLibrary, center);
    var markers = [];
    $.each(markersLibrary, function (i, library) {
        if (radiusLibrary >= library.distance || libraryNear.distance == library.distance)
            markers.push(library);
    });
    return markers;
}

function setMarkerLibrary(markersLibrary, summaryObj) {
    if (!summaryObj) {
        var mapLibrary = new google.maps.Map(document.getElementById("libraryMapCanvas"), {
            zoom: 12,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        mapLibrary.setCenter(markerSelected.position);
        var center = new google.maps.Marker({
            position: markerSelected.position,
            icon: markerSelected.icon,
            map: mapLibrary,
            draggable: false,
            title: markerSelected.title
        });

        center.setMap(mapLibrary);
        var libraries = getNearbyLibrary(markersLibrary, center);
        setLibraryMarkers(libraries, mapLibrary);
        drawLibraryMarkers(libraries);

    } else {
        summaryObj.libraryNear = getNearLibrary(markersLibrary, markerSelected);
        setSummarryLibrary(summaryObj);
    }
}


function drawLibraryMarkers(libraries) {
    $("#libraryDivInformation").remove();
    var container = d3.select("#libraryDiv")
        .append("div")
        .attr("id", "libraryDivInformation")
        .attr("class", "infoDiv");

    container.selectAll("div")
        .data(libraries)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return "library_"+d.name_.replace(/\s+/g, "");
        })
        .attr("class", "libraryRow")
        .on("click", function (d) {
            selectLibraryMArker(d);
        })
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Name: </strong>" + d.name_ + "<br/>" +
                "<strong>Address :</strong>" + d.address + "<br/>" +
                "<strong>Distance: </strong>" + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
}

function setLibraryMarkers(libraries, mapLibrary) {
    var positions = [markerSelected.position.toJSON()];
    $.each(libraries, function (i, library) {
        library.marker = new google.maps.Marker({
            position: library.position,
            icon: pinLibrary.img,
            map: mapLibrary,
            draggable: false,
            title: library.name_
        });
        library.marker.addListener("click", function () {
            selectLibraryMArker(library);
        });
        positions.push(library.position);
    });
    var bounds = getBoundsOfList(positions);
    mapLibrary.fitBounds(bounds);
}

function selectLibraryMArker(library) {
    library.marker.map.panTo(library.position);
    $("#libraryDivInformation").animate({
        scrollTop: $("#library_" + library.name_.replace(/\s+/g, "")).prop("offsetTop")
    }, 500);
    $(".libraryRow").removeClass("active");
    $("#library_" + library.name_.replace(/\s+/g, "")).toggleClass("active");
    animateMarker(library.marker, 700);
}