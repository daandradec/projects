function initMap() {
    var uluru = {lat: 41.881832, lng: -87.623177};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
    });

    pointArray = new google.maps.MVCArray(crimenData);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        map: map
    });
    
    var geocoder = new google.maps.Geocoder();
    
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        draggable: true  
    });
    
    // geocoder.geocode({'location': initialPos}, function(results, status) {
    //     if (status === 'OK') {
    //         if (results[0]) {
    //             document.getElementById("address").value = results[0].formatted_address;
    //         } else {
    //             document.getElementById("address").value ='No results found';
    //         }
    //     }
    // });
    
    // google.maps.event.addListener(marker, 'dragend', function(evt){
    //     var latlng = evt.latLng;
    //     geocoder.geocode({'location': latlng}, function(results, status) {
    //         if (status === 'OK') {
    //             if (results[0]) {
    //                 document.getElementById("address").value = results[0].formatted_address;
    //             } else {
    //                 document.getElementById("address").value ='No results found';
    //             }
    //         }
    //     });
    // });
    
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
            
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         marker.setPosition(pos);
    //         map.setZoom(16);
    //         map.setCenter(pos);
            
    //         geocoder.geocode({'location': pos}, function(results, status) {
    //             if (status === 'OK') {
    //                 if (results[0]) {
    //                     document.getElementById("address").value = results[0].formatted_address;
    //                 } else {
    //                     document.getElementById("address").value ='No results found';
    //                 }
    //             }
    //         });
    //     });
    // }
    google.maps.event.addDomListener(window, 'load', initMap);
}

