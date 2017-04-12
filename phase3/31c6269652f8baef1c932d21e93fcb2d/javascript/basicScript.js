var map;
var  parkPoints = [];

function loadParks(obj){
  if($(obj).is(":checked")){
      if(parkPoints.length == 0){
      var url = "https://data.cityofchicago.org/api/views/ejsh-fztr/rows.json?accessType=DOWNLOAD"
      $.getJSON(url, function(result){
        $.each(result.data, function(i, x){
          if(x[12] < 1){
            var aux2 = getCoordinateFromAddress(x[10])
          }
        })
      });
    }else{
      for (var i = 0; i < parkPoints.length; i++) {
        parkPoints[i].setMap(map)
      }
    }
    }else{
      for (var i = 0; i < parkPoints.length; i++) {
        parkPoints[i].setMap(null)
      }
    }
}

//AIzaSyBa4EuIstiwuHUymZ-gykKt7Ge7L_MfcVM

function getCoordinateFromAddress(address){
  var latLong
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address="
  url = url + encodeURI(address) + ",chicago,il,&key=AIzaSyBa4EuIstiwuHUymZ-gykKt7Ge7L_MfcVM"
  $.getJSON(url, function(result){
      var aux = result.results[0].geometry.location;
      latLong = new google.maps.LatLng(aux.lat, aux.lng)
        printPoints(latLong);
    });
}

function printPoints(points){
  console.log(points.length)
  var marker = new google.maps.Marker({
    position: points,
  });
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
  parkPoints.push(marker);
  parkPoints.slice(-1)[0].setMap(map);
}

function myMap()
{
  myCenter=new google.maps.LatLng(41.8708, -87.6505);
  var mapOptions= {
    center:myCenter,
    zoom:12, scrollwheel: false, draggable: true,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);

  var marker = new google.maps.Marker({
    position: myCenter,
  });
  marker.setMap(map);
}
