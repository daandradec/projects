$(document).ready(function() {
  $.simpleWeather({
    location: 'Lafayette, IN',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<h2><i ' +weather.code+'></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li>';
  console.log(html);
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});

 function initMap() 
                {
                    var uluru = {lat: 40.4237054, lng: -86.92119459999998};
                    var map = new google.maps.Map(document.getElementById('map'), {
                      zoom: 11,
                      center: uluru
                    });
                    var marker = new google.maps.Marker({
                      position: uluru,
                      map: map
                    });
                  }