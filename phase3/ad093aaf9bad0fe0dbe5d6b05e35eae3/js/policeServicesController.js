function setPolice() {
    var markersPolice = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlPoliceStations, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, police) {
                var policeJson = {
                    name: police[9],
                    address: police[10],
                    url: police[14][0],
                    tel1: police[15][0],
                    tel2: police[16][0],
                    tel3: police[17][0],
                    position: {
                        lat: Number(police[20]),
                        lng: Number(police[21])
                    },
                    distance: distanceMarkers(markerSelected.position.toJSON(), {
                        lat: Number(police[20]),
                        lng: Number(police[21])
                    })
                };
                if (policeJson.distance <= radiusPolice) {
                    markersPolice.push(policeJson);
                }

            });
            setMarkerPolice(markersPolice);
        }
    };
}

function setMarkerPolice(markersPolice) {

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
    //toogleMarkerMinIcon(center);
    center.setMap(mapPolice);
    var container = d3.select("#policeDiv")
        .style("width", "100%")
        .style("height", "58%")
        .append("div")
        .attr("id", "policeDivInformation")
        .style("width", "100%")
        .style("height", "100%")
        .style("overflow", "auto");
    if (markersPolice.length)
        $.each(markersPolice, function (i, police) {
            police.marker = new google.maps.Marker({
                position: police.position,
                icon: pinPolice.img,
                map: mapPolice,
                draggable: false,
                title: police.name
            });
            police.marker.addListener("click", function () {
                $("#policeDivInformation").animate({
                    scrollTop: $("#" + police.name.replace(/\s+/g, "")).offset().top
                }, 500);
            });
        });
    else
        null;
    container.selectAll("div")
        .data(markersPolice)
        .enter()
        .append("div")
        .attr("id", function (d) {
            return d.name.replace(/\s+/g, "");
        })
        .style("width", "100%")
        .style("height", "20%")
        .style("border", "1px solid #fff")
        .on("click", function (d) {
            d.marker.map.panTo(d.position);
            d.marker.setAnimation(google.maps.Animation.BOUNCE);
            window.setTimeout(function () {
                d.marker.setAnimation(null);
            }, 700);
        });
}