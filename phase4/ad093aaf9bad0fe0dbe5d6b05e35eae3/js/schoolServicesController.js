function getPublicSchool(summaryObj) {
    var markersSchool = [];
    $.ajax({
        url: urlSchools,
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (i, school) {
            school.position = {
                lat: school.the_geom.coordinates[1],
                lng: school.the_geom.coordinates[0]
            };
            if (school.position) {
                school.distance = distanceMarkers(markerSelected.position.toJSON(), school.position);
                markersSchool.push(school);
            }
        });
        setMarkerSchool(markersSchool, summaryObj);
    });
}

function getNearSchool(markersSchool, center) {
    var schoolNear = null;
    var distance = 9e9;
    $.each(markersSchool, function (i, school) {
        if (distance > school.distance) {
            schoolNear = school;
            distance = school.distance;
        }
    });
    return schoolNear;
}

function getNearbySchool(markersSchool, center) {
    var schoolNear = getNearSchool(markersSchool, center);
    var markers = [];
    $.each(markersSchool, function (i, school) {
        if (radiusSchool >= school.distance || schoolNear.distance == school.distance)
            markers.push(school);
    });
    return markers;
}

function setMarkerSchool(markersSchool, summaryObj) {
    if (!summaryObj) {
        var mapSchool = new google.maps.Map(document.getElementById("schoolMapCanvas"), {
            zoom: 12,
            scaleControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
        });
        mapSchool.setCenter(markerSelected.position);
        var center = new google.maps.Marker({
            position: markerSelected.position,
            icon: markerSelected.icon,
            map: mapSchool,
            draggable: false,
            title: markerSelected.title
        });

        center.setMap(mapSchool);
        var publicSchool = getNearbySchool(markersSchool, center);
        setSchoolMarkers(publicSchool, mapSchool);
        drawSchoolMarkers(publicSchool);

    } else {
        summaryObj.schoolNear = getNearSchool(markersSchool, markerSelected);
        setSummarrySchool(summaryObj);
    }
}


function drawSchoolMarkers(publicSchool) {
    $("#schoolDivInformation").remove();
    var container = d3.select("#schoolDiv")
        .append("div")
        .attr("id", "schoolDivInformation")
        .attr("class", "infoDiv");

    container.selectAll("div")
        .data(publicSchool)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return "school_"+d.school_id;
        })
        .attr("class", "schoolRow")
        .on("click", function (d) {
            selectSchoolMArker(d);
        })
        .on("mouseover", function (d) {
            $(this).toggleClass("over");
        })
        .on("mouseout", function (d) {
            $(this).toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Name: </strong>" + d.school_nm + "<br/>" +
                "<strong>Address :</strong>" + d.sch_addr + "<br/>" +
                "<strong>Distance: </strong>" + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
}

function setSchoolMarkers(publicSchool, mapSchool) {
    var positions = [markerSelected.position.toJSON()];
    $.each(publicSchool, function (i, school) {
        school.marker = new google.maps.Marker({
            position: school.position,
            icon: pinSchool.img,
            map: mapSchool,
            draggable: false,
            title: school.school_nm
        });
        school.marker.addListener("click", function () {
            selectSchoolMArker(school);
        });
        positions.push(school.position);
    });
    var bounds = getBoundsOfList(positions);
    mapSchool.fitBounds(bounds);
}

function selectSchoolMArker(school) {
    school.marker.map.panTo(school.position);
    $("#schoolDivInformation").animate({
        scrollTop: $("#school_" + school.school_id).prop("offsetTop")
    }, 500);
    $(".schoolRow").removeClass("active");
    $("#school_" + school.school_id).toggleClass("active");
    animateMarker(school.marker, 700)
}