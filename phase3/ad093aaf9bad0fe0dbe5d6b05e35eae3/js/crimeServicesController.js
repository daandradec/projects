function setCrimeLayer() {
    var locations = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlCrime, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            $.each(json.data, function (i, crime) {
                locations.push(new google.maps.LatLng(Number(crime[17]), Number(crime[18])));
            });
            crimeLayer = new google.maps.visualization.HeatmapLayer({
                data: locations,
                map:map,
                radius:20
            });
        }
    };
}

function removeCrimeLayer() {
    crimeLayer.setMap(null);
    crimeLayer = null;
}