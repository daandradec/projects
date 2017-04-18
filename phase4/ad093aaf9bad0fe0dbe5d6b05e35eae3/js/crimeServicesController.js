function setCrimeLayer() {
    var locations = [];
    $.ajax({
        url: urlCrime,
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (i, crime) {
            crime.location ? locations.push(new google.maps.LatLng(crime.location.coordinates[1], crime.location.coordinates[0])) : null;
        });
        crimeLayer = null;
        crimeLayer = new google.maps.visualization.HeatmapLayer({
            data: locations,
            map: map,
            radius: 20,
            opacity: 0.3,
            gradient: [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ],
        });
    });
    
}

function removeCrimeLayer() {
    crimeLayer ? crimeLayer.setMap(null) : null;
}