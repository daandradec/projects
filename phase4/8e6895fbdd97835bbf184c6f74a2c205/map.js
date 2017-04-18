/*jslint devel: true */
/*jslint white: true */
/*jslint JSON: true */
/*global $ */
/*global document */
/*global google */
/*global $ */
/*global JSON: true */
/*global selHouse,initBikes, initcondoms, initPoliceStations, initParks */

$(document).ready(function (){
    "use strict";
   
});
var map=null;
function initMap(){
		var mapDiv = document.getElementById('map');
		map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 12});
    var marker = new google.maps.Marker({ 
        position: {lat: 41.790172, lng: -87.599170},
        map: map,
        icon: 'university.png',
        title: 'Computer Science',
        Zoom: 30
    });
    }


