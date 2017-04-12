var mapi;
function initMap(){
    var mapDiv = document.getElementById('map'); //Line 1: Save reference to div element where map would be shown
    mapi = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
        center: {lat: 41.870800, lng: -87.650500}, //This is UIC's Location
        zoom: 12});
    var marker = new google.maps.Marker({ //Line 1
        position: {lat: 41.870800, lng: -87.650500}, //Line2: Location to be highlighted
        map: mapi,//Line 3: Reference to map object
        title: 'Department of Electrical & Computer Engineering' //Line 4: Title to be given
    })
}

$(document).ready(function(){

	$("#initButton").click(function(){
        
        $.get("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD", function(json){
            console.log(json);
            //latutude
            //console.log(json.data[0][19]);
            //longitude
            //console.log(json.data[0][20]);
            $.each(json.data, function(d){
                var marker = new google.maps.Marker({ //Line 1
                    position: {lat: parseFloat(json.data[d][19]), lng: parseFloat(json.data[d][20])}, //Line2: Location to be highlighted
                    map: mapi,//Line 3: Reference to map object   
                })
            });
        });
	});
});