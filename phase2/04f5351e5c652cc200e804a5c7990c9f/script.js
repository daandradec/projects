
function initMap(){
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 13});
  var marker = new google.maps.Marker({
    position: {lat: 41.8708, lng: -87.6505}, // Location to be highlighted
    map: map, // Reference to map object
    title: 'University of Illinois, Chicago', // Title to be given
    icon: 'icons/UIC.png' // Icon for site
  })

  var xmlhttp = new XMLHttpRequest();
    //json from Affordable Rental Housing Developments
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //put places in the map
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get text content
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);

            //number of the markets
            var totalMarkers = json.data.length;

            //add markers on the map
            var marks = [];

            for(var i=0; i<totalMarkers; i++){
              var lat_lon = "";
              lat_lon = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
              var n = new google.maps.Marker({
                    position: lat_lon,
                    map: map,
                    title: "Property Name: " + json.data[i][11]
                  });
            }
        }
    }
}
