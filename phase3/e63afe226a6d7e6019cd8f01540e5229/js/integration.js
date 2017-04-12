function initMap() {
  var uluru = {lat: 41.881832, lng: -87.623177};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

$( document ).ready(function() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
        type: "GET",
        data: {
        "$limit" : 5000,
        "$$app_token" : "38QlCrJQlR1gnwlFjIGImHIJR"
        }
    }).done(function(data) {
    alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
    });
});


