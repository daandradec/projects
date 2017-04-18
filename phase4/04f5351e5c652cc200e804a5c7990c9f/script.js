
var elevator;

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

  var infowindow = new google.maps.InfoWindow({
    content: ""
  });

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

            // var markers = [];
            // google.maps.event.addListener(map, 'idle', function() {
            // // Create an ElevationService
            // elevator = new google.maps.ElevationService();
            // $.each(markers, function(key, value)
            // {
            //     value.setMap(null);
            // });

            //add markers on the map
            var marks = [];

            for(var i=0; i<totalMarkers; i++){
              var lat_lon = "";
              lat_lon = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
              if (json.data[i][10] != "Senior" && json.data[i][10] != "Senior HUD 202")
                var mark = new google.maps.Marker({
                  position: lat_lon,
                  map: map,
                  title: "Property Name: " + json.data[i][11]
                    + "Address: " + json.data[i][12]
                    + "Phone Number: " + json.data[i][14]
                    + "Management Company: " + json.data[i][15]
                    + "Property Type: " + json.data[i][10],
                  icon: 'icons/green_home.png'
                });
                marks.push(mark);
            }
        }

        elevator.getElevationForLocations(positionalRequest, function(results, status){
          if (status === google.maps.ElevationStatus.OK){
            //if the infowindow is open
            var prev_infowindow =false;

            $.each(results, function(key, value) {

              //alert(key);
              markers[key] = new google.maps.Marker({
                  position: {lat: Number(json.data[key][19]), lng: Number(json.data[key][20])},
                  map: map,
                  //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
              });
              google.maps.event.addListener(markers[key], 'click', function() {
                //if another window is open, close it
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }
                infowindow.setContent(json.data[key][11]);
                infowindow.open(map, markers[key]);
                //set the menu information about the market
                document.getElementById("property-name").innerHTML = "<b>Property Name</b>: " + json.data[key][11] + "</em>";
                document.getElementById("property-type").innerHTML = "<b>Property Type</b>: " + json.data[key][10] + "</em>";
                document.getElementById("property-address").innerHTML = "<b>Address</b>: " + json.data[key][12] + "</em>";
                document.getElementById("property-phone").innerHTML = "<b>Phone Number</b>: <em>" + json.data[key][14] + "</em>";
                document.getElementById("property-company").innerHTML = "<b>Management Company</b>: <em>" + contain(json.data[key][15], day()).capitalizeFirstLetter() + "</em>";
              });
            });
          }
        });
    }
}
