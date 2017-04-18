var crimenData = [];
$( document ).ready(function() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
        type: "GET",
        data: {
        "$limit" : 5000,
        "$$app_token" : "38QlCrJQlR1gnwlFjIGImHIJR"
        }
    }).done(function(data) {
      
      $.each(data, function(index, el) {
        // index is your 0-based array index
        // el is your value
        if(typeof(el.latitude) !== 'undefined' && typeof(el.longitude) !== 'undefined'){
          crimenData.push(new google.maps.LatLng(el.latitude, el.longitude));
        }
        // for example
        //alert("element at " + index + ": " + el); // will alert each value
    });
    console.log(data);
  });
  
    function getPoints() {
      return points;
    }
});


