// 1 parks, 2 police stations
function getMarker(coordinates, dataset){
  var marker = new google.maps.Marker({
    position: coordinates
  });
  switch (dataset) {
    case 1:
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/tree.png')
      break;
    case 2:
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/police.png')
      break;
    case 3:
      //marker.setIcon('http://maps.google.com/mapfiles/ms/icons/house.png')
    break;
    default:
  }
  return marker
}


function printPoints(markers){
  for (var i = 0; i < markers.length; i++) {
    if(checkDistance(markers[i])){
    markers[i].setMap(map)
    }
  }
}

function removePoints(markers){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
}

function drawCircle(){
  cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat:uLocation[0],lng:uLocation[1]},
        radius: distance * 1000
      });
}


function myMap()
{
  console.log(uLocation[1])
  myCenter = new google.maps.LatLng(uLocation[0], uLocation[1]);
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
  drawCircle();
}
