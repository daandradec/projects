function getfresh_num() 
	{
      var f = document.getElementById("freshness").value;
      document.getElementById("freshness-demo").innerHTML = f;
 	}

function getprice_num() 
	{
      var p = document.getElementById("price").value;
      document.getElementById("price-demo").innerHTML = p;
 	}
/*function initMap() 
	{
        var uluru = {lat: 40.428, lng: -86.904};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
       var kmzLayer = new google.maps.KmlLayer('stores.kmz');
		kmzLayer.setMap(map);
     }*/