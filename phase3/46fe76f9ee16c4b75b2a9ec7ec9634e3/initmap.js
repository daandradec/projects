  function initMap(){
          var mapDiv = document.getElementById('map'); //Line 1: Save reference to div element where map would be shown
          var map = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
            center: {lat: 40.4237, lng: -86.9212}, //This is Purdue University's Location
            zoom: 12});
	      }