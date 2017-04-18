var map;
var ILatLng = {lat: 41.8708, lng: -87.6505}; 

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      rotateControl: true,
      center: new google.maps.LatLng(41.8708,-87.6505),
    });
    
    var ImportantMarker = new google.maps.Marker({
                    position: {lat: 41.8708, lng: -87.6505},
                    map: map,
                    title: 'Department of Computer Science – University of Illinois' 
                });
              }

