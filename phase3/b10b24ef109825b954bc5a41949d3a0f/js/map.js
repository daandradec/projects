String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {center: {lat: 41.8708, lng: -87.6505},zoom: 10});
    var infowindow = new google.maps.InfoWindow({content: ""});
       
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
