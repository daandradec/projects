function getPoliceStations(summaryObj) {
    var markersPolice = {};
    $.ajax({
        url: urlPoliceStations,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        $.each(json.data, function (i, police) {
            var policeJson = {
                name: police[9],
                address: police[10],
                url: police[14][0],
                phone: police[15][0],
                fax: police[16][0],
                tty: police[17][0],
                district: police[8],
                position: {
                    lat: Number(police[20]),
                    lng: Number(police[21])
                },
                distance: distanceMarkers(markerSelected.position.toJSON(), {
                    lat: Number(police[20]),
                    lng: Number(police[21])
                })
            };
            if (policeJson.district != "Headquarters") {
                markersPolice[policeJson.district] = policeJson;
            }

        });
        getPolygonPolice(markersPolice, summaryObj);
    });
}

function getPolygonPolice(markersPolice, summaryObj) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlPoliceBoundaries, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, district) {
                if (markersPolice[district[10]]) {
                    var polygon = [];
                    $.each(((district[8].slice(16, (district[8].length) - 3)).split(", ")), function (i, item) {
                        var algo = item.split(" ");
                        polygon.push({
                            lat: Number(algo[1]),
                            lng: Number(algo[0])
                        });
                    });
                    markersPolice[district[10]].polygon = polygon;
                }
            });
            setPolice(markersPolice, summaryObj);
        }
    };
}

function setPolice(markersPolice, summaryObj) {
    if (!summaryObj) {
        var mapPolice = new google.maps.Map(document.getElementById("policeMapCanvas"), {
            zoom: 12,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        mapPolice.setCenter(markerSelected.position);
        var center = new google.maps.Marker({
            position: markerSelected.position,
            icon: markerSelected.icon,
            map: mapPolice,
            draggable: false,
            title: markerSelected.title
        });

        center.setMap(mapPolice);
        animateMarker(center, 1400);
        mapPolice.addListener("click", function () {
            polygonPolice ?
                polygonPolice.setMap(null) : null;
            mapPolice.setCenter(center.position);
        });

        var policeStations = getNearbyPolice(markersPolice, center);
        setPoliceMarkers(mapPolice, policeStations, center);
        setListPoliceStations(policeStations, mapPolice, center);
    } else {
        summaryObj.policeStation = getNearPolice(markersPolice, markerSelected);
        setSummarryPolice(summaryObj);
    }
}

function getNearPolice(markersPolice, center) {
    var policeStation = null;
    $.each(markersPolice, function (i, police) {
        !policeStation ?
            policeStation = inPolygonPolice(police.polygon, center.position) ? police : null : null
    });
    return policeStation;
}

function getNearbyPolice(markersPolice, center) {
    var policeStation = getNearPolice(markersPolice, center);
    var markers = [];
    $.each(markersPolice, function (i, police) {
        if (radiusPolice >= police.distance || policeStation.distance == police.distance)
            markers.push(police);
    });
    return markers;
}

function setPoliceMarkers(mapPolice, policeArray, center) {
    var positions = [markerSelected.position.toJSON()];
    $.each(policeArray, function (i, police) {
        police.marker = new google.maps.Marker({
            position: police.position,
            icon: pinPolice.img,
            map: mapPolice,
            draggable: false,
            title: police.name
        });
        police.marker.addListener("click", function () {
            selectPoliceMarker(mapPolice, police, center);
        });
        positions.push(police.position);
    });
    var bounds = getBoundsOfList(positions);
    mapPolice.fitBounds(bounds);
}

function setListPoliceStations(policeArray, mapPolice, center) {
    var container = d3.select("#policeDiv")
        .append("div")
        .attr("id", "policeDivInformation")
        .attr("class", "infoDiv");
    container.selectAll("div")
        .data(policeArray)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return d.name.replace(/\s+/g, "");
        })
        .attr("class", "policeRow")
        .on("click", function (d) {
            selectPoliceMarker(mapPolice, d, center);
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
                "<strong>Web Page: </strong><a href='" + d.url + "' target='_blank'>Visit</a><br/>" +
                (d.phone ? "<strong>Phone: </strong>" + d.phone + "<br/>" : "") +
                (d.fax ? "<strong>Fax: </strong>" + d.fax + "<br/>" : "") +
                (d.tty ? "<strong>TTY: </strong>" + d.tty + "<br/>" : "") +
                "<strong>Distance: </strong>" + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
}

function setPolygonPolice(mapPolice, police, position) {
    polygonPolice ?
        polygonPolice.setMap(null) : null;
    polygonPolice = null;
    polygonPolice = new google.maps.Polygon({
        paths: police.polygon,
        strokeColor: '#003399',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: '#003399',
        fillOpacity: 0.15
    });
    if (!google.maps.geometry.poly.containsLocation(position, polygonPolice)) {
        polygonPolice.fillColor = '#FF0000';
    }
    polygonPolice.setMap(mapPolice);
}

function inPolygonPolice(polygon, position) {
    return google.maps.geometry.poly.containsLocation(position, new google.maps.Polygon({
        paths: polygon
    }));
}

function selectPoliceMarker(mapPolice, police, house) {
    $("#policeDivInformation").animate({
        scrollTop: ($("#" + police.name.replace(/\s+/g, "")).prop("offsetTop"))
    }, 500);
    $(".policeRow").removeClass("active");
    $("#" + police.name.replace(/\s+/g, "")).toggleClass("active");
    mapPolice.panTo(police.position);
    setPolygonPolice(mapPolice, police, house.position);
    animateMarker(house, 1400);
}