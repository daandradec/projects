//Map places

function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 41.8708, lng: -87.6505},   //starting location in Department of Computer Science – University of Illinois
        zoom: 13});
    var university = { //Image depicting University marker
        url: "images/building.png",  
        scaledSize: new google.maps.Size(70, 70),
    };
    var marker = new google.maps.Marker({
        position: {lat: 41.8708, lng: -87.6505},
        map: map,
        icon: university,
        title: 'Department of Computer Science – University of Illinois'
    })
    infowindow = new google.maps.InfoWindow({
               content: ""
    });
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<b>'+"Department of Computer Science – University of Illinois"+'</b>');
     infowindow.open(map, marker);
    });


    //Dataset of places to rent in the map
    var map;
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            //Position places to rent through an array using the coordinates in the dataset
            var coordinates = [];
            for (var i = 0; i < 262; i++) {   //262 is the number of places to rent in the dataset
                coordinates.push(new google.maps.LatLng(json.data[i][19], 
                json.data[i][20]));  //19 is the data of lat and 20 is data of lang
            };

            var houses = {  //Image depicting places to rent
                url: "images/home1.png",
                scaledSize: new google.maps.Size(35, 35),
            };

            var infoWindow  = new google.maps.InfoWindow();
            //Assign marker for each place to rent
            for (var i = 0; i < coordinates.length; i++) {
                var marker = new google.maps.Marker({
                    position: coordinates[i],
                    map: map, 
                    title: json.data[i][11],
                    type: json.data[i][10],
                    address : json.data[i][12],
                    tel: json.data[i][14],
                    icon: houses
            })
            google.maps.event.addListener(marker, 'click', function(){ 
                infoWindow.setContent('<b>'+this.title+'</b>'+'</br>'+'</br>'+
                                    '<b>'+"Type: "+'</b>'+this.type+'</br>'+
                                    '<b>'+"Address: "+'</b>'+this.address+'</br>'+
                                    '<b>'+"Tel: "+'</b>'+this.tel);
                infoWindow.open(map, this);
            });

            }
        }
    }
}

// //Map libraries

function libraryMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 41.8708, lng: -87.6505},   //starting location in Department of Computer Science – University of Illinois
        zoom: 13});
    var university = { //Image depicting University marker
        url: "images/building.png",  
        scaledSize: new google.maps.Size(70, 70),
    };
    var marker = new google.maps.Marker({
        position: {lat: 41.8708, lng: -87.6505},
        map: map,
        icon: university,
        title: 'Department of Computer Science – University of Illinois'
    })
    infowindow = new google.maps.InfoWindow({
               content: ""
    });
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<h4>'+"Department of Computer Science – University of Illinois"+'</h4>');
     infowindow.open(map, marker);
    });


    //Dataset of libraries in the map
    var map;
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            //Position libraries through an array using the coordinates in the dataset
            var libraries = [];
            for (var i = 0; i < 79; i++) {   //79 is the number of libraries in the dataset
                libraries.push(new google.maps.LatLng(json.data[i][18][1], 
                json.data[i][18][2]));  //19 is the data of lat and 20 is data of lang
            };

            var library = {  //Image depicting places to rent
                url: "images/library.png",
                scaledSize: new google.maps.Size(35, 35),
            };

            var infoWindow  = new google.maps.InfoWindow();
            //Assign marker for each library
            for (var i = 0; i < libraries.length; i++) {
                var marker = new google.maps.Marker({
                    position: libraries[i],
                    map: map, 
                    title: json.data[i][8],
                    address : json.data[i][12],
                    hours: json.data[i][9],
                    tel: json.data[i][16],
                    icon: library
            })
            google.maps.event.addListener(marker, 'click', function(){ 
                infoWindow.setContent('<b>'+this.title+'</b>'+'</br>'+'</br>'+
                                    '<b>'+"Address: "+'</b>'+this.address+'</br>'+
                                    '<b>'+"Hours Operation: "+'</b>'+this.hours+'</br>'+
                                    '<b>'+"Tel: "+'</b>'+this.tel);
                infoWindow.open(map, this);
            });

            }
        }
    }
}


// //Map Police Stations

function policeMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 41.8708, lng: -87.6505},   //starting location in Department of Computer Science – University of Illinois
        zoom: 13});
    var university = { //Image depicting University marker
        url: "images/building.png",  
        scaledSize: new google.maps.Size(70, 70),
    };
    var marker = new google.maps.Marker({
        position: {lat: 41.8708, lng: -87.6505},
        map: map,
        icon: university,
        title: 'Department of Computer Science – University of Illinois'
    })
    infowindow = new google.maps.InfoWindow({
               content: ""
    });
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<h4>'+"Department of Computer Science – University of Illinois"+'</h4>');
     infowindow.open(map, marker);
    });


    //Dataset of Police Stations in the map
    var map;
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            //Position police stations through an array using the coordinates in the dataset
            var stations = [];
            for (var i = 0; i < 22; i++) {   //22 is the number of stations in the dataset
                stations.push(new google.maps.LatLng(json.data[i][20], 
                json.data[i][21]));  //19 is the data of lat and 20 is data of lang
            };

            var library = {  //Image depicting places to rent
                url: "images/police.png",
                scaledSize: new google.maps.Size(35, 35),
            };

            var infoWindow  = new google.maps.InfoWindow();
            //Assign marker for each library
            for (var i = 0; i < stations.length; i++) {
                var marker = new google.maps.Marker({
                    position: stations[i],
                    map: map, 
                    title: json.data[i][9],
                    address : json.data[i][10],
                    tel: json.data[i][15][0],
                    url: json.data[i][14][0],
                    icon: library
            })
            google.maps.event.addListener(marker, 'click', function(){ 
                infoWindow.setContent('<b>'+this.title+'</b>'+'</br>'+'</br>'+
                                    '<b>'+"Address: "+'</b>'+this.address+'</br>'+
                                    '<b>'+"Tel: "+'</b>'+this.tel+'</br>'+
                                    '<b>'+"URL: "+'</b>'+this.url);
                infoWindow.open(map, this);
            });

            }
        }
    }
}
