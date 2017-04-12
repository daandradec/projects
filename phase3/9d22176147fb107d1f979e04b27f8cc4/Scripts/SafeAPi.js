function crimes(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>Description</th><th>Arrest</th><th>Domestic</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/3uz7-d32j.json",
      type: "GET",
      data: {
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          if(point.latitude != null){
			if(getDistanceFromLatLonInKm(41.8708,-87.6505,point.latitude,point.longitude) < 2.1){
				var newRow = '<tr><td>'+ point._primary_decsription + '</td><td>' + point.arrest + '</td><td>' + point.domestic+ '</td><td>'+point.latitude + '</td><td>' +point.longitude + '</td></tr>';
				tableHtml = tableHtml + newRow ;
				var location = new google.maps.LatLng(point.latitude, point.longitude);
				var marker = new google.maps.Marker({
					position: location,
					map: map
				});
			}
          }

        };
        tableHtml += '</tbody></div></div>';
        $("#Crimes2016").html(tableHtml);
    });
}
function police(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>Website</th><th>Phone</th><th>Address</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/9rg7-mz9y.json",
      type: "GET",
      data: {
        "$limit" : 10,
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          if(point.latitude != null){
            var newRow = '<tr><td>'+ point.website + '</td><td>' + point.phone + '</td><td>' + point.address+ '</td><td>'+point.latitude + '</td><td>' +point.longitude + '</td></tr>';
            tableHtml = tableHtml + newRow ;
            var location = new google.maps.LatLng(point.latitude, point.longitude);
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
          }

        };
        tableHtml += '</tbody></div></div>';
        $("#PoliceStation").html(tableHtml);
    });
}
function fire(){
  var tableHtml = '<div class="table-responsive"><table class="table"><thead><tr><th>Address</th><th>Name</th><th>Engine</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>';
  $.ajax({
      url: "https://data.cityofchicago.org/resource/b4bk-rjxe.json",
      type: "GET",
      data: {
        "$limit" : 10,
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          if(point.location.coordinates[1] != null){
            var newRow = '<tr><td>'+ point.address + '</td><td>' + point.name + '</td><td>' + point.engine+ '</td><td>'+point.location.coordinates[1] + '</td><td>' +point.location.coordinates[0] + '</td></tr>';
            tableHtml = tableHtml + newRow ;
          }
          var location = new google.maps.LatLng(point.location.coordinates[1], point.location.coordinates[0]);
          var marker = new google.maps.Marker({
              position: location,
              map: map
          });

        };
        tableHtml += '</tbody></div></div>';
        $("#FireStation").html(tableHtml);
    });
}
