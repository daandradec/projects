function dailyTraffic(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>Date</th><th>Street</th><th>Total Vehicle</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/u77m-8jgp.json",
      type: "GET",
      data: {
        "$limit" : 10,
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          if(point.latitude != null){
            var newRow = '<tr><td>'+ point.date_of_count + '</td><td>' + point.street + '</td><td>' + point.total_passing_vehicle_volume+ '</td><td>'+point.latitude + '</td><td>' +point.longitude + '</td></tr>';
            tableHtml = tableHtml + newRow ;
          }
          var location = new google.maps.LatLng(point.latitude, point.longitude);
          var marker = new google.maps.Marker({
              position: location,
              map: map
          });

        };
        tableHtml += '</tbody></div></div>';
        $("#AverageDailyTraffic").html(tableHtml);
    });
}
function divvyBicicly(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>Name</th><th>Address</th><th>Docks</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/aavc-b2wj.json",
      type: "GET",
      data: {
        "$limit" : 10,
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          if(point.latitude != null){
            var newRow = '<tr><td>'+ point.station_name + '</td><td>' + point.address + '</td><td>' + point.docks_in_service+ '</td><td>'+point.latitude + '</td><td>' +point.longitude + '</td></tr>';
            tableHtml = tableHtml + newRow ;
          }
          var location = new google.maps.LatLng(point.latitude, point.longitude);
          var marker = new google.maps.Marker({
              position: location,
              map: map
          });

        };
        tableHtml += '</tbody></div></div>';
        $("#DivvyBicicly").html(tableHtml);
    });
}