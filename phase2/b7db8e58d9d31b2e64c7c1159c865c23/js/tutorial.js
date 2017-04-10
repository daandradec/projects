var elevator;
var map;
// 2-level array for washed markets data
var washedData = [];


String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//init the google map in the webpage
function initMap() {

    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.85081542, lng: -87.69123528 },
        zoom: 12
    });

    //University marker 
    var pinColor = "0000FF";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    var pinColor2 = "00FF00";
    var pinImage2 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor2,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
    var pinShadow2 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    var lat_university = 41.8708;
    var lng_university = -87.6505;

    var marker = new google.maps.Marker({
        position: { lat: 41.8708, lng: -87.6505 },
        title: 'University',
        map: map,
        icon: pinImage,
        shadow: pinShadow
    });    

    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            var numberOfMarkets = json.data.length;

            var markers = [];

            for (var i = 0; i < numberOfMarkets; i++) {
                var latLng = "";

                latLng = JSON.parse('{ "lat":' + json.data[i][13] + ', "lng":' + json.data[i][12] + ' }');

                var n = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: 'Park',
                    icon: pinImage2,
                    shadow: pinShadow2
                });
            }
        }
    }

}

