//Map places
var map;

function initMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
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
}


function placesMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
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
                                    '<b>'+"Phone: "+'</b>'+this.tel);
                infoWindow.open(map, this);
            });

            }
        }
    }
}

// //Map libraries

function libraryMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
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


    //Dataset of libraries in the map
    //var map;
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
                json.data[i][18][2]));  //18-1 is the data of lat and 18-2 is data of lang
            };

            var library = {  //Image depicting libraries
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
                                    '<b>'+"Phone: "+'</b>'+this.tel);
                infoWindow.open(map, this);
            });

            }
        }
    }
}


// //Map Police Stations

function policeMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
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


    //Dataset of Police Stations in the map

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
                json.data[i][21]));  //20 is the data of lat and 21 is data of lang
            };

            var polices = {  //Image depicting police stations
                url: "images/police.png",
                scaledSize: new google.maps.Size(35, 35),
            };

            var infoWindow  = new google.maps.InfoWindow();
            //Assign marker for each police station
            for (var i = 0; i < stations.length; i++) {
                var marker = new google.maps.Marker({
                    position: stations[i],
                    map: map, 
                    title: json.data[i][9],
                    address : json.data[i][10],
                    tel: json.data[i][15][0],
                    url: json.data[i][14][0],
                    icon: polices
            })
            google.maps.event.addListener(marker, 'click', function(){ 
                infoWindow.setContent('<b>'+this.title+'</b>'+'</br>'+'</br>'+
                                    '<b>'+"Address: "+'</b>'+this.address+'</br>'+
                                    '<b>'+"Phone: "+'</b>'+this.tel+'</br>'+
                                    '<b>'+"URL: "+'</b>'+this.url);
                infoWindow.open(map, this);
            });

            }
        }
    }
}


// //Map Fire stations

function fireMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
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


    //Dataset of fire stations in the map
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            //Position fire stations through an array using the coordinates in the dataset
            var fire = [];
            for (var i = 0; i < 91; i++) {   // 92 is the number of fire stations in the dataset
                fire.push(new google.maps.LatLng(json.data[i][14][1], 
                json.data[i][14][2]));  //14-1 is the data of lat and 14-2 is data of lang
            };

            var fires = {  //Image depicting fire stations
                url: "images/fire.png",
                scaledSize: new google.maps.Size(35, 35),
            };

            var infoWindow  = new google.maps.InfoWindow();
            //Assign marker for each fire
            for (var i = 0; i < fire.length; i++) {
                var marker = new google.maps.Marker({
                    position: fire[i],
                    map: map, 
                    address : json.data[i][9],
                    zip: json.data[i][12],
                    icon: fires
            })
            google.maps.event.addListener(marker, 'click', function(){ 
                infoWindow.setContent('<b>'+"Fire Station"+'</b>'+'</br>'+'</br>'+
                                    '<b>'+"Address: "+'</b>'+this.address+'</br>'+
                                    '<b>'+"Zip: "+'</b>'+this.zip);
                infoWindow.open(map, this);
            });

            }
        }
    }
}

// function farmerMap() {
//     var mapDiv = document.getElementById('map');
//     map = new google.maps.Map(mapDiv, {
//         center: {lat: 41.8708, lng: -87.6505},   //starting location in Department of Computer Science – University of Illinois
//         zoom: 13});
//     var university = { //Image depicting University marker
//         url: "images/building.png",  
//         scaledSize: new google.maps.Size(70, 70),
//     };
//     var marker = new google.maps.Marker({
//         position: {lat: 41.8708, lng: -87.6505},
//         map: map,
//         icon: university,
//         title: 'Department of Computer Science – University of Illinois'
//     })
//     infowindow = new google.maps.InfoWindow({
//                content: ""
//     });
//     google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent('<b>'+"Department of Computer Science – University of Illinois"+'</b>');
//      infowindow.open(map, marker);
//     });


//     //Dataset of farmer markets in the map
//     var xmlhttp = new XMLHttpRequest();
//     var url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = function() {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             var myArr = xmlhttp.responseText;
//             var text = myArr;
//             var json = JSON.parse(text);

//             //Position farmer markets through an array using the coordinates in the dataset
//             var fire = [];
//             for (var i = 0; i < 91; i++) {   // 91 is the number of fire stations in the dataset
//                 fire.push(new google.maps.LatLng(json.data[i][14][2], 
//                 json.data[i][14][3]));  //18 is the data of lat and 19 is data of lang
//             };

//             var crimes = {  //Image depicting farmer markets
//                 url: "images/farmer.svg",
//                 scaledSize: new google.maps.Size(35, 35),
//             };

//             var infoWindow  = new google.maps.InfoWindow();
//             //Assign marker for each crime
//             for (var i = 0; i < farmer.length; i++) {
//                 var marker = new google.maps.Marker({
//                     position: farmer[i],
//                     map: map, 
//                     title: json.data[i][8],
//                     day: json.data[i][10],
//                     address : json.data[i][9],
//                     open: json.data[i][11],
//                     end: json.data[i][12],
//                     icon: crimes
//             })
//             google.maps.event.addListener(marker, 'click', function(){ 
//                 infoWindow.setContent('<b>'+this.title+'</b>'+'</br>'+'</br>'+
//                                     '<b>'+"Day: "+'</b>'+this.day+'</br>'+
//                                     '<b>'+"Address: "+'</b>'+this.address+'</br>'+
//                                     '<b>'+"Start Time: "+'</b>'+this.open+'</br>'+
//                                     '<b>'+"End Time: "+'</b>'+this.end);
//                 infoWindow.open(map, this);
//             });

//             }
//         }
//     }
// }


// //Map Crime

function crimeMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
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


    //Dataset of crime in the map
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/x2n5-8w5q/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            //Position crimes through an array using the coordinates in the dataset
            var crime = [];
            for (var i = 0; i < 500; i++) {   // show just 500 crimes of the dataset
                crime.push(new google.maps.LatLng(json.data[i][22], 
                json.data[i][23]));  //22 is the data of lat and 23 is data of lang
            };

            var crimes = {  //Image depicting crimes
                url: "images/crime2.png",
                scaledSize: new google.maps.Size(35, 35),
            };

            var infoWindow  = new google.maps.InfoWindow();
            //Assign marker for each crime
            for (var i = 0; i < crime.length; i++) {
                var marker = new google.maps.Marker({
                    position: crime[i],
                    map: map, 
                    title: json.data[i][12],
                    date: json.data[i][9],
                    address : json.data[i][10],
                    location: json.data[i][14],
                    icon: crimes
            })
            google.maps.event.addListener(marker, 'click', function(){ 
                infoWindow.setContent('<b>'+"Type: "+'</b>'+this.title+'</br>'+
                                    '<b>'+"Date: "+'</b>'+this.date+'</br>'+
                                    '<b>'+"Address: "+'</b>'+this.address+'</br>'+
                                    '<b>'+"Location: "+'</b>'+this.location);
                infoWindow.open(map, this);
            });

            }
        }
    }
}

function wait(){
    alert("Please wait a second");
}

// //Map Farmers Markets

function farmerMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
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


    //Dataset of farmer markets in the map
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            //Position farmer markets through an array using the coordinates in the dataset
            var farmer = [];
            for (var i = 0; i < 46; i++) {   // 46 is the number of farmer markets in the dataset
                farmer.push(new google.maps.LatLng(json.data[i][18], 
                json.data[i][19]));  //18 is the data of lat and 19 is data of lang
            };

            var crimes = {  //Image depicting farmer markets
                url: "images/farmer.svg",
                scaledSize: new google.maps.Size(35, 35),
            };

            var infoWindow  = new google.maps.InfoWindow();
            //Assign marker for each crime
            for (var i = 0; i < farmer.length; i++) {
                var marker = new google.maps.Marker({
                    position: farmer[i],
                    map: map, 
                    title: json.data[i][8],
                    day: json.data[i][10],
                    address : json.data[i][9],
                    open: json.data[i][11],
                    end: json.data[i][12],
                    icon: crimes
            })
            google.maps.event.addListener(marker, 'click', function(){ 
                infoWindow.setContent('<b>'+this.title+'</b>'+'</br>'+'</br>'+
                                    '<b>'+"Day: "+'</b>'+this.day+'</br>'+
                                    '<b>'+"Address: "+'</b>'+this.address+'</br>'+
                                    '<b>'+"Start Time: "+'</b>'+this.open+'</br>'+
                                    '<b>'+"End Time: "+'</b>'+this.end);
                infoWindow.open(map, this);
            });

            }
        }
    }
}
