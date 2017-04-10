function libraries(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>Teacher</th><th>Phone</th><th>Address</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/psqp-6rmg.json",
      type: "GET",
      data: {
        "$limit" : 10,
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          if(point.location.coordinates[1] != null){
            var newRow = '<tr><td>'+ point.teacher_in_the_library + '</td><td>' + point.phone + '</td><td>' + point.address+ '</td><td>'+point.location.coordinates[1] + '</td><td>' +point.location.coordinates[0] + '</td></tr>';
            tableHtml = tableHtml + newRow ;
          }
          var location = new google.maps.LatLng(point.location.coordinates[1], point.location.coordinates[0]);
          var marker = new google.maps.Marker({
              position: location,
              map: map
          });

        };
        tableHtml += '</tbody></div></div>';
        $("#Libraries").html(tableHtml);
    });
}
function Artworks(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>Artist</th><th>Owner</th><th>Name</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/pxyq-qhyd.json",
      type: "GET",
      data: {
        "$limit" : 10,
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          if(point.x_coord  != null){
            var newRow = '<tr><td>'+ point.artist + '</td><td>' + point.owner + '</td><td>' + point.name+ '</td><td>'+point.y_coord + '</td><td>' +point.x_coord  + '</td></tr>';
            tableHtml = tableHtml + newRow ;
          }
          var location = new google.maps.LatLng(point.y_coord , point.x_coord);
          var marker = new google.maps.Marker({
              position: location,
              map: map
          });

        };
        tableHtml += '</tbody></div></div>';
        $("#Artworks").html(tableHtml);
    });
}
function MoviesInPark(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>MovieName</th><th>MovieRating</th><th>Name</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/x7dh-taiu.json",
      type: "GET",
      data: {
        "$limit" : 100,
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];

          if(point.location_1 != null){
            var newRow = '<tr><td>'+ point.moviename + '</td><td>' + point.movierating + '</td><td>' + point.eventname+ '</td><td>'+point.location_1.coordinates[1] + '</td><td>' +point.location_1.coordinates[0]   + '</td></tr>';
            tableHtml = tableHtml + newRow ;
            var location = new google.maps.LatLng(point.location_1.coordinates[1]  , point.location_1.coordinates[0] );
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
          }


        };
        tableHtml += '</tbody></div></div>';
        $("#MovieInPark").html(tableHtml);
    });
}
