$(document).ready(function() {
    distance = parseInt($('#about').offset().top);
    
    $(window).scroll(function () {
        
        if ($(window).scrollTop() >= distance - 75) {
            $('#my-navbar > nav').addClass('teal'); 
        }
        else{
            $('#my-navbar > nav').removeClass('teal');
        }
        
    });
    
    rentData = [];
    
    $.ajax({
        url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
        type: "GET",
        data: {
          "$limit" : 100,
          "$$app_token" : "rj3tuA4Jdejb0dpDfLiTxIeWh"
        }
    }).done(function(data) {
      $('#rent-table').DataTable( {
        data: data,
        columns: [
            { data: 'address' },
            { data: 'phone_number' },
            { data: 'property_name' },
            { data: 'zip_code' }
        ],
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]]
    } );
    });
    
});

function initMap(){
	var mapDiv = document.getElementById('my-map'); 
	var map = new google.maps.Map(mapDiv, {center: {lat: 41.8708, lng: -87.6505}, zoom: 12});
	var marker = new google.maps.Marker({position: {lat: 41.8708, lng: -87.6505},map: map,title: 'UIC Chicago'});
}

