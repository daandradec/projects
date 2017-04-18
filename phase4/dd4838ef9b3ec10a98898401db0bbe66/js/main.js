function initMap(){


	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 41.8708, lng: -87.6505},
		zoom: 13});
	var marker = new google.maps.Marker({ //Line 1
		position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
		map: map,//Line 3: Reference to map object
		title: 'Purdue University' //Line 4: Title to be given
	})

  //Retrieve data from Climate Data Online - Doesn't work yet properly
  var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=CITY:US170006&datatypeid=H&startdate=2017-03-21&enddate=2017-03-22";
  var token = "BnInMCcqQZfCPlxeJjSkFfJKdsZpNWdu";
  $.ajax({ url: url , headers:{ token: token } })
    .done(function( data ) {
      var container = document.getElementById("prcp");
      var content = document.createTextNode(data.results[0].value)
      container.appendChild(content);
      console.log(data);
    });
  var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=CITY:US170006&datatypeid=TMAX&startdate=2017-03-21&enddate=2017-03-22";
  $.ajax({ url: url , headers:{ token: token } })
    .done(function( data ) {
      var container = document.getElementById("tmax");
      var content = document.createTextNode(((data.results[0].value - 32) *5/9).toFixed(2) )
      container.appendChild(content);
      console.log(data);
    });

//Retrieve data from data.cityofchicago.org
//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //get the text content from the page response
        var myArr = xmlhttp.responseText;
        var text = myArr;
        json = JSON.parse(text);
        console.log(json);

        var markersInfo = json.data;
        var marker, i;

        for (var i = markersInfo.length - 1; i >= 0; i--) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(markersInfo[i][19], markersInfo[i][20]),
            map: map,
            title: markersInfo[i][11]
          });
          with({ info: markersInfo[i] }){
            marker.addListener('click',function () {
            var div = document.getElementById("info-marker-container");
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            var node = document.createElement("h3");
            var name = document.createTextNode("Property details");
            node.appendChild(name);
            div.appendChild(node);
            var node = document.createElement("p");
            var name = document.createTextNode("Name: " + info[11]);
            node.appendChild(name);
            div.appendChild(node);
            var node = document.createElement("p");
            var adr = document.createTextNode("Address: " + info[12]);
            node.appendChild(adr);
            div.appendChild(node);
            var node = document.createElement("p");
            var type = document.createTextNode("Type: " + info[10]);
            node.appendChild(type);
            div.appendChild(node);

            });
          }

        }

      }
    }

}