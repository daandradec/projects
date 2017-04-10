function myMap() {
	var mapOptions = {
		center: new google.maps.LatLng(41.870800, -87.650500),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var marker = new google.maps.Marker({ //Line 1
		position: {lat: 41.870800, lng: -87.650500}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: 'Department of Computer Science,University of Illinois, Chicago' //Line 4: Title to be given
	})	
	var xmlhttp = new XMLHttpRequest();
    
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            for (var i = 0; i<100; i++) {
                marker = new google.maps.Marker({
  					position: {lat: Number( json.data[i][19]), lng: Number( json.data[i][20])},
   					map: map,
 					title: json.data[i][12]
				});
            }
        }
    }
}
