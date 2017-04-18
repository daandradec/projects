function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(41.870800, -87.650500),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
   
    var infowindow1 = new google.maps.InfoWindow({
        content: 'Department of Computer Science,University of Illinois, Chicago'+'<br>'+
                 'Address: 851 S Morgan St, Chicago, IL 60607, EE. UU.'+'<br>'+
                 'Phone Number: +1 312-996-3422'
    });

    var deparment = new google.maps.Marker({    
        icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        animation: google.maps.Animation.DROP,     
        position: {lat: 41.870800, lng: -87.650500}, 
        map: map,        
        title: 'Department of Computer Science,University of Illinois, Chicago' 
    });
    deparment.addListener('click', function() {
        infowindow1.open(map, deparment);
    });

    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    var markers = [];
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           
            var text = xmlhttp.responseText;
            
            var json = JSON.parse(text);
            var markersData = [];
            var address;
            var propertyType;                        
            var phoneNumber;
            for (var i = 0; i<json.data.length; i++) {
                address = json.data[i][12];  // save address of  
                propertyType = json.data[i][10];
                phoneNumber = json.data[i][14];
                var marker = new google.maps.Marker({
                    position: {lat: Number( json.data[i][19]), lng: Number( json.data[i][20])},
                    map: map,
                    title: address,
                    index: i                    
                });
                markersData[i] = 'Address: '+address+'<br>Property Type: '+propertyType+'<br>Phone Number: '+phoneNumber ; 
                markers.push(marker);
                
                var infowindow = new google.maps.InfoWindow({});
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent( markersData[this.index]) ;
                    infowindow.open(map,this); // click on marker opens info window 
                });
                
            }
            
            var markerCluster = new MarkerClusterer(map, markers,{imagePath:'m'});                   
        }
    }
}

 
