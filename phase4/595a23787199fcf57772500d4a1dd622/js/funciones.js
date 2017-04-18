var map;

function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14});
  var marker = new google.maps.Marker({ //Line 1
    position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
    map: map,//Line 3: Reference to map object
    title: 'Departament of Electrical  Computer Engineering', //Line 4: Title to be given
    icon: 'img/avatar-de-graduado.png'
  })

    $( "#parks" ).click(function() {
      $.ajax({
            method: "GET",
            dataType: "json",
            url: "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json"

      }).done(function (result) {
        console.log(result);
        for (var i = 0; i < result["data"].length; i++) {
          var latitud = result["data"][i][13];
          var longitud = result["data"][i][12];
          var latLng = new google.maps.LatLng(latitud,longitud);
          var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: 'img/park.png'
                
                });
              
        }
      });
  });

}


  function openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

