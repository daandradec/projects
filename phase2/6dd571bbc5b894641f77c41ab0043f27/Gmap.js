var map;
var ILatLng = {lat: 41.8708, lng: -87.6505}; 

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(41.8708,-87.6505),
      mapTypeId: 'terrain'
    });
    
    var ImportantMarker = new google.maps.Marker({
                    position: {lat: 41.8708, lng: -87.6505},
                    map: map,
                    title: 'Department of Computer Science – University of Illinois' 
                });
//    
//    map.data.loadGeoJson('https://data.cityofchicago.org/api/geospatial/cauq-8yn6?method=export&format=GeoJSON');
    
    map.data.loadGeoJson('https://data.cityofchicago.org/api/geospatial/e9ef-hrzb?method=export&format=GeoJSON')
}
    