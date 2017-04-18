//police index 0,Fire index 1, libraries index 2, clinic index 3, house index 4
var AppData= [];
var mapDiv;
var map;
var markers=[[],[],[],[],[]];
var houses={};
var pending=[];
var min_dist=[,999999999];

var cont=0;
function initMap(){
  mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 15});
  var marker = new google.maps.Marker({ //Line 1
    position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
    map: map,//Line 3: Reference to map object
    title: 'University of illinois', //Line 4: Title to be given
    icon: './images/uni_custom.png'
  })
  //Police station
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var info = JSON.parse(text);
      for (var i = 0; i<info.data.length; i++) {
          var dat=info.data[i];
          markers[0].push(new google.maps.Marker({
            position: {lat:parseFloat(dat[20]), lng: parseFloat(dat[21])}, //Location
            title: dat[9]+", "+dat[10], //Title name+address
            icon: './images/police_custom.png' //icon
          }));
        if(dat[15][0]==null){
          var phone="NaN";
        }
        else{var phone=dat[15][0];};
        //console.log(dat[9]/*name*/,dat[10]/*address*/],phone/*phone*/,dat[14][0]/*website*/);
        var text="<h3 class="+"info_title"+">Police Station</h3>"
                                                       +"<strong>Name: </strong>"+ dat[9]+"<br>"
                                                       +"<strong>Address: </strong>"+ dat[10]+"<br>"
                                                       +"<strong>Phone: </strong>"+phone+"<br>"
                                                       +"<strong>Website: </strong> <a href="+dat[14][0]+">"+dat[9]+"</a><br>";
        addlistenermap(markers[0][i],text);
      //console.log(markers[0][1].getPosition().lat());
    }
  };
}
  //Fire Station
  var xmlhttp2 = new XMLHttpRequest();
  url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
  xmlhttp2.open("GET", url, true);
  xmlhttp2.send();
  xmlhttp2.onreadystatechange = function() {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
      var myArr = xmlhttp2.responseText;
      var text = myArr;
      var info = JSON.parse(text);
      for (var i = 0; i<info.data.length; i++) {
            var dat=info.data[i];
            markers[1].push(new google.maps.Marker({
            position: {lat:parseFloat(info.data[i][14][1]), lng: parseFloat(info.data[i][14][2])}, //Location
            title: info.data[i][13]+", "+info.data[i][9], //Title name+address
            icon: './images/fire_custom.png' //icon
          }));
          var text="<h3 class="+"info_title"+">Fire Station</h3>"
                                                         +"<strong>Name: </strong>"+ dat[13]+"<br>"
                                                         +"<strong>Address: </strong>"+ dat[9]+"<br>";
          addlistenermap(markers[1][i],text);
      };
    }
  };
  //libraries
  var xmlhttp3 = new XMLHttpRequest();
  url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
  xmlhttp3.open("GET", url, true);
  xmlhttp3.send();
  xmlhttp3.onreadystatechange = function() {
    if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
      var myArr = xmlhttp3.responseText;
      var text = myArr;
      var info = JSON.parse(text);
      for (var i = 0; i<info.data.length; i++) {
            var dat=info.data[i];
            markers[2].push(new google.maps.Marker({
            position: {lat:parseFloat(info.data[i][18][1]), lng: parseFloat(info.data[i][18][2])}, //Location
            title: info.data[i][8]+", "+info.data[i][12], //Title name+address
            icon: './images/librarie_custom.png' //icon
          }));
          if(dat[16]==null){
            var phone="NaN";
          }
          else{var phone=dat[16];};
          //console.log(dat[9]/*name*/,dat[10]/*address*/],phone/*phone*/,dat[14][0]/*website*/);
          var text="<h3 class="+"info_title"+">Library</h3>"
                                                         +"<strong>Name: </strong>"+ dat[8]+"<br>"
                                                         +"<strong>Address: </strong>"+ dat[12]+"<br>"
                                                         +"<strong>Phone: </strong>"+phone+"<br>"
                                                         +"<strong>Website: </strong> <a href="+dat[17][0]+">"+dat[8]+"</a><br>"
                                                         +"<strong>Hours of operation: </strong>"+ dat[9]+"<br>"
                                                         +"<strong>Cybernavigator?: </strong>"+ dat[10]+"<br>"
                                                         +"<strong>Teacher in the library?: </strong>"+ dat[11]+"<br>";
          addlistenermap(markers[2][i],text);
      };
    }
  };
  //clinics
  var xmlhttp4 = new XMLHttpRequest();
  url = "https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD";
  xmlhttp4.open("GET", url, true);
  xmlhttp4.send();
  xmlhttp4.onreadystatechange = function() {
    if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
      var myArr = xmlhttp4.responseText;
      var text = myArr;
      var info = JSON.parse(text);
      for (var i = 0; i<info.data.length; i++) {
            var dat=info.data[i];
            markers[3].push(new google.maps.Marker({
            position: {lat:parseFloat(info.data[i][27]), lng: parseFloat(info.data[i][28])}, //Location
            title: info.data[i][8]+", "+info.data[i][9]+", "+info.data[i][12], //Title name+address
            icon: './images/clinic_custom.png' //icon
          }));
          if(dat[16]==null){
            var phone="NaN";
          }
          else{var phone=dat[16];};
          //console.log(dat[9]/*name*/,dat[10]/*address*/],phone/*phone*/,dat[14][0]/*website*/);
          var text="<h3 class="+'"'+"info_title"+'"'+'"'+">Clinic</h3>"
                                                         +"<strong>Name: </strong>"+ dat[8]+"<br>"
                                                         +"<strong>Address: </strong>"+ dat[12]+"<br>"
                                                         +"<strong>Type: </strong>"+ dat[9]+"<br>"
                                                         +"<strong>Phone: </strong>"+phone+"<br>"
                                                         +"<strong>Hours of operation: </strong>"+ dat[11]+"<br>";
          addlistenermap(markers[3][i],text);
      };
    }
  };
  //Renting houses
  var xmlhttp5 = new XMLHttpRequest();
  url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
  xmlhttp5.open("GET", url, true);
  xmlhttp5.send();
  xmlhttp5.onreadystatechange = function() {
    if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
      var myArr = xmlhttp5.responseText;
      var text = myArr;
      var info = JSON.parse(text);
      for (var i = 0; i<info.data.length; i++) {
            var dat=info.data[i];
            if(dat[19]!=null){
              markers[4].push(new google.maps.Marker({
              position: {lat:parseFloat(info.data[i][19]), lng: parseFloat(info.data[i][20])}, //Location
              title: info.data[i][8]+", "+info.data[i][12], //Title name+address
              icon: './images/house_custom.png' //icon
            }));
            if(dat[14]==null){
              var phone="NaN";
            }
            else{
              var phone=dat[14];
            };
            var addr=dat[12].split(' ').join('+').split('.').join('');
            var n= addr.indexOf('-');
            if (n!=-1){
              addr=addr.substr(0,n) + addr.substr(addr.indexOf('+'))
            }
            var text="<h3 class="+'"'+"info_title"+'"'+'"'+">Renting House</h3>"
                                                           +"<strong>Community Name: </strong>"+ dat[8]+"<br>"
                                                           +"<strong>Address: </strong>"+ dat[12]+"<br>"
                                                           +"<strong>Property Name: </strong>"+ dat[11]+"<br>"
                                                           +"<strong>Phone: </strong>"+phone+"<br>"
                                                           +"<strong>Price: </strong><div id="+'"'+"price"+'"'+">"+addr+"</div><br>"
                                                           +"<strong>Distance to the university: </strong><div id="+'"'+"distance"+'"'+"></div><br>";
            houses[addr]=[,,markers[4][markers[4].length-1],dat[8],phone];
            var university= new google.maps.LatLng(41.8708,-87.6505);
            var dest =new google.maps.LatLng(parseFloat(info.data[i][19]),parseFloat(info.data[i][20]));
            var service = new google.maps.DistanceMatrixService();
            addlistenermaphouse(markers[4][markers[4].length-1],text, addr);
            getdistance(university,addr,dest, service);
        };
        //end if
      };
      //end for
     //console.log(houses)
    }
  };
}

function addlistenermap(marker,text){
  marker.addListener( 'click', function(){
    document.getElementById("info_div").innerHTML =  text;
  });
}

function addlistenermaphouse(marker,text, addr){
  marker.addListener( 'click', function(){
    document.getElementById("info_div").innerHTML =  text;
      var addr=document.getElementById("price").innerHTML;
      document.getElementById("price").innerHTML='';
      if(houses[addr][0]==null){
        var distance="loading...(click again the marker in a moment to reload, please)";
      }
      else{
        var distance=houses[addr][0];
      }
      document.getElementById("distance").innerHTML=distance;
  });
}

function getdistance(university,addr,dest,service){
  //start
  service.getDistanceMatrix(
    {
      origins: [university],
      destinations: [dest],
      travelMode: google.maps.TravelMode.WALKING,
      avoidHighways: false,
      avoidTolls: false,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    },function callback(response, status) {
      if (status == 'OK') {
        cont+=1;
          var results = response.rows[0].elements;
          var element = results[0];
          var distance = parseFloat(element.distance.text.replace(",", "."));
          houses[addr][0]=distance;
          if(distance<min_dist[1]){
            min_dist[0]=addr;
            min_dist[1]=distance;
          }
      }
      else{
        setTimeout(function () {
          getdistance(university,addr,dest,service)
        }, 200);

      }
    }
  );
//end
}
