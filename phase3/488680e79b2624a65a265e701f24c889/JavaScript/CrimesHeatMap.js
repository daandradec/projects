var dataHeatMap = [];

function toggleHeatmap(map) {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function toggleHeatmapOff(map) {
  heatmap.setMap(null);
}
function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

 function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 50);
}

function getPoints(){
$.ajax({
    url: "https://data.cityofchicago.org/resource/3uz7-d32j.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
    }
  }).done(function(data) { 
  	for (var i = 0; i <= data.length; i++) {
    	if (data[i]){
      	var posicion = new google.maps.LatLng(data[i].latitude , data[i].longitude)
      	dataHeatMap.push(posicion);		
    	}
  	}
});	
};          
