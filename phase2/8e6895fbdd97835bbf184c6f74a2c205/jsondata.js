/*jslint devel: true */
/*jslint white: true */
/*jslint JSON: true */
/*global $ */
/*global document */
/*global google */
/*global $ */
/*global JSON: true */

var map;
$(document).ready(function (){
    "use strict";
 $('#testing').click(function(){
       addCondomMark();
        alert("funciona!");
    }
    
    );
    $('.Condom').on('change',function(){addCondomMark();});
    $('.police').on('change',function(){addPoliceMark();});
       

});
// End of ready funtion

var dataPoliceStation =[];
var dataSchoolsStation =[];

function initPoliceStations(){
var data = {};
$.ajax({
url: 'https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json',
data: data,
dataType: 'json',
success: function(data) {
    for(var i=0;i<23;i++){
        dataPoliceStation.push([parseFloat(data.data[i][22][1]),parseFloat(data.data[i][22][2])]);
        //console.log(parseFloat(data.data[i][14][1])+'this is a test'+parseFloat(data.data[i][14][2]));
        //console.log(dataCondoms[i]  + '\n');

    }

}
});    
}
function initSchools(){
var data = {};
$.ajax({
url: 'https://data.cityofchicago.org/api/views/75e5-35kf',
data: data,
dataType: 'json',
success: function(data) {console.log(data);
}
});    
}

var dataCondoms=[];
function initcondoms(){
var data = {};
$.ajax({
url: 'https://data.cityofchicago.org/api/views/azpf-uc4s/rows.json',
data: data,
dataType: 'json',
success: function(data) {
    for(var i=0;i<177;i++){
        dataCondoms.push([parseFloat(data.data[i][14][1]),parseFloat(data.data[i][14][2])]);
        //console.log(parseFloat(data.data[i][14][1])+'this is a test'+parseFloat(data.data[i][14][2]));
        //console.log(dataCondoms[i]  + '\n');

    }

}
});
}
var map=null;

function addCondomMark(){
    for (var i in dataCondoms){
            var marker = new google.maps.Marker({ 
			position: {lat: dataCondoms[i][0], lng: dataCondoms[i][1]},
			map: map,
			title: 'condom store'
		});
        }
}

function addPoliceMark(){
    for (var i in dataPoliceStation){
            var marker = new google.maps.Marker({ 
			position: {lat: dataCondoms[i][0], lng: dataCondoms[i][1]},
			map: map,
			title: 'Police estation'
		});
        }
}
function initMap(){
		var mapDiv = document.getElementById('map');
		map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 12});
        /*
      */
    initcondoms();
    initSchools();
    initPoliceStations();
	}
