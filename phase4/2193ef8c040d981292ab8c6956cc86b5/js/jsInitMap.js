var mapi;
var geocoder;
function initMap() {
    var mapDiv = document.getElementById('map'); //Line 1: Save reference to div element where map would be shown
    mapi = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
        center: {lat: 41.870800, lng: -87.650500}, //This is UIC's Location
        zoom: 15});
    
    var image = {
            url: "http://publitell.com/system/fotos/43501/8087.png",
            scaledSize: new google.maps.Size(50, 65) // scaled size
        };
    var marker = new google.maps.Marker({ //Line 1
        position: {lat: 41.870800, lng: -87.650500}, //Line2: Location to be highlighted
        map: mapi,//Line 3: Reference to map object
        title: 'Department of Electrical & Computer Engineering', //Line 4: Title to be given
        animation: google.maps.Animation.DROP,
        icon: image
    });
    geocoder = new google.maps.Geocoder();
}

$(document).ready(function(){

//---------------------Get Housing Info------------------------
    
	$("#housesButton").click(function(){
        
        var itemsC = document.getElementById("C");
        var itemsH = document.getElementById("H");
        
        itemsC.style.display = "none";
        itemsH.style.display = "block";
        
        document.getElementById("housesButton").classList.add("active");
        document.getElementById("climateButton").classList.remove("active");
        
        /* Get houses for rent with Onboard-apis.com
        
        $.ajax({
            type: "GET" ,
            url: "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?postalcode=60607&page=1&pagesize=10",
            headers: {
                Accept: "application/json",
                apikey: "b096d5461a99fd017348cb1f6b9f2057",
            },            
            
            success: function(json) {          
                                
                $.each(json.property, function(d){
                    
                    var location = json.property[d].address;
                    console.log(location);
                    var address = location['line1'];
                    
                    $.ajax({
                        type: "GET" ,
                        url: "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqhic9egp7_376md&address="+address+"&citystatezip=Chicago%2C+IL&rentzestimates=true" ,
                        dataType: "xml" ,
                        success: function(xml) {

                            //var xmlDoc = $.parseXML( xml );   <------------------this line
                            //if single item
                           if($(xml).find('message').find('code').text() == 7){
                                console.log("lalaland");
                              }    
                        }       
                    });
                    
                    
                    geocoder.geocode({'address': address}, function(results, status) {
                      if (status === 'OK') {
                        mapi.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                          map: mapi,
                          position: results[0].geometry.location
                        });
                      } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                      }
                    });
                    
                });
                
                
                     
            }       
        });*/
        
        //-------------Get affordable houses + Zillow----------
        
        var hmarkers = []; // array for created markers

        function createMarkerHouse(address, zestimate, latitud, longitud) {
            var image = {
                url: "home-4-32.png",
                scaledSize: new google.maps.Size(30, 30) // scaled size
            };
            var marker = new google.maps.Marker({ //Line 1
                position: {lat: latitud, lng: longitud}, //Line2: Location to be highlighted
                map: mapi,//Line 3: Reference to map object   
                icon: image,
                title: address + zestimate
            });

            hmarkers.push(marker);
            return marker;
        }

        function removeMarkersH(){
            for(i=0; i<hmarkers.length; i++){
                hmarkers[i].setMap(null);
            }
        }

        function showMarkersH(){
            for(i=0; i<hmarkers.length; i++){
                hmarkers[i].setMap(mapi);
            }
        }
        
        $.get("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD", function(json){
            console.log(json);
            //latutude
            //console.log(json.data[0][19]);
            //longitude
            //console.log(json.data[0][20]);
            $.each(json.data, function(d){
                //Full address
                var address = json.data[d][12];
                var streetAddress = address.split(" ").join("+");
                var zipCode = json.data[d][13];
                var city = "Chicago";
                var state = "IL";
                var latitud = parseFloat(json.data[d][19]);
                var longitud = parseFloat(json.data[d][20]);
                
                if(hmarkers.length==0){
                //if(zipCode == "60607"){//avoid Zillow limit           
                    var zestimate = "";
                    $.ajax({
                        type: "GET" ,
                        url: "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqhic9egp7_376md&address="+streetAddress+"&citystatezip="+zipCode+"&rentzestimates=true" ,
                        dataType: "xml" ,
                        success: function(xml) {
                            //console.log(xml);
                            //var xmlDoc = $.parseXML( xml );   <------------------this line
                            //if single item
                            if($(xml).find('message').find('code').text() == 0){
                                var results = xml.getElementsByTagName("zestimate");
                                
                                for(i=0; i<results.length; i++){
                                    res = results[i]["childNodes"];
                                    zestimate = zestimate + "\nZestimate: " + res[0]['textContent'] + " USD";
                                    //console.log(zestimate);               
                                } 
                            }
                            var marker = createMarkerHouse(address, zestimate, latitud, longitud);
                        }       
                    });

                    
                }
            });
        });    
	});

//---------------------Get Weather Info------------------------
//CITY:US170006 Chicago
 
    $("#climateButton").click(function(){
        var itemsC = document.getElementById("C");
        var itemsH = document.getElementById("H");
        
        itemsC.style.display = "block";
        itemsH.style.display = "none";
        document.getElementById("climateButton").classList.add("active");
        document.getElementById("housesButton").classList.remove("active");
        
        $.ajax({
            type: "GET",
            url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=PRECIP_15&stationid=COOP:010008&units=metric&startdate=2010-05-01&enddate=2010-05-31",
            headers: {
                token: "lXzUrUdoBXZdmpTAfKbCatuEaqBxTtJe"
            },            
            
            success: function(json) {
                console.log(json);
                /*
                //var xmlDoc = $.parseXML( xml );   <------------------this line
                //if single item
                if($(xml).find('message').find('code').text() == 0){
                    console.log("lalaland");
                }

                if($(xml).find('rentzestimate').length > 0){
                    console.log("lalaland");
                }else{
                    if($(xml).find('zestimate').length > 0){
                        console.log("djfsdfdgj");
                    }
                }*/
            }       
        });
    });
        
});



//---------------------Parks in Chicago------------------------

var pmarkers = []; // array for created markers
var infoWindow;

function createMarkerParks(name, contentInfoW, latitud, longitud) {
    var image = {
        url: "https://cdn1.iconfinder.com/data/icons/map-objects/154/map-object-tree-park-forest-point-place-512.png",
        scaledSize: new google.maps.Size(40, 40), // scaled size
    };
    var marker, markerOptions;
    marker = new google.maps.Marker({ //Line 1
        position: {lat: latitud, lng: longitud}, //Line2: Location to be highlighted
        map: mapi,//Line 3: Reference to map object   
        icon: image,
        title: name
    });

    infoWindow = new google.maps.InfoWindow({content: contentInfoW});
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(contentInfoW);
        infoWindow.open(map, this);
    });

    pmarkers.push(marker);
    return marker;
}

function removeMarkersP(){
    for(i=0; i<pmarkers.length; i++){
        pmarkers[i].setMap(null);
    }
}

function showMarkersP(){
    for(i=0; i<pmarkers.length; i++){
        pmarkers[i].setMap(mapi);
    }
}

//var Chi_parks;
function chicagoParks() {
    var Chi_parks;

    if(document.getElementById('parks').checked){
        //Climate dataset
        
        if(pmarkers.length==0){
            Chi_parks = [];
            $.get("https://data.cityofchicago.org/api/views/eix4-gf83/rows.json?accessType=DOWNLOAD", function(json){    

                for (var i = 0; i < json.data.length; i++) {
                    var item = json.data[i];

                    if(!Chi_parks[item[10]]) {
                        Chi_parks[item[10]] = {
                            name : item[10],
                            location : {
                                latitude: item[15],
                                longitude: item[14]
                            },
                            facilities : []
                        }
                    }

                    Chi_parks[item[10]]['facilities'].push(item[12]);
                }               
                
                for (var x in Chi_parks) {
                    latitud = parseFloat(Chi_parks[x].location.latitude);
                    longitud = parseFloat(Chi_parks[x].location.longitude);
                    
                    var contentString = '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h3 id="firstHeading" class="firstHeading">'+Chi_parks[x].name+'</h3>'+
                        '<div id="bodyContent">';
                    
                    for(var f in Chi_parks[x].facilities){
                        
                        contentString= contentString+'<p>'+Chi_parks[x].facilities[f]+'</p>';
                    }                   
                    contentString = contentString+'</div>'+'</div>';
                    
                    marker = createMarkerParks(Chi_parks[x].name, contentString, latitud, longitud);
                }
            });
            
        }else{
            showMarkersP();
            console.log("show MarkersParks!");
        }       
        
    }else{
        removeMarkersP();
    }    
}

//-------------------Bike Racks in Chicago---------------------

var bmarkers = []; // array for created markers

function createMarkerBikes(racksNum, latitud, longitud) {
    var image = {
        url: "https://maxcdn.icons8.com/Share/icon/Sports//mountain_biking1600.png",
        scaledSize: new google.maps.Size(30, 30) // scaled size
    };
    var marker = new google.maps.Marker({ //Line 1
        position: {lat: latitud, lng: longitud}, //Line2: Location to be highlighted
        map: mapi,//Line 3: Reference to map object   
        icon: image,
        title: 'Bike racks: '+racksNum
    });

    bmarkers.push(marker);
    return marker;
}

function removeMarkersB(){
    for(i=0; i<bmarkers.length; i++){
        bmarkers[i].setMap(null);
    }
}

function showMarkersB(){
    for(i=0; i<bmarkers.length; i++){
        bmarkers[i].setMap(mapi);
    }
}


function chicagoBikeR() {

    if(document.getElementById('bikeR').checked){
        //Climate dataset

        if(bmarkers.length==0){


            $.get("https://data.cityofchicago.org/api/views/cbyb-69xx/rows.json?accessType=DOWNLOAD", function(json){
                //console.log(json);
                $.each(json.data, function(d){
                    
                    var racksNum = parseInt(json.data[d][13]);
                    var latitud = parseFloat(json.data[d][14]);
                    var longitud = parseFloat(json.data[d][15]);
                    
                    marker = createMarkerBikes(racksNum,latitud,longitud);
                    
                });
            });
            
        }else{
            showMarkersB();
            console.log("show MarkersBikeR!");
        }       
        
    }else{
        removeMarkersB();
    }    
}

//-------------------Police Stations in Chicago---------------------

var polmarkers = []; // array for created markers

function createMarkerPolice(address, latitud, longitud) {
    var image = {
        url: "https://localsguide.com/wp-content/uploads/2014/07/police_station_blue_round.png",
        scaledSize: new google.maps.Size(30, 30) // scaled size
    };
    var marker = new google.maps.Marker({ //Line 1
        position: {lat: latitud, lng: longitud}, //Line2: Location to be highlighted
        map: mapi,//Line 3: Reference to map object   
        icon: image,
        title: address
    });

    polmarkers.push(marker);
    return marker; 
}

function removeMarkersPol(){
    for(i=0; i<polmarkers.length; i++){
        polmarkers[i].setMap(null);
    }
}

function showMarkersPol(){
    for(i=0; i<polmarkers.length; i++){
        polmarkers[i].setMap(mapi);
    }
}


function chicagoPolice() {

    if(document.getElementById('police').checked){
        //Climate dataset
        
        if(polmarkers.length==0){            

            $.get("https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD", function(json){
                //console.log(json);
                $.each(json.data, function(d){
                    
                    var address = json.data[d][10];
                    var latitud = parseFloat(json.data[d][20]);
                    var longitud = parseFloat(json.data[d][21]);
                    
                    marker = createMarkerPolice(address,latitud,longitud);
                    
                });
            });
            
        }else{
            showMarkersPol();
            console.log("show MarkersPol!");
        }       
        
    }else{
        removeMarkersPol();
    }    
}


//-----------Get distance between two points (miles)-----------

function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	//if (unit=="K") { dist = dist * 1.609344 }
	//if (unit=="N") { dist = dist * 0.8684 }
	return dist
}