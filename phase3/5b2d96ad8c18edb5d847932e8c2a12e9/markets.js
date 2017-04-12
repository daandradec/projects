 function init2(map) {
 	var image = './FarmersMarket.png';var LatLng0 = new google.maps.LatLng(40.461469, -86.915836);
	var market0 = new google.maps.Marker({position: LatLng0, map: map, icon: image});
	var contentString0 = '<div id="content0"><div id="siteNotice0"> </div> <h3>3.6 West Lafayette Farmers Market</h3> <div id="bodyContent0"> <p> 3065 N Salisbury St <a href="http://maps.google.com/maps?daddr=40.461469,+-86.915836+(3.6+West+Lafayette+Farmers+Market)&hl=en" target="_blank">directions</a><br><br></div></div>';
	var infowindow0 = new google.maps.InfoWindow({content: contentString0});
	google.maps.event.addListener(market0, 'click', function() {infowindow0.open(map, market0);});
	var LatLng1 = new google.maps.LatLng(40.4445, -86.9136);
	var market1 = new google.maps.Marker({position: LatLng1, map: map, icon: image});
	var contentString1 = '<div id="content1"><div id="siteNotice1"> </div> <h3>4.5 Sagamore West Farmers Market</h3> <div id="bodyContent1"> <p> Cumberland Park <a href="http://maps.google.com/maps?daddr=40.4445,+-86.9136+(4.5+Sagamore+West+Farmers+Market)&hl=en" target="_blank">directions</a><br><br></div></div>';
	var infowindow1 = new google.maps.InfoWindow({content: contentString1});
	google.maps.event.addListener(market1, 'click', function() {infowindow1.open(map, market1);});
	var LatLng2 = new google.maps.LatLng(40.425830, -86.914239);
	var market2 = new google.maps.Marker({position: LatLng2, map: map, icon: image});
	var contentString2 = '<div id="content2"><div id="siteNotice2"> </div> <h3>5.6 Purdue Farmers Market</h3> <div id="bodyContent2"> <p> Oval Dr <a href="http://maps.google.com/maps?daddr=40.425830,+-86.914239+(5.6+Purdue+Farmers+Market)&hl=en" target="_blank">directions</a><br><br></div></div>';
	var infowindow2 = new google.maps.InfoWindow({content: contentString2});
	google.maps.event.addListener(market2, 'click', function() {infowindow2.open(map, market2);});
	var LatLng3 = new google.maps.LatLng(40.417715, -86.891895);
	var market3 = new google.maps.Marker({position: LatLng3, map: map, icon: image});
	var contentString3 = '<div id="content3"><div id="siteNotice3"> </div> <h3>6.7 Historic Lafayette Farmers Market</h3> <div id="bodyContent3"> <p>  <a href="http://maps.google.com/maps?daddr=40.417715,+-86.891895+(6.7+Historic+Lafayette+Farmers+Market)&hl=en" target="_blank">directions</a><br><br></div></div>';
	var infowindow3 = new google.maps.InfoWindow({content: contentString3});
	google.maps.event.addListener(market3, 'click', function() {infowindow3.open(map, market3);});
}