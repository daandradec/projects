var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 41.8708, lng: -87.6505},
		zoom: 12
	});
  //drawCrimeHeatmap(map);
}

function outputWeather(){
	// $.ajax({
	// 	url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=FIPS:17&startdate=2017-03-28&enddate=2017-03-28",
	// 	data: {		},
	// 	headers:{
	// 		"token": "TnBgHrjXALqxjlrCNKvegEmTerciFXxA"
	// 	}
	// }).done(function(data){
	// 	console.log(data);
	// });

	var xmlhttp = new XMLHttpRequest();
	var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=62ec5939eb80d80897f446085c12412d";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var json = JSON.parse(myArr);
	        //alert(JSON.parse(text).coord.lon);
	        //document.getElementById("id01").innerHTML = myArr;

	        document.getElementById("weather").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";
	    }
	}
}

function drawCrimeHeatmap(map){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
		type: "GET",
		data: {
			"$limit" : 1000,
			//don't fetch crimes with no location
			"$where" : "latitude > 0 AND date > '2016-01-10T12:00:00' ",
			//public token
			"$$app_token" : "bjp8KrRvAPtuf809u1UXnI0Z8"
		}
	}).done(function(data){
		var locations = [];
		//alert("Retrieved " + data.length + " records from dataset");
		for (var i = data.length - 1; i >= 0; i--) {
			var node = data[i];
			//console.log(node);
			var location = new google.maps.LatLng(Number(node.latitude),Number(node.longitude));
			locations.push(location);
			// var marker = new google.maps.Marker({
			// 	position: location,
			// 	map: map
			// });
		};
		console.log(locations);
		//heatmap creation
		var heatmap = new google.maps.visualization.HeatmapLayer({
			data: locations
		});
		heatmap.set('radius',25);
		heatmap.setMap(map);
	});
}
var rent;
var markers = [];
function drawRentMarkers(map){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
		type: "GET",
		data: {
			"$limit" : 1000,
			//don't fetch crimes with no location
			"$where" : "latitude > 0",
			//public token
			"$$app_token" : "bjp8KrRvAPtuf809u1UXnI0Z8"
		}
	}).done(function(data){
		rent = data;
		//alert("Retrieved " + data.length + " records from dataset");
		for (var i = data.length - 1; i >= 0; i--) {
			var node = data[i];
			node.community_price = priceInCommunity(node.community_area);
			//console.log(node);
			var location = new google.maps.LatLng(Number(node.latitude),Number(node.longitude));
			var marker = new google.maps.Marker({
				position: location,
				map: map,
				title: node.property_name,
				icon : "img/purdue-icon-bulb-ts.png"
			});
			markers.push(marker);
			createInfoMarker(marker,node);
		};
		// console.log(markers);
		// //heatmap creation
	 //    var heatmap = new google.maps.visualization.HeatmapLayer({
	 //      data: markers
	 //    });
	 //    heatmap.set('radius',40);
		// heatmap.setMap(map);
	});
}

var prev_infowindow;

function createInfoMarker(marker,node){
	var infowindow = new google.maps.InfoWindow({
		content: ""
	});
	google.maps.event.addListener(marker, 'click', function() {
		//close open window
		if( prev_infowindow ) {
			prev_infowindow.close();
		}
		prev_infowindow = infowindow;
		infowindow.setContent(node.property_name);
		infowindow.open(map, marker);
		document.getElementById("community-area").innerHTML = "<b>Community Area</b>: " + node.community_area + "</em>";
		document.getElementById("property-type").innerHTML = "<b>Property Type</b>: <em>" + node.property_type + "</em>";
		document.getElementById("address").innerHTML = "<b>Address</b>: <em>" + node.address  + "</em>";
		document.getElementById("phone-number").innerHTML = "<b>Phone Number</b>: <em>" + node.phone_number + "</a></em>";
		document.getElementById("management-company").innerHTML = "<b>Management Company</b>: <em>" + node.management_company + "</em>";
		document.getElementById("price").innerHTML = "<b>Approximated Price/Bedroom</b>: <em>USD$" + node.community_price + "</em>";

	});
}

function searchFunction(){
	var input = document.getElementById("searchInput").value.toLowerCase();
	for (var i = markers.length - 1; i >= 0; i--) {
		//If input is substring of a property name
		if(markers[i].getTitle().toLowerCase().indexOf(input)>=0){
			//pan to the first one that has the inputed string as substring of the property name
			var coordinates = markers[i].getPosition();
			map.panTo(coordinates)
			//simulate click on it
			var mev = {
				stop: null,
				latLng: coordinates
			}
			google.maps.event.trigger(markers[i], 'click', mev);

			break;
		}
	}
	return false;
}

function getZillowData(map){
	$.ajax({
		url: "http://campuapi.azurewebsites.net/Home/ZillowApi?url=GetSearchResults.htm?zws-id=X1-ZWz1fqj1l4k00b_4aijl$address=2114+Bigelow+Ave$citystatezip=Seattle%2C+WA",
		type: "GET",
		crossDomain: true,
		datatype: 'xml',
	}).done(function(data){
		console.log(data);
	});
}
function priceInCommunity(community_name){
	var hashmap = createPriceCommunityHashmap();
	return(hashmap[community_name]);
}
function createPriceCommunityHashmap(){
	//HASHMAP based on prices obtained from https://www.zumper.com/blog/2016/09/mapping-chicago-rent-prices-this-fall-september-2016/
	var hashmap = {};
	hashmap["Albany Park"] = 1025;
	hashmap["Andersonville"] = 1350;
	hashmap["Archer Heights"] = 700;
	hashmap["Armour Square"] = 900;
	hashmap["Ashburn"] = 850;
	hashmap["Auburn Gresham"] = 770;
	hashmap["Austin"] = 725;
	hashmap["Avalon Park"] = 675;
	hashmap["Avondale"] = 1150;
	hashmap["Belmont Cragin"] = 950;
	hashmap["Beverly"] = 725;
	hashmap["Boystown"] = 1550;
	hashmap["Bridgeport"] = 850;
	hashmap["Brighton Park"] = 715;
	hashmap["Bucktown"] = 1300;
	hashmap["Burnside"] = 700;
	hashmap["Calumet Heights"] = 750;
	hashmap["Chatham"] = 715;
	hashmap["Chicago Lawn"] = 775;
	hashmap["Chinatown"] = 900;
	hashmap["Clearing"] = 700;
	hashmap["Douglas"] = 1020;
	hashmap["Dunning"] = 950;
	hashmap["East Side"] = 600;
	hashmap["East Village"] = 1400;
	hashmap["Edgewater"] = 1100;
	hashmap["Edison Park"] = 1050;
	hashmap["Englewood"] = 710;
	hashmap["Fuller Park"] = 650;
	hashmap["Gage Park"] = 750;
	hashmap["Galewood"] = 1000;
	hashmap["Garfield Park"] = 760;
	hashmap["Garfield Ridge"] = 750;
	hashmap["Gold Coast"] = 1800;
	hashmap["Grand Boulevard"] = 900;
	hashmap["Grand Crossing"] = 750;
	hashmap["Greektown"] = 2050;
	hashmap["Hegewisch"] = 800;
	hashmap["Hermosa"] = 800;
	hashmap["Humboldt Park"] = 1050;
	hashmap["Hyde Park"] = 1120;
	hashmap["Irving Park"] = 1050;
	hashmap["Jefferson Park"] = 1050;
	hashmap["Kenwood"] = 1200;
	hashmap["Lincoln Park"] = 1600;
	hashmap["Lincoln Square"] = 1220;
	hashmap["Little Italy, UIC"] = 1500;
	hashmap["Little Village"] = 900;
	hashmap["Logan Square"] = 1270;
	hashmap["Loop"] = 2070;
	hashmap["Lower West Side"] = 1100;
	hashmap["Mckinley Park"] = 900;
	hashmap["Montclare"] = 900;
	hashmap["Morgan Park"] = 775;
	hashmap["Mount Greenwood"] = 750;
	hashmap["Near South Side"] = 1750;
	hashmap["Near North Side"] = 1750;
	hashmap["Near West Side"] = 1750;
	hashmap["New City"] = 1050;
	hashmap["North Center"] = 1350;
	hashmap["North Lawndale"] = 700;
	hashmap["North Park"] = 900;
	hashmap["Norwood Park"] = 975;
	hashmap["O'Hare"] = 950;
	hashmap["Oakland"] = 1220;
	hashmap["Old Town"] = 1750;
	hashmap["Portage Park"] = 925;
	hashmap["Printers Row"] = 2070;
	hashmap["Pullman"] = 750;
	hashmap["River North"] = 2100;
	hashmap["Riverdale"] = 650;
	hashmap["Rogers Park"] = 1000;
	hashmap["Roseland"] = 740;
	hashmap["Rush &amp; Division"] = 1850;
	hashmap["Sauganash,Forest Glen"] = 990;
	hashmap["Sheffield &amp; DePaul"] = 1500;
	hashmap["South Chicago"] = 725;
	hashmap["South Deering"] = 600;
	hashmap["South Shore"] = 750;
	hashmap["Streeterville"] = 2060;
	hashmap["Ukrainian Village"] = 1450;
	hashmap["Uptown"] = 1250;
	hashmap["Washington Heights"] = 800;
	hashmap["Washington Park"] = 950;
	hashmap["West Elsdon"] = 700;
	hashmap["West Lawn"] = 725;
	hashmap["West Loop"] = 2100;
	hashmap["West Pullman"] = 700;
	hashmap["West Ridge"] = 990;
	hashmap["West Town"] = 1570;
	hashmap["Wicker Park"] = 1550;
	hashmap["Woodlawn"] = 750;
	hashmap["Wrigleyville"] = 1450;

	return hashmap;
}