//Bootstrap
var slideIndex = 1;
showDivs(slideIndex);
function plusDivs(n) {
  showDivs(slideIndex += n);
}
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  } 
}

//Not available
function notAva() {
    confirm("Sorry but this option is not available at the moment");
}

//First Button: Rent
var index;
function reiniciar_mapa(){
        changeColor(1);
        
        hide();
		hideStats();
        hide2();
        hide3();
	change(1);
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
        var UIC = {
                url: "imagenes/university.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker2 = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow2  = new google.maps.InfoWindow({
            content: "Department of Computer Science  University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker2, 'click', function(){ infoWindow2.open(map, marker2);});
        
         var map;
        var dataLine = [];
        var info = [];
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
            
            //add the information of the markets here 
            //
            var distance=[];
            for (var i = 0; i<262; i++) {
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map.getCenter();
                distance[i] = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                
                dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Place to rent",
                    id: json.data[i][0],
                    PropertyName: json.data[i][11],
                    CommunityAreaName: json.data[i][8],
                    Address: json.data[i][12],
                    PhoneNumber: json.data[i][14],
                    Distance: (distance[i]/1000).toFixed(2) + " km",
                    Price:budgetCa[json.data[i][8]],
                    icon:icon});        
                
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.PropertyName+'</h3><p> <b> Community Area Name: </b>' + this.CommunityAreaName + '</p>' + '<p> <b> Address: </b>' + this.Address + '</p>' + '<p> <b> Phone Number: </b>' + this.PhoneNumber + '</p>' + '<p> <b> Distance: </b>' + this.Distance + '</p>' + '<p> <b> Estimated Price: </b>' + this.Price + '$</p>' + '<input type="button" id="btnPrueba" value="Show more" onclick="ShowMore()"/>');
                    infoWindow.open(map, this);
                });
                
            }

        }
	}
    }
    //InfoWindow
    function ShowMore(){
        change(-1);
    document.getElementById("ShowMore").style.visibility ='visible';
   
   //Property Type
    document.getElementById("ShowName2").innerHTML=json.data[index-1][11];   
    
    //Community Area Name
    document.getElementById("CAN").innerHTML=json.data[index-1][8]; 
    // Property Type
    document.getElementById("PT").innerHTML=json.data[index-1][10];
    //Address
    document.getElementById("AD").innerHTML=json.data[index-1][12];
    //Price
    document.getElementById("ZC").innerHTML=budgetCa[json.data[index-1][8]]+'$';
    //Phone Number
    document.getElementById("PN").innerHTML=json.data[index-1][14];
    //Management Company
    document.getElementById("MC").innerHTML=json.data[index-1][15];
    
    
    //Google street view
    var link1 = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=';
    var link2 = '&fov=90&heading=235&pitch=10&key=AIzaSyBqCkFYZPXJr9VH2RdRg9svw_p88NDXyrE';  
    var anchor = document.createElement('a');
    var image = document.createElement("img");
    anchor.setAttribute("href", link1+json.data[index-1][19]+","+json.data[index-1][20]+link2);
    image.setAttribute("src", link1+json.data[index-1][19]+","+json.data[index-1][20]+link2);
    anchor.appendChild(image);
    var imagen=document.getElementById("image");
    while (imagen.hasChildNodes()) { 
        imagen.removeChild(imagen.lastChild); 
    }
    imagen.appendChild(anchor);
}
    function hide(){
    
    change(-2);  document.getElementById("ShowMore").style.visibility ='hidden';
}

//Second Button: Radius
var r=0;
var z=14;
function radio(){
    changeColor(2);
        hide();
		hideStats();
        hide3();
        hide2();
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: z});
        var UIC = {
                url: "imagenes/university.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker2 = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow2  = new google.maps.InfoWindow({
            content: "Department of Computer Science  University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker2, 'click', function(){ infoWindow2.open(map, marker2);});
        
         var map;
        var dataLine = [];
        var info = [];
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
            
            //add the information of the markets here 
            //
             if(r==0){
                change(-3);
                confirm("Please select a radius")
            }else{
                change(2);
            }
            var distance2=[];
            for (var i = 0; i<262; i++) {
                
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map.getCenter();
                var distance = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                distance2[i] = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                //
                
                if(distance < r){
                    dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
                    dataLine.push(i);
                }
                 
               
                
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            var j;
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i=i+2){
                j=dataLine[i+1];
                marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Place to rent",
                    id: json.data[j][0],
                    PropertyName: json.data[j][11],
                    CommunityAreaName: json.data[j][8],
                    Address: json.data[j][12],
                    PhoneNumber: json.data[j][14],
                    Distance: (distance2[i]/1000).toFixed(2) + " km",
                    Price:budgetCa[json.data[i][8]],
                    icon:icon});
                
                
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.PropertyName+'</h3><p> <b> Community Area Name: </b>' + this.CommunityAreaName + '</p>' + '<p> <b> Address: </b>' + this.Address + '</p>' + '<p> <b> Phone Number: </b>' + this.PhoneNumber + '</p>' + '<p> <b> Distance: </b>' + this.Distance + '</p>' + '<p> <b> Estimated Price: </b>' + this.Price + '$</p>'+'<input type="button" id="btnPrueba" value="Show more" onclick="ShowMore()"/>');
                    infoWindow.open(map, this);
                });
                
            }

        }
	}
 }
    //Math
    function getZoom(){
    if(r<1000){
        z=16;
    }else if(r>=1000 && r<1800){
        z=15;
    }else if(r>=1800 && r<3200){
        z=14;
    }else if(r>=3200 && r<6500){
        z=13;
    }else if(r>=6500 && r<12000){
        z=12;
    }else if(r>=12000){
        z=11;
    }
    
}
    function getRadio() {
    r = document.getElementById("r").value;
    //calculo del radio
        var porcentaje=(29200*r)/100;
        r=porcentaje+800;
        //
    document.getElementById("demo").innerHTML = r+" meters";
    getZoom();
}


//Third Button: Budget
//Data extracted from https://www.zumper.com/blog/2015/03/chicago-rent-prices-by-neighborhood-february-2015/ and https://www.zumper.com/blog/2016/12/chicago-rent-prices-mapped-this-winter-december-2016/
var budgetCa={};
    budgetCa['Near North Side']=1750;
    budgetCa['Loop']=2070;
    budgetCa['Near South Side']=1750;
    budgetCa['North Center']=1350;
    budgetCa['Lake View']=1400;
    budgetCa['Lincoln Park']=1600;
    budgetCa['Avondale']=1150;
    budgetCa['Logan Square']=1270;
    budgetCa['Rogers Park']=1000;
    budgetCa['West Ridge']=990;
    budgetCa['Uptown']=1250;
    budgetCa['Lincoln Square']=1220;
    budgetCa['Edison Park']=1050;
    budgetCa['Norwood Park']=975;
    budgetCa['Jefferson Park']=1050;    
    budgetCa['Forest Glen']=990;
    budgetCa['North Park']=900;
    budgetCa['Albany Park']=1025;
    budgetCa['OHare']=950;
    budgetCa['Edgewater']=1100;
    budgetCa['Portage Park']=925;
    budgetCa['Irving Park']=1050;
    budgetCa['Dunning']=950;
    budgetCa['Montclare']=900;
    budgetCa['Belmont Cragin']=950;
    budgetCa['Hermosa']=800;
    budgetCa['Humboldt Park']=1050;
    budgetCa['West Town']=1570;
    budgetCa['Austin']=725;
    budgetCa['West Garfield Park']=750;
    budgetCa['East Garfield Park']=750;
    budgetCa['Near West Side']=1750;
    budgetCa['North Lawndale']=700;
    budgetCa['South Lawndale']=700;
    budgetCa['Lower West Side']=1100;
    budgetCa['Armour Square']=900;
    budgetCa['Douglas']=1020;
    budgetCa['Oakland']=1220;
    budgetCa['Fuller Park']=650;
    budgetCa['Grand Boulevard']=900;
    budgetCa['Kenwood']=1200;
    budgetCa['Washington Park']=950;
    budgetCa['Hyde Park']=1120;
    budgetCa['Woodlawn']=750;
    budgetCa['South Shore']=750;
    budgetCa['Bridgeport']=850;
    budgetCa['Greater Grand Crossing']=1025;
    budgetCa['Garfield Ridge']=750;
    budgetCa['Archer Heights']=700;
    budgetCa['Brighton Park']=715;
    budgetCa['McKinley Park']=900;
    budgetCa['New City']=1050;
    budgetCa['West Elsdon']=700;
    budgetCa['Gage Park']=750;
    budgetCa['Clearing']=700;
    budgetCa['West Lawn']=725;
    budgetCa['Chicago Lawn']=775;
    budgetCa['West Englewood']=710;
    budgetCa['Englewood']=710;
    budgetCa['Chatham']=715;
    budgetCa['Avalon Park']=675;
    budgetCa['South Chicago']=725;
    budgetCa['Burnside']=700;
    budgetCa['Calumet Heights']=750;
    budgetCa['Roseland']=740;
    budgetCa['Pullman']=750;
    budgetCa['South Deering']=600;
    budgetCa['East Side']=600;
    budgetCa['West Pullman']=700;
    budgetCa['Riverdale']=650;
    budgetCa['Hegewisch']=800;
    budgetCa['Ashburn']=850;
    budgetCa['Auburn Gresham']=770;
    budgetCa['Beverly']=725;
    budgetCa['Washington Heights']=800;
    budgetCa['Mount Greenwood']=750;
    budgetCa['Morgan Park']=775;
function budget(){
        changeColor(3);
		hideStats();
        hide();
        hide2();
        hide3();
        change(10);
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
        var UIC = {
                url: "imagenes/university.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker2 = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow2  = new google.maps.InfoWindow({
            content: "Department of Computer Science  University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker2, 'click', function(){ infoWindow2.open(map, marker2);});
        
         var map;
        var dataLine = [];
        var info = [];
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
            
            //add the information of the markets here 
            //
            var distance=[];
            for (var i = 0; i<262; i++) {
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map.getCenter();
                distance[i] = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                
                dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                 if(budgetCa[json.data[i][8]]<700){
                    icon.url="imagenes/Safe.png";
                }else if(budgetCa[json.data[i][8]]>=700 && budgetCa[json.data[i][8]]<1000){
                    icon.url="imagenes/Medium.png";
                }else if(budgetCa[json.data[i][8]]>=1000 && budgetCa[json.data[i][8]]<1300){
                    icon.url="imagenes/SoSo.png";
                }else if(budgetCa[json.data[i][8]]>=1300){
                    icon.url="imagenes/NotSafe.png";
                }
                marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Place to rent",
                    id: json.data[i][0],
                    PropertyName: json.data[i][11],
                    CommunityAreaName: json.data[i][8],
                    Address: json.data[i][12],
                    PhoneNumber: json.data[i][14],
                    Price:budgetCa[json.data[i][8]],
                    Distance: (distance[i]/1000).toFixed(2) + " km",
                    icon:icon});        
                
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.PropertyName+'</h3><p> <b> Community Area Name: </b>' + this.CommunityAreaName + '</p>' + '<p> <b> Address: </b>' + this.Address + '</p>' + '<p> <b> Phone Number: </b>' + this.PhoneNumber + '</p>' + '<p> <b> Distance: </b>' + this.Distance + '</p>' + '<p> <b> Estimated Price: </b>' + this.Price + '$</p>' + '<input type="button" id="btnPrueba" value="Show more" onclick="ShowMore()"/>');
                    infoWindow.open(map, this);
                });
                
            }

        }
	}
}

//Fourth button: Security
//Data from https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present-Dashboard/5cd6-ry5g
var crimesCa={};
    crimesCa['Near North Side']=208000;
    crimesCa['Loop']=138000;
    crimesCa['Near South Side']=48300;
    crimesCa['North Center']=38900;
    crimesCa['Lake View']=120000;
    crimesCa['Lincoln Park']=97500;
    crimesCa['Avondale']=58000;
    crimesCa['Logan Square']=136000;
    crimesCa['Rogers Park']=94000;
    crimesCa['West Ridge']=75400;
    crimesCa['Uptown']=94100;
    crimesCa['Lincoln Square']=45500;
    crimesCa['Edison Park']=5670;
    crimesCa['Norwood Park']=26400;
    crimesCa['Jefferson Park']=24400;    
    crimesCa['Forest Glen']=10800;
    crimesCa['North Park']=20800;
    crimesCa['Albany Park']=55100;
    crimesCa['OHare']=32400;
    crimesCa['Edgewater']=61900;
    crimesCa['Portage Park']=80100;
    crimesCa['Irving Park']=72700;
    crimesCa['Dunning']=36700;
    crimesCa['Montclare']=14800;
    crimesCa['Belmont Cragin']=117000;
    crimesCa['Hermosa']=36900;
    crimesCa['Humboldt Park']=198000;
    crimesCa['West Town']=187000;
    crimesCa['Austin']=394000;
    crimesCa['West Garfield Park']=111000;
    crimesCa['East Garfield Park']=119000;
    crimesCa['Near West Side']=183000;
    crimesCa['North Lawndale']=174000;
    crimesCa['South Lawndale']=107000;
    crimesCa['Lower West Side']=59700;
    crimesCa['Armour Square']=24700;
    crimesCa['Douglas']=72500;
    crimesCa['Oakland']=14500;
    crimesCa['Fuller Park']=19800;
    crimesCa['Grand Boulevard']=90100;
    crimesCa['Kenwood']=36100;
    crimesCa['Washington Park']=66600;
    crimesCa['Hyde Park']=39900;
    crimesCa['Woodlawn']=110000;
    crimesCa['South Shore']=201000;
    crimesCa['Bridgeport']=40800;
    crimesCa['Greater Grand Crossing']=149000;
    crimesCa['Garfield Ridge']=52700;
    crimesCa['Archer Heights']=22600;
    crimesCa['Brighton Park']=62800;
    crimesCa['McKinley Park']=26600;
    crimesCa['New City']=129000;
    crimesCa['West Elsdon']=23100;
    crimesCa['Gage Park']=58200;
    crimesCa['Clearing']=25200;
    crimesCa['West Lawn']=46600;
    crimesCa['Chicago Lawn']=155000;
    crimesCa['West Englewood']=183000;
    crimesCa['Englewood']=171000;
    crimesCa['Chatham']=128000;
    crimesCa['Avalon Park']=29400;
    crimesCa['South Chicago']=117000;
    crimesCa['Burnside']=9662;
    crimesCa['Calumet Heights']=36000;
    crimesCa['Roseland']=166000;
    crimesCa['Pullman']=23200;
    crimesCa['South Deering']=40200;
    crimesCa['East Side']=31300;
    crimesCa['West Pullman']=101000;
    crimesCa['Riverdale']=27400;
    crimesCa['Hegewisch']=13500;
    crimesCa['Ashburn']=55400;
    crimesCa['Auburn Gresham']=176000;
    crimesCa['Beverly']=22300;
    crimesCa['Washington Heights']=72900;
    crimesCa['Mount Greenwood']=13100;
    crimesCa['Morgan Park']=48700;
var map2;

function safe(){
    
        changeColor(4);
        change(8);
        show3();
        hide2();
		hideStats();
        hide();
		var mapDiv = document.getElementById('map');
		map2 = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
        var UIC = {
                url: "imagenes/university.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker2 = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map2,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow2  = new google.maps.InfoWindow({
            content: "Department of Computer Science  University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker2, 'click', function(){ infoWindow2.open(map2, marker2);});
        
         map2;
        var dataLine = [];
        var info = [];
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
            
            //add the information of the markets here 
            //
            var distance=[];
            for (var i = 0; i<262; i++) {
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map2.getCenter();
                distance[i] = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                
                dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                if(crimesCa[json.data[i][8]]<100000){
                    icon.url="imagenes/Safe.png";
                }else if(crimesCa[json.data[i][8]]>=100000 && crimesCa[json.data[i][8]]<200000){
                    icon.url="imagenes/Medium.png";
                }else if(crimesCa[json.data[i][8]]>=200000 && crimesCa[json.data[i][8]]<300000){
                    icon.url="imagenes/SoSo.png";
                }else if(crimesCa[json.data[i][8]]>=300000 && crimesCa[json.data[i][8]]<400000){
                    icon.url="imagenes/NotSafe.png";
                }
                marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map2, 
                    title: "Place to rent",
                    id: json.data[i][0],
                    PropertyName: json.data[i][11],
                    CommunityAreaName: json.data[i][8],
                    Address: json.data[i][12],
                    PhoneNumber: json.data[i][14],
                    Distance: (distance[i]/1000).toFixed(2) + " km",
                    Crimes: crimesCa[json.data[i][8]],
                    Price:budgetCa[json.data[i][8]],
                    icon:icon});        
                
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.PropertyName+'</h3><p> <b> Community Area Name: </b>' + this.CommunityAreaName + '</p>' + '<p> <b> Address: </b>' + this.Address + '</p>' + '<p> <b> Phone Number: </b>' + this.PhoneNumber + '</p>' + '<p> <b> Estimated Price: </b>' + this.Price + '$</p>' + '<p> <b> # of Crimes in the Community Area: </b>' + this.Crimes + '</p>' + '<p> <b> Distance: </b>' + this.Distance);
                    infoWindow.open(map2, this);
                });
                
            }

        }
	}
    LoadCrimes();
    }
    //Show Crimes
    var markersCrime=[];
    var activeCrimes=1;
    function LoadCrimes(){
     change(8);
        hide2();
        var dataLine = [];
        var info = [];
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/api/views/x2n5-8w5q/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            //add the information of the markets here 
            //
            for (var i = 0; i<500; i++) {
                
                dataLine.push(new google.maps.LatLng(json.data[i][22], json.data[i][23]));
                
            };
            var icon = {
                url: "imagenes/crime.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Crime here",
                    id: json.data[i][0],
                    description: json.data[i][13],
                    icon:icon});        
                
               markersCrime.push(marker);
                marker.setMap(null);
            google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.description+'</h3>');
                    infoWindow.open(map, this);
                });
                
            }

        }
	} 
}
    function mainCrimes(){
        document.getElementById("parrafo2").innerHTML="";
        if(activeCrimes==1){
             document.getElementById("yo").src="imagenes/rain.png";
            document.getElementById("parrafo").innerHTML="<br>It would be nice <br> to know if there have been crimes <br> near the house.";
            document.getElementById("buttonCrimes").style.color='#90EE90';
            crimes();
            activeCrimes=0;
        }else{
            document.getElementById("yo").src="imagenes/pshow.png";
            document.getElementById("parrafo").innerHTML="<br>You never listen to me! ";
            document.getElementById("buttonCrimes").style.color='#FAF0E6';
            crimesQuit();
            activeCrimes=1;
        }
    }
    function crimes(){
        for(var i=0; i<markersCrime.length; i++){
        markersCrime[i].setMap(map2);
    }
    }
    function crimesQuit(){
        for(var i=0; i<markersCrime.length; i++){
        markersCrime[i].setMap(null);
    }
    }
    //Menu
    function show3(){
         document.getElementById("crime").style.visibility ='visible';
    document.getElementById("safest").style.visibility ='visible';
        
    }
    function hide3(){
        //Reset
       activeCrimes=1;
        document.getElementById("buttonCrimes").style.color='#FAF0E6';
        document.getElementById("crime").style.visibility ='hidden';
    document.getElementById("safest").style.visibility ='hidden';
    }
//Five button: Community Areas
var com="";
function ca(){
    hide();
    changeColor(5);
    hide3();
	hideStats();
     hide2();
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 11});
        var UIC = {
                url: "imagenes/university.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker2 = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow2  = new google.maps.InfoWindow({
            content: "Department of Computer Science  University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker2, 'click', function(){ infoWindow2.open(map, marker2);});
        if(com==""){
            change(-3);
            alert("Please select a Community Area");
        }
         var map;
        var dataLine = [];
        var info = [];
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
            
            //add the information of the markets here 
            //
            for (var i = 0; i<262; i++) {
                
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map.getCenter();
                var distance = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                //
                
                if(com==json.data[i][8]){
                    dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
                    dataLine.push(i);
                }
                
            };
            if(dataLine.length==0 && com!=""){
                change(5);
            }else if(dataLine.length>0 && com!=""){
                change(6);
            }
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            var j;
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i=i+2){
                j=dataLine[i+1];
                marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Place to rent",
                    id: json.data[j][0],
                    PropertyName: json.data[j][11],
                    CommunityAreaName: json.data[j][8],
                    Address: json.data[j][12],
                    PhoneNumber: json.data[j][14],
                    Price:budgetCa[json.data[i][8]],
                    icon:icon});
                
                
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.PropertyName+'</h3><p> <b> Community Area Name: </b>' + this.CommunityAreaName + '</p>' + '<p> <b> Address: </b>' + this.Address + '</p>' + '<p> <b> Phone Number: </b>' + this.PhoneNumber + '</p>' + '<p> <b> Estimated Price: </b>' + this.Price + '$</p>' + '<input type="button" id="btnPrueba" value="Show more" onclick="ShowMore()"/>');
                    infoWindow.open(map, this);
                });
                
            }

        }
	}

    
}
    function test(str){
    com=str;
    ca();
}
//Sixth button: Places
var map;
function mapPlaces(){
    hide();
    changeColor(6);
    hide3();
	hideStats();
     show2();
		var mapDiv = document.getElementById('map');
		map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 15});
        var UIC = {
                url: "imagenes/university.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker2 = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow2  = new google.maps.InfoWindow({
            content: "Department of Computer Science  University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker2, 'click', function(){ infoWindow2.open(map, marker2);});
    
    var dataLine = [];
    var info = [];
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
            
            //add the information of the markets here 
            //
            var distance=[];
            for (var i = 0; i<262; i++) {
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map.getCenter();
                distance[i] = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                
                dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                marker3 = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Place to rent",
                    id: json.data[i][0],
                    PropertyName: json.data[i][11],
                    CommunityAreaName: json.data[i][8],
                    Address: json.data[i][12],
                    PhoneNumber: json.data[i][14],
                    Distance: (distance[i]/1000).toFixed(2) + " km",
                    Price:budgetCa[json.data[i][8]],
                    icon:icon});         
                google.maps.event.addListener(marker3, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.PropertyName+'</h3><p> <b> Community Area Name: </b>' + this.CommunityAreaName + '</p>' + '<p> <b> Address: </b>' + this.Address + '</p>' + '<p> <b> Phone Number: </b>' + this.PhoneNumber +  '</p>' + '<p> <b> Distance: </b>' + this.Distance + '<p> <b> Estimated Price: </b>' + this.Price + '$</p>');
                    infoWindow.open(map, this);
                });
                
            }

        }
	}
}
    //libraries
    var markersLibrarie=[];
    var active=1;
    function mainLibraries(){
        document.getElementById("parrafo2").innerHTML="";
        if(active==1){
             document.getElementById("yo").src="imagenes/padditional.png";
            document.getElementById("parrafo").innerHTML="<br>Living near to a library <br> is really important for a student. <br> Almost as important as living <br> near to a pub. ";
            document.getElementById("buttonLibraries").style.color='#90EE90';
            libraries();
            active=0;
        }else{
            document.getElementById("yo").src="imagenes/pbug.png";
            document.getElementById("parrafo").innerHTML="<br><br>I told you, this is important <br> ";
            document.getElementById("buttonLibraries").style.color='#FAF0E6';
            librariesQuit();
            active=1;
        }
    }
    function libraries(){
    //Libraries
        var dataLine = [];
        var info = [];
        var xmlhttp = new XMLHttpRequest();
        var url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
          
            for (var i = 0; i<79; i++) {
                
                dataLine.push(new google.maps.LatLng(json.data[i][18][1], json.data[i][18][2]));
            };
            
            var icon = {
                url: "imagenes/book.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            
            var image = "imagenes/book.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                var marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Library",
                    name: json.data[i][8],
                    hour: json.data[i][9],
                    address: json.data[i][12],
                    phone: json.data[i][16],
                    ws: json.data[i][17][0],
                    icon:icon});    
                markersLibrarie.push(marker);
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.name+'</h3><p> <b> Hour of Operation: </b>' + this.hour + '</p>' + '<p> <b> Address: </b>' + this.address + '</p>' + '<p> <b> Phone: </b>' + this.phone + '</p>' + '<p> <b> Web Site: </b>' + this.ws);
                    infoWindow.open(map, this);
                });
            }

        }
	} 
}
    function librariesQuit(){
    for(var i=0; i<markersLibrarie.length; i++){
        markersLibrarie[i].setMap(null);
    }
    

    }
    //Police station
    var markersPS=[];
    var activePS=1;
    function mainPS(){
        document.getElementById("parrafo2").innerHTML="";
        if(activePS==1){
             document.getElementById("yo").src="imagenes/phome.png";
            document.getElementById("parrafo").innerHTML="<br>It is good living <br> near to a police station. <br> Well... not if you are a criminal.";
            document.getElementById("buttonPS").style.color='#90EE90';
            PS();
            activePS=0;
        }else{
            document.getElementById("yo").src="imagenes/rain.png";
            document.getElementById("parrafo").innerHTML="<br><br>Are you a criminal??";
            document.getElementById("buttonPS").style.color='#FAF0E6';
            PSQuit();
            activePS=1;
        }
    }
    function PS(){
        //Libraries
        var dataLine = [];
        var info = [];
        var xmlhttp = new XMLHttpRequest();
        var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
          
            for (var i = 0; i<22; i++) {
                
                dataLine.push(new google.maps.LatLng(json.data[i][20], json.data[i][21]));
            };
            
            var icon = {
                url: "imagenes/police.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/police.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                var marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Police Station",
                    name: json.data[i][9],
                    address: json.data[i][10],
                    phone: json.data[i][15],
                    ws: json.data[i][14],
                    icon:icon});    
                markersPS.push(marker);
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.name+ '</h3></p>' + '<p> <b> Address: </b>' + this.address + '</p>' + '<p> <b> Phone: </b>' + this.phone + '</p>' + '<p> <b> Web Site: </b>' + this.ws);
                    infoWindow.open(map, this);
                });
            }

        }
	} 
    }
    function PSQuit(){
        for(var i=0; i<markersPS.length; i++){
        markersPS[i].setMap(null);
    }
    }
    //Parks
    var markersParks=[];
    var activeParks=1;
    function mainParks(){
        document.getElementById("parrafo2").innerHTML="";
        if(activeParks==1){
             document.getElementById("yo").src="imagenes/psnow.png";
            document.getElementById("parrafo").innerHTML="<br>Wow! <br> There are a lot of parks.<br> I love parks!.";
            document.getElementById("buttonParks").style.color='#90EE90';
            parks();
            activeParks=0;
        }else{
            document.getElementById("yo").src="imagenes/patmosphere.png";
            document.getElementById("parrafo").innerHTML="<br>How dare you?<br>Don't you love parks?";
            document.getElementById("buttonParks").style.color='#FAF0E6';
            parksQuit();
            activeParks=1;
        }
    }
    function parks(){
        //Parks
        var dataLine = [];
        var info = [];
        var xmlhttp = new XMLHttpRequest();
        var url = "https://data.cityofchicago.org/api/views/wwy2-k7b3/rows.json?accessType=DOWNLOAD";
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            for (var i = 4; i<581; i++) {
                
                 dataLine.push(new google.maps.LatLng(json.data[i][82][1], json.data[i][82][2]));   
                
                
            };
            
            var icon = {
                url: "imagenes/park.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/park.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=4; i<dataLine.length; i++){
                var marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Park",
                    name: json.data[i][9],
                    address: json.data[i][10],
                    type: json.data[i][14],
                    icon:icon});    
                markersParks.push(marker);
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.name+ '</h3></p>' + '<p> <b> Address: </b>' + this.address + '</p>' + '<p> <b> Type: </b>' + this.type);
                    infoWindow.open(map, this);
                });
            }

        }
	} 
    }
    function parksQuit(){
        for(var i=0; i<markersParks.length; i++){
        markersParks[i].setMap(null);
    }
    }
    //Condoms
    var markersCondoms=[];
    var activeCondoms=1;
    function mainCondoms(){
        document.getElementById("parrafo2").innerHTML="";
        if(activeCondoms==1){
             document.getElementById("yo").src="imagenes/pnear.png";
            document.getElementById("parrafo").innerHTML="<br><br> I think this is important <br> for a student.";
            document.getElementById("buttonCondoms").style.color='#90EE90';
            condoms();
            activeCondoms=0;
        }else{
            document.getElementById("yo").src="imagenes/pclear.png";
            document.getElementById("parrafo").innerHTML="<br><br>Happy father's day!";
            document.getElementById("buttonCondoms").style.color='#FAF0E6';
            condomsQuit();
            activeCondoms=1;
        }
    }
    function condoms(){
        //Condoms
        var dataLine = [];
        var info = [];
        var xmlhttp = new XMLHttpRequest();
        var url = "https://data.cityofchicago.org/api/views/azpf-uc4s/rows.json?accessType=DOWNLOAD";
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            for (var i = 0; i<177; i++) {
                
                 dataLine.push(new google.maps.LatLng(json.data[i][14][1], json.data[i][14][2]));   
                
                
            };
            
            var icon = {
                url: "imagenes/condoms.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/condoms.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                var marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Condom Distribution Site",
                    name: json.data[i][9],
                    address: json.data[i][10],
                    type: json.data[i][8],
                    icon:icon});    
                markersCondoms.push(marker);
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.name+ '</h3></p>' + '<p> <b> Address: </b>' + this.address + '</p>' + '<p> <b> Type: </b>' + this.type);
                    infoWindow.open(map, this);
                });
            }

        }
	} 
    }
    function condomsQuit(){
        for(var i=0; i<markersCondoms.length; i++){
        markersCondoms[i].setMap(null);
    }
    }
    //Grocery Store
    var markersGS=[];
    var activeGS=1;
    function mainGS(){
         document.getElementById("parrafo2").innerHTML="";
        if(activeGS==1){
             document.getElementById("yo").src="imagenes/pdrizzle.png";
            document.getElementById("parrafo").innerHTML="<br><br>Showing Grocery Store Chains";
            document.getElementById("buttonGS").style.color='#90EE90';
            GS();
            activeGS=0;
        }else{
            document.getElementById("yo").src="imagenes/pnot.png";
            document.getElementById("parrafo").innerHTML="<br><br>Hiding Grocery Store Chains!";
            document.getElementById("buttonGS").style.color='#FAF0E6';
            GSQuit();
            activeGS=1;
        }
    }
    function GS(){
        //GS
        var dataLine = [];
        var info = [];
        var xmlhttp = new XMLHttpRequest();
        var url = "https://data.cityofchicago.org/api/views/wryv-d7zf/rows.json?accessType=DOWNLOAD";
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            for (var i = 0; i<45; i++) {       
                 dataLine.push(new google.maps.LatLng(json.data[i][14][1], json.data[i][14][2]));   
            };  
            var icon = {
                url: "imagenes/food.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/food.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
                var marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Grocery Store Chain",
                    name: json.data[i][8],
                    address: json.data[i][10],
                    type: json.data[i][9],
                    icon:icon});    
                markersGS.push(marker);
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.name+ '</h3></p>' + '<p> <b> Address: </b>' + this.address + '</p>' + '<p> <b> Type: </b>' + this.type);
                    infoWindow.open(map, this);
                });
            }

        }
	} 
    }
    function GSQuit(){
        for(var i=0; i<markersGS.length; i++){
        markersGS[i].setMap(null);
    }
    }
    //Menu
    function show2(){ 
    change(7);
    document.getElementById("police").style.visibility ='visible';
    document.getElementById("book").style.visibility ='visible';
    document.getElementById("park").style.visibility ='visible';    
    document.getElementById("hospital").style.visibility ='visible';
    document.getElementById("eat").style.visibility ='visible';
        
                 
}
    function hide2(){
       //Reset
     activeCondoms=1;
        document.getElementById("buttonCondoms").style.color='#FAF0E6';
    activeGS=1;
        document.getElementById("buttonGS").style.color='#FAF0E6';
        activeParks=1;
        document.getElementById("buttonParks").style.color='#FAF0E6';
        activePS=1;
        document.getElementById("buttonPS").style.color='#FAF0E6';
        active=1;
        document.getElementById("buttonLibraries").style.color='#FAF0E6';
        
    document.getElementById("police").style.visibility ='hidden';
    document.getElementById("book").style.visibility ='hidden';
    document.getElementById("park").style.visibility ='hidden';    document.getElementById("hospital").style.visibility ='hidden'; document.getElementById("eat").style.visibility ='hidden';
}

//change Brayan
function change(x){
    document.getElementById("parrafo2").innerHTML="";
    
    switch(x){
        case 1:
            document.getElementById("yo").src="imagenes/rent2.png";
            document.getElementById("parrafo").innerHTML="Wow! <br> That's a lot of houses! <br> Exactly 262 houses ready to be<br>rented and I am still living with<br>my mom.<br>You can click to <br> see more information";
        break;
        case -1:
            document.getElementById("yo").src="imagenes/pshow.png";
            document.getElementById("parrafo").innerHTML="<b>"+json.data[index-1][11]+"</b> <br>looks nice. <br> But before taking any decision<br> you should check stadistics<br>about this place<br>";
        break;
        case -2:
            document.getElementById("yo").src="imagenes/phome.png";
            document.getElementById("parrafo").innerHTML="I know... I know... <br> Choosing the best place is <br> a hard decision. <br> You can use our filters  on the left <br> to make easier choosing a place.<br> And yes, I can change my shirt <br> and glasses magically";
        break;
        case -3:
            document.getElementById("yo").src="imagenes/pbug.png";
            document.getElementById("parrafo").innerHTML="<h2>It is not a bug.</h2> <br> Well, Maybe it is. <br> We will never know it <br> Please select an option";
        break;
        case 2:
             if(r<10000){ 
                document.getElementById("yo").src="imagenes/pnear.png";
                document.getElementById("parrafo").innerHTML="<br><br>I like living near <br>to the university as well.";
             }else if(r>=10000 && r <20000){
                 document.getElementById("yo").src="imagenes/pmedium.png";
                document.getElementById("parrafo").innerHTML="<br>Not bad.<br>It is not so near, <br>but neither it is far.";
             }else{
                document.getElementById("yo").src="imagenes/far.png";
                document.getElementById("parrafo").innerHTML="<br>Oh my god! <br>You really want<br> to do exercise, don't you?. <br> That is so far, you have to walk <br> a lot.";
            }
        break;
        case 5:
            document.getElementById("yo").src="imagenes/pnot.png";
            document.getElementById("parrafo").innerHTML="Houston we have a problem!<br>It seems like this Community <br> Area doesn't have any place to rent. <br> But don't worry! You don't need <br> this community area, <br> this community area needs you. <br> Please select another one";
        break;
        case 6:
            document.getElementById("yo").src="imagenes/pyes.png";
            document.getElementById("parrafo").innerHTML="I love this Community Area <br>It is so clean, safe and... and <br> Well, I'm lying, I'm Colombian,<br> I've never been in Chicago <br> So I don't know how it is.<br> You should see  our stadistics <br>for this community";
        break;
        case 7:
            document.getElementById("yo").src="imagenes/pnot.png";
            document.getElementById("parrafo").innerHTML="<br>Now you can choose what <br> places are shown in the map. <br> What does it feel <br> to have the entire control?";
        break;
        case 8:
            document.getElementById("yo").src="imagenes/pyes.png";
            document.getElementById("parrafo").innerHTML="Maybe you are wondering <br>'What are those colors?' <br> <b> Green:</b> Safe place. <br> <b> Yellow:</b> Slightly safe place.<br> <b>Orange:</b> Slightly dangerous place.<br><b>Red:</b> Dangerous Place";
        break;
        case 9:
            document.getElementById("yo").src="imagenes/daniela.png";
            document.getElementById("parrafo").innerHTML="Hi! <br> My name is Daniela and <br> I'm going to help you in this part. <br> Now you can check our <br> puntuation for each place <br> and their stats";
         break;   
        case 10:
            document.getElementById("yo").src="imagenes/pclear.png";
            document.getElementById("parrafo").innerHTML="Maybe you are wondering <br>'What are those colors?' <br> <b> Green:</b> Cheap place.  <br> <b> Yellow:</b> Slightly cheap place.<br> <b>Orange:</b> Slightly expensive place.<br><b>Red:</b> Expensive place.";
            setTimeout(function(){document.getElementById("parrafo").innerHTML="<b> Green:</b> Price below 700$.  <br> <b> Yellow:</b> Price between <br> 700$ and 1000$.<br> <b>Orange:</b>Price between <br> 1000$ and 1300$. <br><b>Red:</b> Price over 1300$. <br> <i> Prices are estimated.";}, 5000);         
        break;
		case -4:
			document.getElementById("yo").src="imagenes/daniela2.png";
            document.getElementById("parrafo").innerHTML="On the bar graphic, <br> you can see this community area <br> compared with <br> the safest, the dangerous and <br> the average.";
		break;
		case -5:
			document.getElementById("yo").src="imagenes/daniela3.png";
            document.getElementById("parrafo").innerHTML="I forgot to tell you that <br> you are going to see <br> bigger the icons of houses that <br> have better scores.";
		break;
        }
    }

//Change colors
function changeColor(x){
    switch (x){
        case 1:
            document.getElementById("boton1").style.color='#00FA9A';
            document.getElementById("boton2").style.color='#FFFFFF';
            document.getElementById("boton3").style.color='#FFFFFF';
            document.getElementById("boton4").style.color='#FFFFFF';
            document.getElementById("boton5").style.color='#FFFFFF';
            document.getElementById("boton6").style.color='#FFFFFF';
            document.getElementById("botonW").style.color='#F5F5DC';
            document.getElementById("botonS").style.color='#F5F5DC';
            break;
        case 2:
            document.getElementById("boton1").style.color='#FFFFFF';
            document.getElementById("boton2").style.color='#00FA9A';
            document.getElementById("boton3").style.color='#FFFFFF';
            document.getElementById("boton4").style.color='#FFFFFF';
            document.getElementById("boton5").style.color='#FFFFFF';
            document.getElementById("boton6").style.color='#FFFFFF';
            document.getElementById("botonW").style.color='#F5F5DC';
            document.getElementById("botonS").style.color='#F5F5DC';
            break;
        case 3:
            document.getElementById("boton1").style.color='#FFFFFF';
            document.getElementById("boton2").style.color='#FFFFFF';
            document.getElementById("boton3").style.color='#00FA9A';
            document.getElementById("boton4").style.color='#FFFFFF';
            document.getElementById("boton5").style.color='#FFFFFF';
            document.getElementById("boton6").style.color='#FFFFFF';
            document.getElementById("botonW").style.color='#F5F5DC';
            document.getElementById("botonS").style.color='#F5F5DC';
            break;
        case 4:
            document.getElementById("boton1").style.color='#FFFFFF';
            document.getElementById("boton2").style.color='#FFFFFF';
            document.getElementById("boton3").style.color='#FFFFFF';
            document.getElementById("boton4").style.color='#00FA9A';
            document.getElementById("boton5").style.color='#FFFFFF';
            document.getElementById("boton6").style.color='#FFFFFF';
            document.getElementById("botonW").style.color='#F5F5DC';
            document.getElementById("botonS").style.color='#F5F5DC';
            break;
        case 5:
            document.getElementById("boton1").style.color='#FFFFFF';
            document.getElementById("boton2").style.color='#FFFFFF';
            document.getElementById("boton3").style.color='#FFFFFF';
            document.getElementById("boton4").style.color='#FFFFFF';
            document.getElementById("boton5").style.color='#00FA9A';
            document.getElementById("boton6").style.color='#FFFFFF';
            document.getElementById("botonW").style.color='#F5F5DC';
            document.getElementById("botonS").style.color='#F5F5DC';
            break;
        case 6:
            document.getElementById("boton1").style.color='#FFFFFF';
            document.getElementById("boton2").style.color='#FFFFFF';
            document.getElementById("boton3").style.color='#FFFFFF';
            document.getElementById("boton4").style.color='#FFFFFF';
            document.getElementById("boton5").style.color='#FFFFFF';
            document.getElementById("boton6").style.color='#00FA9A';
            document.getElementById("botonW").style.color='#F5F5DC';
            document.getElementById("botonS").style.color='#F5F5DC';
            break;
        case 7:
            document.getElementById("botonW").style.color='#00FFFF';
            
            break;
        case 8:
            document.getElementById("boton1").style.color='#FFFFFF';
            document.getElementById("boton2").style.color='#FFFFFF';
            document.getElementById("boton3").style.color='#FFFFFF';
            document.getElementById("boton4").style.color='#FFFFFF';
            document.getElementById("boton5").style.color='#FFFFFF';
            document.getElementById("boton6").style.color='#FFFFFF';
            document.getElementById("botonW").style.color='#F5F5DC';
            
            document.getElementById("botonS").style.color='#00FFFF';
            
    }
}
//Weather Button
function weather(){
    changeColor(7);
    var advice;
    //Request OpenWeatherMap
    var xmlhttp = new XMLHttpRequest(); 
    var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=9830879c002bb5e78eebb68edc11b148";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);
            if(json.weather[0].id>=200 && json.weather[0].id<300){
                //Thunderstorm
                advice="I think you should stay at home, <br> watch a movie and  wait.";
                document.getElementById("yo").src="imagenes/pthunder.png";
            }else if(json.weather[0].id>=300 && json.weather[0].id<400){
                //Drizzle
                advice="You should carry an <br> umbrella if you go out.";
                document.getElementById("yo").src="imagenes/pdrizzle.png";
            }else if(json.weather[0].id>=500 && json.weather[0].id<600){
                //Rain
                advice="Maybe it is better to stay at home, <br> finding a place to rent can wait";
                document.getElementById("yo").src="imagenes/rain.png";
            }else if(json.weather[0].id>=600 && json.weather[0].id<700){
                //Snow
                advice="I love the snow. But it never <br>snows on my country, Colombia.";
                document.getElementById("yo").src="imagenes/psnow.png";
            }else if(json.weather[0].id>=700 && json.weather[0].id<800){
                //Atmosphere
                advice="I think you can go out <br>and look for a place to rent";
                document.getElementById("yo").src="imagenes/patmosphere.png";
            }else if(json.weather[0].id==800){
                // Clear
                advice="It is the perfect day to look for a <br> place to rent...using this app.";
                document.getElementById("yo").src="imagenes/pclear.png";
            }else if(json.weather[0].id>800 && json.weather[0].id<900){
                //Clouds
                advice="It could rain, but YOLO. <br> go out and search a place.";
                document.getElementById("yo").src="imagenes/pyes.png";
            }else if(json.weather[0].id>=900){
                //Extreme and Additional
                advice="Go out if you want. I can't <br> because I'm a digital character.";
                document.getElementById("yo").src="imagenes/padditional.png";
            }       
              document.getElementById("parrafo").innerHTML="The weather today in <br> Chicago is:<b>"+json.weather[0].main+"</b><br>Exactly: "+json.weather[0].description+"<br>"+advice;
        }
            
    }
    prcp();
}
function prcp(w){
      //Request ClimateDataOnline
    var today = new Date();
    var dd = today.getDate();
    var mm = "0"+(today.getMonth()+1); 
    var yyyy = today.getFullYear()
    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datacategoryid=W&datasetid=GHCND&locationid=FIPS:37&startdate="+yyyy+"-"+mm+"-01"+"&enddate="+yyyy+"-"+mm+"-"+dd;
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("token", "gbvGVjApyTKgCxaiZmdenhCukMOMzpus")
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);
            //Number of results
            var rts=json.metadata.resultset.limit;
            var con = 0;
            for(var i=0; i<rts; i++){
                if(json.results[i].datatype=="PRCP"){ //We are only intereset on the precipitation
                    if(json.results[i].value==0){
                        --con;
                    }else{
                        ++con;
                    }
                }
            }
            if(con>=0){
                p="high";             document.getElementById("parrafo2").innerHTML="<i>PSDT: The precipitation on <br> the month has been "+p;
            }else{
                p="low";
                document.getElementById("parrafo2").innerHTML="<i>PSDT: The precipitation on <br> the month has been "+p;
            } 
            
        }
        
    }  
}
//Stats Button
var distance=[];
function stats(){
    
        hide();
        hide2();
        hide3();
    change(9);
    changeColor(8);
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 14});
        var UIC = {
                url: "imagenes/university.png",
                scaledSize: new google.maps.Size(50, 50),
            };
		var marker2 = new google.maps.Marker({ //Line 1
			position: {lat: 41.8708, lng: -87.6505}, 
			map: map,
            icon: UIC,
			title: 'UIC' 
		});
        var infoWindow2  = new google.maps.InfoWindow({
            content: "Department of Computer Science  University of Illinois, Chicago</b>"
        });
        google.maps.event.addListener(marker2, 'click', function(){ infoWindow2.open(map, marker2);});
        
         var map;
        var dataLine = [];
        var info = [];
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
            
            //add the information of the markets here 
            //
            
            for (var i = 0; i<262; i++) {
                //distance
                var localization = new google.maps.LatLng(json.data[i][19], json.data[i][20]);
                var center = map.getCenter();
                distance[i] = google.maps.geometry.spherical.computeDistanceBetween(center, localization);
                
                dataLine.push(new google.maps.LatLng(json.data[i][19], json.data[i][20]));
            };
            var icon = {
                url: "imagenes/rent.png",
                scaledSize: new google.maps.Size(25, 25),
            };
            var image = "imagenes/rent.png"
            var infoWindow  = new google.maps.InfoWindow();
            for(var i=0; i<dataLine.length; i++){
				index=json.data[i][0];
				var p=puntuation(i);
				switch(p){
					case 1:
						icon.scaledSize=new google.maps.Size(5, 5);
					break;
					case 2:
						icon.scaledSize=new google.maps.Size(15, 15);
					break;
					case 3:
						icon.scaledSize=new google.maps.Size(25, 25);
					break;
					case 4:
						icon.scaledSize=new google.maps.Size(35, 35);
					break;
					case 5:
						icon.scaledSize=new google.maps.Size(45, 45);
					break;
				}
                marker = new google.maps.Marker({
                    position: dataLine[i],
                    map:map, 
                    title: "Place to rent",
                    id: json.data[i][0],
                    PropertyName: json.data[i][11],
                    CommunityAreaName: json.data[i][8],
                    Address: json.data[i][12],
                    PhoneNumber: json.data[i][14],
                    Distance: (distance[i]/1000).toFixed(2) + " km",
                    Price:budgetCa[json.data[i][8]],
                    Crimes: crimesCa[json.data[i][8]],
                    icon:icon});        
                
                google.maps.event.addListener(marker, 'click', function(){ 
                   index=this.id; infoWindow.setContent('<h3>'+this.PropertyName+'</h3><p> <b> Community Area Name: </b>' + this.CommunityAreaName + '</p>' + '<p> <b> Distance: </b>'  + this.Distance + '</p>' + '<p> <b> Estimated Price: </b>' + this.Price + '$</p>' + '<p> <b> # of Crimes in the Community Area: </b>' + this.Crimes + '<br><br><input type="button" id="btnPrueba" value="Show Stats" onclick="ShowStats(); change(-4);"/>');
                    infoWindow.open(map, this);
                });
                
            }

        }
	}
}
function ShowStats(){
     d3.select("svg").remove();
 document.getElementById("grafico").style.visibility ='visible';
    document.getElementById("ShowName").innerHTML=json.data[index-1][11];
    //Data from data.gov: 394000 5670 81763
    //the number of crimes on the safest community area is 5670, 55 in our diagram.
    //the number of crimes on the dangerous community area is 394000, 450 in our diagram.
    //Average: 81763, in our diagram 93.
    var name = json.data[index-1][8];
    var numberCrimes = crimesCa[name];
    var aux=(crimesCa[name]*450)/394000;
    if(aux<55){
        aux=55; //In the chart can't be values under 55
    }
    var test=[55,450,93,aux];
    var grafico=d3.select('#gra').append('svg')
                        .attr('width', 450)
                        .attr('height', 450)
                        .style('background', '#f4f4f4')
                        .selectAll('rect')
                            .data(test)
                            .enter().append('rect')
                                .style('fill', 'LightSlateGray')
                                .attr('width', 105)
                                .attr('height', function(d){
                                    return d;
                                })
                                .attr('x', function(d, i){
                                    return i * (105+5);
                                })
                                .attr('y', function(d){
                                    return 500 - d;
                                })
    document.getElementById("pca").innerHTML=json.data[index-1][8]+'<br>'+crimesCa[name];
    var p=puntuation();
    document.getElementById("poi").innerHTML=p+'.0';
    

}
function hideStats(){
    document.getElementById("grafico").style.visibility ='hidden';
}
function puntuation(){
    //Is going to be from 0 to 5
    //If the house is in a community area that is below the average of crimes, the house wins two points
    var points=0;
    if(crimesCa[json.data[index-1][8]]<81763){
        ++points;
       ++points; document.getElementById("imgsafe").src="imagenes/safe1.png";
 		document.getElementById("psaf").innerHTML="Safe community Area";
    }
    //If the house is in a community area that is below the half of the crimes of the dangerous community area, the house wins a point
    else if( crimesCa[json.data[index-1][8]]>81763 && crimesCa[json.data[index-1][8]]<197000){
        ++points;
        document.getElementById("imgsafe").src="imagenes/safe3.png";
		document.getElementById("psaf").innerHTML="Slightly Safe <br> community area";
        
    }else{
        document.getElementById("imgsafe").src="imagenes/safe2.png";
 		document.getElementById("psaf").innerHTML="Dangerous community area";
    }
    //if the house is near to the university (5 km), wins two points
    if(distance[index-1]<5000){
        ++points;
        ++points;
        document.getElementById("imgnear").src="imagenes/near1.png";
 		document.getElementById("pnea").innerHTML="Near to the university";
    }
    //if the distance from the house and the university is below the average, the house wins a point
    var sum=0;
    for(var i=0; i<distance.length; i++){
        if(distance[i]<30000){ //one of the houses in the dataset is in Africa, I think is a mistake
            sum=sum+distance[i];    
        }
        
    }
    var ave=sum/distance.length;
    if(distance[index-1]<ave && distance[index-1]>5000){
       	++points;
        document.getElementById("imgnear").src="imagenes/near2.png";
 		document.getElementById("pnea").innerHTML="Slightly  near to the university";
    }else if(distance[index-1]>ave){
        document.getElementById("imgnear").src="imagenes/near3.png";
 		document.getElementById("pnea").innerHTML="Far to the <br> university";
    }
	//if the price is bellow 1000, wins a point
	if(budgetCa[json.data[index-1][8]]<1000){
		++points;
		document.getElementById("imgcheap").src="imagenes/cheap.png";
 		document.getElementById("pchea").innerHTML="Estimated price <br> below 1000";
	}else{
		document.getElementById("imgcheap").src="imagenes/cheap2.png";
 		document.getElementById("pchea").innerHTML="Estimated price <br> over 1000";
	}
    return points;
}
