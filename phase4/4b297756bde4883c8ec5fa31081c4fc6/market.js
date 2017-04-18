var map;
var Data = [];
var locations =[];

function initMapa() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708 , lng: -87.6505 },
    zoom: 13
	});	
	
 
  var marker = new google.maps.Marker({ 
			position: {lat: 41.8708, lng: -87.6505}, map: map, title: 'Illinois University' 
			
		})
		
	var xmlhttp = new XMLHttpRequest();
    
    var url = "https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);	
		
			for (var i = 0; i<44; i++) {
                var dataLine = [];
                    
				dataLine.push(json.data[i][18]);
                dataLine.push(json.data[i][19]);
                dataLine.push(json.data[i][8]);
                dataLine.push(json.data[i][9]);
                dataLine.push(json.data[i][10]);
                dataLine.push(json.data[i][11]);
                dataLine.push(json.data[i][12]);
                dataLine.push(json.data[i][13]);
                dataLine.push(json.data[i][14]);
                dataLine.push(json.data[i][15][0]);

                Data.push(dataLine);
						
    var markered = new google.maps.Marker({ 
		
			position: {lat: Number(dataLine[0]),lng: Number(dataLine[1])}, map:map
		
			
			
		})
            };
			var totalMarkets = Data.length;
			var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();
            
            var locations = [];
            for (var i = 0; i < totalMarkets; i++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

		}
    };
	

		
		

}