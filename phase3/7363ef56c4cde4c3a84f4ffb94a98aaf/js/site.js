var map;
function initMap() {
    var marker1 = {lat: 41.8705, lng: -87.6487};
    var marker2 = {lat: 41.8723, lng: -87.6524};
    var marker3 = {lat: 41.8695, lng: -87.6503};
    var marker4 = {lat: 41.8712, lng: -87.6524};
    var marker5 = {lat: 41.8705, lng: -87.6511};


    map = new google.maps.Map(document.getElementById('map'), {
        center: marker1,
        zoom: 16
    });

    var marker1 = new google.maps.Marker({
          position: marker1,
          map: map,
          title: 'Event One'
        });
        var marker2 = new google.maps.Marker({
          position: marker2,
          map: map,
          title: 'Event Two'
        });
        var marker3 = new google.maps.Marker({
          position: marker3,
          map: map,
          title: 'Event Three'
        });
        var marker4 = new google.maps.Marker({
          position: marker4,
          map: map,
          title: 'Event Four'
        });
        var marker5 = new google.maps.Marker({
          position: marker5,
          map: map,
          title: 'Event Five'
        });

}

