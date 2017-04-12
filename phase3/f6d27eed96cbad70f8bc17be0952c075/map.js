function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(41.870800, -87.650500),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({ 
        position: {lat: 41.870800, lng: -87.650500}, 
        map: map,
        title: 'Department of Computer Science,University of Illinois, Chicago' 
    })  
    
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    var markers = [];
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           
            var text = xmlhttp.responseText;
            
            var json = JSON.parse(text);
            
            for (var i = 0; i<json.data.length; i++) {
                marker = new google.maps.Marker({
                    position: {lat: Number( json.data[i][19]), lng: Number( json.data[i][20])},
                    map: map,
                    title: json.data[i][12]
                });
                markers.push(marker);
            }
            var markerCluster = new MarkerClusterer(map, markers,{imagePath:'m'});
            
        }
    } 

}