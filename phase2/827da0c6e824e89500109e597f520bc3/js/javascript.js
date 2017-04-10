//Map Creation

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
    infowindow.setContent("Department of Computer Science – University of Illinois");
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

            //Assign marker for each place to rent
            for (var i = 0; i < coordinates.length; i++) {
                var marker = new google.maps.Marker({
                    position: coordinates[i],
                    map: map, title: 'place',
                    icon: houses
            })

            }
        }
    }
}





