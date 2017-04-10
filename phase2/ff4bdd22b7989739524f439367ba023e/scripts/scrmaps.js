//ZWSID
//X1-ZWz1fqgaxkx98r_2ca3z


function forprices(add){
  var xmlhttp = new XMLHttpRequest();
  var url = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=758+W+14th+Pl+APT+1A&citystatezip=Chicago+IL&rentzestimate";
  // xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
  // xmlhttp.setRequestHeader('Content-type', 'application/ecmascript');
  // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlhttp.open("GET", url, true);

  xmlhttp.onreadystatechange = function() {
    var markers=[];
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      console.log(text);
    }
  };
  xmlhttp.send();
  // var o;
  // o = d3.request("http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=758+W+14th+Pl+APT+1A&citystatezip=Chicago+IL&rentzestimate")
  //   //.header("Access-Control-Allow-Headers")
  //   //.header("Content-type", "application/ecmascript")
  //   .header("Access-Control-Allow-Origin")
  //   //.mimeType("application/xml")
  //   //.response(function(xhr) { return xhr.responseXML; })
  //   //.get(resultsHandler);
  //   ;
  //   console.log(o);
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
  } else {
        xhr = null;
  }
        return xhr;
}

$(document).ready(function(){
    //var xhr = createCORSRequest();
    // console.log($.support.cors);
	// $.ajax({
	// 	type:"GET",
    //     url: "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA",
    //     contentType: 'text/xml',
    //     xhrFields: {
    //         withCredentials: false
    //     },
    //     headers: {
    //         'Access-Control-Allow-Headers':'*',
    //         'Access-Control-Allow-Origin':'http://127.0.0.1',
    //     },
	// 	dataType: 'xml',
	// 	//jsonpCallback: 'resultsHandler',
    //
	// 	// complete: function(xmlResponse) {
	// 	//
	// 	// 	   // So you can see what was wrong...
	// 	// 	   console.log(xmlResponse);
	// 	// 	   console.log("Sepra");
	// 	// 	   console.log(xmlResponse.responseText);
	// 	//
	// 	// 	 $("#preForXMLResponse").text(xmlResponse.responseText);
	// 	// },
	// 	success: function( response ){
	// 		// parseXml(response);
    //         console.log(response);
    //     },
    //     error: function( error ){
    //         console.log( "ERROR:", error );
    //     }
    //
	// });
    $.ajax({
        type: 'GET',
        url: 'https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+W',
        contentType: 'text/plain',
        xhrFields: { ithCredentials: false },
        headers: {'Accept':'application/xml'},
        dataType: 'xml  ',
        success: function (data) {
            console.log(data);
        }
    });
    // $.ajax({
    //     url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
    //     type: "GET",
    //     data: {
    //         "$$app_token" : "YOURAPPTOKENHERE"
    //     },
    //     jsonpCallback: 'resultsHandler'
    // }).done(function(data) {
    //     alert("Retrieved " + data.length + " records from the dataset!");
    //     console.log(data);
    // });
});

function parseXml(xml) {
	var item = $(xml).find("result");
	$(item).each(function() {
		console.log(this);
		//Example: var Titles = $(this).find('Title').text();
	});
}

function resultsHandler(result){
	console.log(results);
}

var map;

function initMap(){
		var mapDiv = document.getElementById('map-canvas');
		map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 16
		});
		var marker = new google.maps.Marker({
			position: {lat: 41.8708, lng: -87.6505},
			map: map,
            icon: 'images/university.png',
			title: 'Purdue University'
		})
        $.getJSON("data/Affordable_Rental_Housing_Developments.txt", function(datajs) {
            $.each(datajs.data, function(key, data) {
                // console.log(data);
                var latLng = new google.maps.LatLng(data[19],data[20]);
                createMarker(latLng,data[11],data[12],'rentHouse',map)
            });
        });
        // console.log(markerGroups);
}

var customIcons = {
    'rentHouse': {
        icon: ''
    }
};

var markerGroups = {
    "rentHouse": [],
};

function createMarker(point, name, address, type, map) {
    var icon = customIcons[type] || {};
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon: icon.icon,
        // shadow: icon.shadow,
        type: type,
        title: name + "\n" + address
    });
    if (!markerGroups[type]) markerGroups[type] = [];
    markerGroups[type].push(marker);
    var html = "<b>" + name + "</b> <br/>" + address;
    return marker;
}

function toggleGroup(type) {
    for (var i = 0; i < markerGroups[type].length; i++) {
        var marker = markerGroups[type][i];
        if (!marker.getVisible()) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    }
}

// function map__SetZoom() {
//    map.setZoom( +this.value );
// }
//
