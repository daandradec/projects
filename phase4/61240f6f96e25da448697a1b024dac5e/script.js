

var xmlhttp = new XMLHttpRequest();
var url = " https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var myArr = xmlhttp.responseText;
var text = myArr;
}
};
var json = JSON.parse(text);

map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 41.85081542, lng: -87.69123528},
   zoom: 12
});


infowindow = new google.maps.InfoWindow({
                       content: ""
                   });
google.maps.event.addListener(marker, 'click', function() {
   infowindow.setContent("Chicago City");
                       infowindow.open(map, marker);
                   });

$.each(results, function(key, value) {

   markers[key] = new google.maps.Marker({
       position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
       map: map,
   });
   google.maps.event.addListener(markers[key], 'click', function() {
       //if another window is open, close it
       if( prev_infowindow ) {
           prev_infowindow.close();
       }
