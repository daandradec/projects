  var map;
  var markerClusterer;
  function initMap() {
    var myLatLng = {lat: 41.870800, lng: -87.650500};
    var darkMode = [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#39725c'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#3b5984'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ];

    var darkModeStyle = new google.maps.StyledMapType(darkMode,
      {name: "Dark Mode"});

    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 13,
      mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    });
    //markerClusterer = new MarkerClusterer(map);
    map.mapTypes.set('map_style', darkModeStyle);
    map.setMapTypeId('map_style');

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Department of Computer Science',
      label: {
        color: '#FFFFFF',
        fontSize: '8',
        text: 'Department of Computer Science'
      }
    });


    $.getJSON('JSON/houses.json', function(result) {
        var houseslist = [];

        for (var i = 0; i< result.data.length; i++)
        {
          var mark1 = new objetcMarker(result.data[i][19],result.data[i][20],result.data[i][12]);
          //console.log(mark1);
            houseslist.push(mark1);

            var infowindow = new google.maps.InfoWindow({
              content: "Jimmy"
            });

            marker.addListener('click', function() {
             infowindow.open(map, mark1);
           });
        }

        DrawMarkers(houseslist, "Images/Apartment-icon-2-map.png");

    });

  }
