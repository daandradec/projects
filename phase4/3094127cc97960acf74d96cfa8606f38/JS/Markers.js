var markerClustererarray = [];
var markersList2 = [];


function objetcMarker(lat, lng, Description)
{
  this.lat = lat;
  this.lng = lng;
  this.Description = Description;
}


function DrawMarkers( markersList,image ,infoMarkersList, imprimir){

  //  markersList2 = markersList;
  //console.log(markersList);

  var infoWin = new google.maps.InfoWindow();

  for(var i = 0 ; i < markersList.length; i++ ){

    var infowindow = new google.maps.InfoWindow();
    var marker =  new google.maps.Marker({
      ZIndex: i,
      map: map,
      position: {lat: Number(markersList[i].lat), lng: Number(markersList[i].lng)},
      icon: {

        url: image,
        labelOrigin: {x: 40, y:40},
        text: markersList[i].Description
      }

      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
       return function () {
           console.log(infoMarkersList[i]);
           infowindow.open(map, marker);
           var f = eval(imprimir);
           $("#info").html(f);
       }
      })(marker, i));

      markersList2.push(marker);

    }

      var markerCluster = new MarkerClusterer(map, markersList2, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      markerClustererarray.push(markerClusterer);

 };
