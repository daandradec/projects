var markerClustererarray = [];

function objetcMarker(lat, lng, Description)
{
  this.lat = lat;
  this.lng = lng;
  this.Description = Description;
}


function DrawMarkers( markersList, image){

  markersList2 = [];

  console.log(markersList);

  var infoWin = new google.maps.InfoWindow();

  for(var i = 0 ; i < markersList.length; i++ ){


    var marker =  new google.maps.Marker({
      title: markersList[i].Description,
      map: map,
      position: {lat: Number(markersList[i].lat), lng: Number(markersList[i].lng)},
      icon: {

        url: image,
        labelOrigin: {x: 40, y:40},
        text: markersList[i].Description
      }

      });

      markersList2.push(marker);

    }

      var markerCluster = new MarkerClusterer(map, markersList2, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      markerClustererarray.push(markerclusterer);

 };
