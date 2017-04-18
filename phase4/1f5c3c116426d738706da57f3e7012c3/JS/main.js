var Un;
var tiendas;
var police;
var casas;
var map;

//ICONOS
//https://fusiontables.google.com/DataSource?dsrcid=308519#map:id=3



function initMap() {
    
    Un = new Object;
    Un = [ 'Department of Computer Science' , 41.8708, -87.6505 ];


	var iconUn = {
	    url: "IMG/uic_logo.png", // url
	    scaledSize: new google.maps.Size(40, 40), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var iconMarket = {
	    url: "IMG/market_stand.png", // url
	    scaledSize: new google.maps.Size(30, 30), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var iconPolice = {
	    url: "IMG/police.png", // url
	    scaledSize: new google.maps.Size(30, 30), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var house = {
	    url: "IMG/house.png", // url
	    scaledSize: new google.maps.Size(30, 30), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(25, 25) // anchor
	};

	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, {
		center: {lat: 41.8708, lng: -87.6505},
		zoom: 13});
    
	markerUn = new google.maps.Marker({
		position: {lat: Un[1] , lng: Un[2]}, 
		map: map, 
        title: String(Un[0]) ,
	    icon: iconUn

	});
    Un[3]=new google.maps.InfoWindow({
          content: "hola"+Un[0]
        });
    
    markerUn.addListener('mouseover', function(){ show(markerUn , Un , true) });
    markerUn.addListener('mouseout', function(){ show(markerUn , Un , false) });

    
    tiendas = new Object;
    $.get("https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD", function (datos) {
    	for (var i = 0; i < datos.data.length; i++) {
            tiendas[i]= [datos.data[i][8] , datos.data[i][18] , datos.data[i][19] ];
    	}
	});
//estacion policia
    police = new Object;
	$.get("https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD", function (datos) {
    	for (var i = 0; i < datos.data.length; i++) {
    		police[i]=[datos.data[i][10] , datos.data[i][20] , datos.data[i][21] ];
    	}
	});
//casas
	$.get("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD", function(datos){
        console.log(datos.data);
        migrar(datos.data);
    });
    
}

function migrar(data){
    console.log(data);
    for(var i = 0;i<data.length;i++){
        casas[i]=[data[i][10] , data[i][20] , data[i][21] ];
    }
}

 console.log(casas);

function show(marker , dat , clic) {
  //console.log(dat);
    if(clic){
        dat[3].open(map, marker);
    }else{
        dat[3].close();
    }
}

function putMarkers(el){
    //len = Object.keys(el).length
    for( var i = 0 ; i < 10 ; i++){
        console.log(el[i]);    
        la = el[i][1];
        ln =  el[i][2];
        console.log(i,la,ln);
        mark = new google.maps.Marker({
            position: {lat: la, lng: ln }, 
            map: map, 
            title: String(el[i][0])
        });
        el[i][3]=new google.maps.InfoWindow({
            content: el[i][0]
        });
    
        mark.addListener('mouseover', function(){ show(mark , el[i] , true) });
        mark.addListener('mouseout', function(){ show(mark , el[i] , false) });
        
    }
    
}

function search(){
    //alert("oprime search");
    var che = $("#Cheap").is(":checked");
    var cri = $("#Crimes").is(":checked");
    var soci = $("#Social").is(":checked");
    console.log(che);
    console.log(cri);
    console.log(soci);
    if( che = $("#Cheap").is(":checked")){
        printMarkers(tiendas);
    }
}

//google.maps.event.addDomListener(window, 'load', initialize);