//Request
var xhr_rent = new XMLHttpRequest();
	xhr_park = new XMLHttpRequest();
	xhr_pol = new XMLHttpRequest();
	xhr_lib = new XMLHttpRequest();
	xhr_cli = new XMLHttpRequest();
//Coordenate
var pur_coor = {	lat: 41.8708, lng: -87.6505	};
//Objects of criterion arrays
var markerCriterion = {
  "rental": [],
  "ent": [],
  "safe": [],
  "edu": [],
  "health":[]
};
	circleCriterion = {
  "ent": [],
  "safe": [],
  "edu": [],
  "health":[]
};
	dataCriterion = {
  "rental": [],
  "ent": [],
  "edu": [],
  "safe": [],
  "health":[]
};
	rangeCriterion = {
  "ent": 10,
  "edu": 10,
  "safe": 10,
  "health":10
};
// Data Arrays
var boundCriterion = [];
var circlePref = [];
// Images 
//Icon from http://www.iconarchive.com/
var url_purimg = 'http://www.cliparthut.com/clip-arts/490/purdue-university-490262.gif';
	url_parkimg = 'http://icons.iconarchive.com/icons/chrisl21/minecraft/256/3D-Tree-icon.png';
	url_rentimg='http://icons.iconarchive.com/icons/saki/nuoveXT/128/Home-2-icon.png';
	url_polimg='http://icons.iconarchive.com/icons/aha-soft/standard-transport/256/police-car-icon.png';
	url_libimg='http://icons.iconarchive.com/icons/hopstarter/book/256/Sketchpad-Book-icon.png';
	url_climg='http://icons.iconarchive.com/icons/icons-land/medical/256/People-Doctor-Female-icon.png';
// DATASETS
var url_rental = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
	url_park = "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD";
	url_pol = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
	url_lib = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
	url_cli = "https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD";
	url_clipre = "https://www.ncdc.noaa.gov/cag/time-series/us/11/USW00094846/pcp/all/01/2014-2016.json?base_prd=true&begbaseyear=2016&endbaseyear=2017";
//Map
var map;

// PERFOMANCE--UI
$(document).ready( function() {
	//MENU OPTIONS
	//Home 
	$('.nav-pills li a').click(function(e) {
        $('.nav li').removeClass('active');
        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) $parent.addClass('active');
        e.preventDefault();
    });
	//Button
	//Home
	$('.row').on('click', '#opt_home', function() {
		$('.section1').slideDown();
		$('.section2').slideUp();
		$('.section3').slideUp();
		$('.section4').slideUp();
		$('#map').show();
		$('#map').css( 'margin-left', '20%');
		$('#info').hide();
		$('#menu_preference').hide();
	});
	//Independent criterion
	$('.row').on('click', '#opt_cri', function() {
		$('.section2').slideDown();
		$('.section3').slideUp();
		$('.section4').slideUp();
		$('.section1').slideUp();
		$('.section2').css('margin', '3% 27% 3% 27%');
		
		$('#map').show();
		$('#map').css( 'margin-left', '2%');
		
		$('#info').show();
		$('#info').text("Click on the buttons above to see each criterion with respect to rental house");
		$('#info').append("<img src='http://icons.iconarchive.com/icons/saki/nuoveXT/128/Home-2-icon.png'>");
		
		$('#menu_preference').hide();
	});
	//Preference
	$('.row').on('click', '#opt_pre', function() {
		$('.section3').slideDown();
		$('.section1').slideUp();
		$('.section2').slideUp();
		$('.section4').slideUp();
		
		$('#map').show();
		$('#map').css( 'margin', '3% 2% 3% 2%');
		
		$('#info').show();
		$('#info').text("Move the bar for select the importance of each criterion and the circle for each rental house appear after click button load");
		$('#menu_preference').show();
	});
	//Weather
	$('.row').on('click', '#opt_wea', function() {
		$('.section4').slideDown();
		$('.section1').slideUp();
		$('.section2').slideUp();
		$('.section3').slideUp();
		$('#map').hide();
		$('#info').hide();
		$('#menu_preference').hide();
	});
	
	//CONTENT
	
	//Independent criterion
	//-price
	$(function() { $("#btn_pri").click( 
		function() 
		{ 
			$('#info').html( "<p> WORKING IN THIS SECTION </p>" );
			$('#info').append( " <p> Click </p>" );
			$('#info').append( " <p> Health, Safe </p>" );
			$('#info').append( " <p> Entertaiment, Education </p>" );
		})
	});
	//-distance
	$(function() { $("#btn_dis").click( 
		function() 
		{ 
			$('#info').html( "<p> WORKING IN THIS SECTION </p>" );
			$('#info').append( " <p> Click </p>" );
			$('#info').append( " <p> Health, Safe </p>" );
			$('#info').append( " <p> Entertaiment, Education </p>" );
		})
	});
	//enterteiment-park
	$(function() { $("#btn_ent").click( 
		function() 
		{ 
			var criterion = "ent"
			displayCriterion( criterion );
			$('#info').html( "<p>Click on the circle to see how many parks are around the rental house</p>" );
			$('#info').append( "<p> OR click on the marker to see the info about the park </p>" );
			$('#info').append("<img src='http://icons.iconarchive.com/icons/chrisl21/minecraft/256/3D-Tree-icon.png'>");
		})
	});
	//saf-police
	$(function() { $("#btn_saf").click( 
		function() 
		{ 
			var criterion = "safe"
			displayCriterion( criterion );
			$('#info').html( "<p>Click on the circle to see how many police station are around the rental house </p>" );
			$('#info').append( "<p> OR click on the marker to see the info about the police station </p>" );
			$('#info').append("<img src='http://icons.iconarchive.com/icons/aha-soft/standard-transport/256/police-car-icon.png'>");
		})
	});
	//clinic-health
	$(function() { $("#btn_health").click( 
		function() 
		{ 
			var criterion = "health"
			displayCriterion( criterion );
			$('#info').html( "<p>Click on the circle to see how many clinic station are around the rental house </p>" );
			$('#info').append( "<p> OR click on the marker to see the info about the clinic </p>" );
			$('#info').append("<img src='http://icons.iconarchive.com/icons/icons-land/medical/256/People-Doctor-Female-icon.png'>");
		})
	});
	//libraries -education
	$(function() { $("#btn_edu").click( 
		function() 
		{ 
			var criterion = "edu"
			displayCriterion( criterion );
			$('#info').html( "<p>Click on the circle to see how many libraries are around the rental house </p>" );
			$('#info').append( "<p> OR click on the marker to see the info about the library </p>" );
			$('#info').append("<img src='http://icons.iconarchive.com/icons/hopstarter/book/256/Sketchpad-Book-icon.png'>");
		})
	});

	//Preference search
	
	//load
	$(function() { $("#btn_load").click( 
		function() 
		{
			var ent_per = $('#ent_per').val() / 100;
			var safe_per = $('#safe_per').val() / 100;
			var health_per = $('#health_per').val() / 100;
			var edu_per = $('#edu_per').val() / 100;
			calculateSumPrefer( ent_per, safe_per, health_per, edu_per  );
		})
	});
	//display
	$(function() { $("#chb_show").click( 
		function() 
		{
			/*
			alert(circlePref.length);
			for (var i = 0; i < circlePref.length; i++) {
				var circle = circlePref[i];
				if (!circle.getVisible()) {
				  circle.setVisible(true);
				} else {
				  circle.setVisible(false);
				}
			}
			*/
		})
	});
	
	//Weather
	
	//Spring
	$(function() { $("#opt_spr").click( 
		function() 
		{ 
			
		})
	});
	//Summer
	$(function() { $("#opt_sum").click( 
		function() 
		{ 
			
		})
	});
	//Fall
	$(function() { $("#opt_fal").click( 
		function() 
		{ 
			
		})
	});
	//Winter
	$(function() { $("#opt_win").click( 
		function() 
		{ 
			
		})
	});
});

// RUNNING - ENGINE
function initMap()
{
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, {
		center: pur_coor,
		zoom: 13
	});  
	var pur_img = 
	{
		url: url_purimg,
		scaledSize: new google.maps.Size(50, 62)
	};
	var pur_marker = new google.maps.Marker({ 
		position: pur_coor,
		map: map,
		title: 'Purdue University',
		icon: pur_img
	});
	chargeRentalHouse();
}
function chargeRentalHouse()
{
	var criterion = "rental";
	var rent_img = 
	{
		url: url_rentimg,
		scaledSize: new google.maps.Size(30, 28)
	};
	
	xhr_rent.open("GET", url_rental, true);
    xhr_rent.send();
	
    xhr_rent.onreadystatechange = function() {
        if (xhr_rent.readyState == 4 && xhr_rent.status == 200) 
		{
            var myArr = xhr_rent.responseText;
            var text = myArr;
            json = JSON.parse(text);
			var numberOfRental = json.data.length;
            
			for (var i = 0; i < numberOfRental; i++) 
			{
                var dataLine = [];
				
				var lat = json.data[i][19];
				var lng = json.data[i][20];
				var latLng = new google.maps.LatLng( lat, lng );
				var name = json.data[i][11];
				var addr = json.data[i][12];
				
                //name - 		dataLine[0]
                dataLine.push( name );
                //street - 		dataLine[1]
                dataLine.push( addr );

                dataCriterion[criterion].push(dataLine);
				
				var marker = createMarker( latLng, rent_img, criterion, i );
				
				var ditance = 1;
				var bound = new google.maps.LatLngBounds(
					new google.maps.LatLng( lat - ditance, lng - ditance ),
					new google.maps.LatLng( lat + ditance, lng + ditance )
				);
				boundCriterion.push(bound);
            }; 
			chargeEntCriterion();
			chargeSafeCriterion();
			chargeEduCriterion();
			chargeHealthCriterion();
        }
    };
}
function chargeEntCriterion()
{
	var criterion = "ent";
	var park_img = 
	{
		url: url_parkimg,
		scaledSize: new google.maps.Size(20, 22)
	};
	
	xhr_park.open("GET", url_park, true);
    xhr_park.send();
	
    xhr_park.onreadystatechange = function() {
        if (xhr_park.readyState == 4 && xhr_park.status == 200) 
		{
            var myArr = xhr_park.responseText;
            var text = myArr;
            json = JSON.parse(text);
			var numberOfPark = json.data.length;
			            
			for (var i = 0; i < numberOfPark; i++) 
			{
                var dataLine = [];
				
				var lat = json.data[i][13];
				var lon = json.data[i][12];
				var latLng = new google.maps.LatLng( lat, lon );
				var name = json.data[i][8];
				var addr = json.data[i][10];
				
                //name 		-dataLine[0]
                dataLine.push( name );
                //street 	-dataLine[1]
                dataLine.push( addr );
				
				dataCriterion[criterion].push(dataLine);
				
				var marker = createMarker( latLng, park_img, criterion, i );
				marker.setVisible(false);
            }; 
			calculateSum( criterion );
        }
    };
}
function chargeSafeCriterion()
{
	var criterion = "safe";
	var pol_img = 
	{
		url: url_polimg,
		scaledSize: new google.maps.Size(30, 42)
	};
	
	xhr_pol.open("GET", url_pol, true);
    xhr_pol.send();
	
    xhr_pol.onreadystatechange = function() {
        if (xhr_pol.readyState == 4 && xhr_pol.status == 200) 
		{
            var myArr = xhr_pol.responseText;
            var text = myArr;
            json = JSON.parse(text);
			var numberOfPol = json.data.length;
			            
			for (var i = 0; i < numberOfPol; i++) 
			{
                var dataLine = [];
				
				var lat = json.data[i][20];
				var lon = json.data[i][21];
				var latLng = new google.maps.LatLng( lat, lon );
				var name = json.data[i][9];
				var addr = json.data[i][10];
				
                //name 		-dataLine[0]
                dataLine.push( name );
                //street 	-dataLine[1]
                dataLine.push( addr );
				
				dataCriterion[criterion].push(dataLine);
				
				var marker = createMarker( latLng, pol_img, criterion, i  );
				marker.setVisible(false);
            }; 
			calculateSum(criterion);
        }
    };
}
function chargeEduCriterion()
{
	var criterion = "edu";
	var lib_img = 
	{
		url: url_libimg,
		scaledSize: new google.maps.Size(20, 22)
	};
	
	xhr_lib.open("GET", url_lib, true);
    xhr_lib.send();
	
    xhr_lib.onreadystatechange = function() {
        if (xhr_lib.readyState == 4 && xhr_lib.status == 200) 
		{
            var myArr = xhr_lib.responseText;
            var text = myArr;
            json = JSON.parse(text);
			var numberOfLib = json.data.length;
			            
			for (var i = 0; i < numberOfLib; i++) 
			{
                var dataLine = [];
				var lat = json.data[i][18][1];
				var lon = json.data[i][18][2];
				var latLng = new google.maps.LatLng( lat, lon );
				var name = json.data[i][8];
				var addr = json.data[i][12];
				
                //name 		-dataLine[0]
                dataLine.push( name );
                //street 	-dataLine[1]
                dataLine.push( addr );
				
				dataCriterion[criterion].push(dataLine);
				
				var marker = createMarker( latLng, lib_img, criterion, i );
				marker.setVisible(false);
            }; 
			calculateSum( criterion );
        }
    };
}
function chargeHealthCriterion()
{
	var criterion = "health";
	var cli_img = 
	{
		url: url_climg,
		scaledSize: new google.maps.Size(32, 32)
	};
	
	xhr_cli.open("GET", url_cli, true);
    xhr_cli.send();
	
    xhr_cli.onreadystatechange = function() {
        if (xhr_cli.readyState == 4 && xhr_cli.status == 200) 
		{
            var myArr = xhr_cli.responseText;
            var text = myArr;
            json = JSON.parse(text);
			var numberOfCli = json.data.length;
			            
			for (var i = 0; i < numberOfCli; i++) 
			{
                var dataLine = [];
				var lat = json.data[i][27];
				var lon = json.data[i][28];
				var latLng = new google.maps.LatLng( lat, lon );
				var name = json.data[i][9];
				var addr = json.data[i][12];
				
                //name 		-dataLine[0]
                dataLine.push( name );
                //street 	-dataLine[1]
                dataLine.push( addr );
				
				dataCriterion[criterion].push(dataLine);
				
				var marker = createMarker( latLng, cli_img, criterion, i );
				marker.setVisible(false);
            }; 
			calculateSum( criterion );
        }
    };
}
function calculateSum( criterion ) 
{
    var number_marker = markerCriterion[criterion].length ;
	var number_rental = boundCriterion.length;
	var sum;
	
	for (var i = 0; i < number_rental; i++) 
	{
		sum = 0;
		var rental_option = boundCriterion[i];
	
		for (var j = 0; j < number_marker; j++) 
		{
			var pos_criterion = markerCriterion[criterion][j].position;
			var match = rental_option.contains( pos_criterion );
			if ( match ) sum++;
		}
		var center = markerCriterion["rental"][i].position;
		var radius = sum * rangeCriterion[ criterion ];
		var circle = createCircle( center, radius, criterion ); 
		circle.setVisible(false);
	}
}
function calculateSumPrefer( ent, safe, health, edu ) 
{
    var ent_marker = markerCriterion["ent"];
	var safe_marker = markerCriterion["safe"];
	var health_marker = markerCriterion["health"];
	var edu_marker = markerCriterion["edu"] ;
	
	var number_rental = boundCriterion.length;
	var ent_sum;
	var safe_sum;
	var health_sum;
	var edu_sum;
	
	for (var i = 0; i < number_rental; i++) 
	{
		ent_sum = 0;
		safe_sum = 0;
		health_sum = 0;
		edu_sum = 0;
		
		var rental_option = boundCriterion[i];
	
		for (var j = 0; j < ent_marker.length ; j++) 
		{
			var pos_criterion = ent_marker[j].position;
			var match = rental_option.contains( pos_criterion );
			if ( match ) ent_sum++;
		}
		
		for (var j = 0; j < safe_marker.length; j++) 
		{
			var pos_criterion = safe_marker[j].position;
			var match = rental_option.contains( pos_criterion );
			if ( match ) safe_sum++;
		}
		for (var j = 0; j < health_marker.length; j++) 
		{
			var pos_criterion = health_marker[j].position;
			var match = rental_option.contains( pos_criterion );
			if ( match ) health_sum++;
		}
		for (var j = 0; j < edu_marker.length; j++) 
		{
			var pos_criterion = edu_marker[j].position;
			var match = rental_option.contains( pos_criterion );
			if ( match ) edu_sum++;
		}
		
		//alert(ent_sum * ent );
		var center = markerCriterion["rental"][i].position;
		//var radius = (ent_sum * ent * 10);
		var radius = (ent_sum * ent * 10) + (safe_sum * safe * 10) + (health_sum * health * 10) + (edu_sum * edu * 10);
		var circle = new google.maps.Circle
		({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: map,
			center: center,
			radius: radius
		}); 
		circle.setVisible(false);
		//circlePref.push( circle );
	}
}
function createMarker( latLng, icon, criterion, i ) 
{
	var marker = new google.maps.Marker
	({
		map: map,
		position: latLng,
		icon: icon
	});
	// add listener
	google.maps.event.addListener( marker, 'click', function(){
		
		$('#info').html( "<b>Name:    </b> <p>" + dataCriterion[ criterion ][i][0] + "</p>   ");
		$('#info').append( "<b>Address:    </b> <p>" + dataCriterion[ criterion ][i][1] + "</p>  ");
	});
	markerCriterion[criterion].push(marker);
	return marker;
}
function createCircle( center, radius, criterion ) 
{
    var circle = new google.maps.Circle
	({
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		map: map,
		center: center,
		radius: radius
	});
	// add listener
	google.maps.event.addListener( circle, 'click', function(){
		var num = circle.radius / rangeCriterion[criterion];
		$('#info').text( num );
	});
	circleCriterion[criterion].push( circle );
	return circle;
}
function displayMarker( criterion ) 
{
    for (var i = 0; i < markerCriterion[criterion].length; i++) 
	{
		var marker = markerCriterion[criterion][i];
		if ( !marker.getVisible() ) {	marker.setVisible(true);	} 
		else	{	marker.setVisible(false);	}
	}
}
function displayCircle( criterion ) 
{
    for (var i = 0; i < circleCriterion[criterion].length; i++) 
	{
		var circle = circleCriterion[criterion][i];
		if ( !circle.getVisible() ) {	circle.setVisible(true);	} 
		else	{	circle.setVisible(false);	}
	}
}
function displayCriterion( criterion ) 
{
    displayMarker( criterion );
	unDisplayRentalMarkers();
	displayCircle( criterion );
}
function unDisplayRentalMarkers() 
{
	var criterion = "rental"
    for (var i = 0; i < markerCriterion[criterion].length; i++) 
	{
		var marker = markerCriterion[criterion][i];
		if ( marker.getVisible() ) {	marker.setVisible(false);	} 
		else	{	marker.setVisible(false);	}
	}
}