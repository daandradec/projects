/**
Author: Gustavo Alejandro Sierra Mancera
This is the core js logic for adding markes and radarchart for Purdue 2017 Ironhacks
**/



//init the google map in the webpage
    function initMap(){
        var mapDiv = document.getElementById('map'); //Line 1: Save reference to div element where map would be shown
        var map = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
            center: {lat: 41.8708, lng: -87.6505}, //This is Department of Computer Science – University of Illinois, Chicago Location
            zoom: 12});
        /*var place = new google.maps.LatLng(41.8708, -87.6505);*/
        var marker = new google.maps.Marker({
					position: {lat: 41.8708, lng: -87.6505},
					map: map,//Line 3: Reference to map object
					title: 'University of Illinois, Chicago Location' //Line 4: Title to be given
				});
    }
