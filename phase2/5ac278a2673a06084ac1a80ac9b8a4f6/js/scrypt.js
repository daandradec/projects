function initMap(){
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708 , lng:-87.6505 },
    zoom: 12});
  var image = {
    url: 'images/un.png',
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  }
  var marker = new google.maps.Marker({ //Line 1
    position: {lat: 41.8708 , lng: -87.6505 }, //Line2: Location to be highlighted
    map: map,//Line 3: Reference to map object
    title: 'Department of Computer Science', //Line 4: Title to be given
    icon:image
  });
  return map;
}

function showplaces(){
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    var markers=[];
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var json = JSON.parse(text);
      var complocation = new google.maps.LatLng( 41.8708,-87.6505 );
      console.log(json.data[0]);
      var map = initMap();
      var image = {
        url: 'images/house.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }
      var objConfigDR = {
        map: map
      }
      var ds = new google.maps.DirectionsService();
      var dr = new google.maps.DirectionsRenderer(objConfigDR);
      $.each(json.data,function(id,value){
        markers[id] = new google.maps.Marker({
        position: {lat: Number(value[19]), lng: Number(value[20])},
        map: map,
        title: value[11],
        icon: image
        });
        var plocation = new google.maps.LatLng( Number(value[19]),Number(value[20]) );
        var myroute = [plocation,complocation];

        var objConfigDS = {
          origin: plocation,
          destination: complocation,
          travelMode: google.maps.TravelMode.DRIVING
        }


        var dist = (google.maps.geometry.spherical.computeDistanceBetween(plocation,complocation)/1000).toFixed(2);
        google.maps.event.addListener(markers[id], 'click', function() {
            ds.route(objConfigDS,fnRutear);
            function fnRutear(resultados, status){
              if (status == "OK"){
                dr.setDirections(resultados);
              }else{
                alert("Couln't find a route"+ status);
              }
            }

            document.getElementById("place-name").innerHTML = "<b>Place Name</b>: " + value[11] + "</em>";
            document.getElementById("community-a").innerHTML = "<b>Community Area</b>: " + value[8] + "</em>";
            document.getElementById("p-type").innerHTML = "<b>Property Type</b>: " + value[10] + "</em>";
            document.getElementById("address").innerHTML = "<b>Address</b>: " + value[12] + "</em>";
            document.getElementById("p-number").innerHTML = "<b>Phone Number</b>: " + value[14] + "</em>";
            document.getElementById("m-comp").innerHTML = "<b>Management Company</b>: " + value[15] + "</em>";
            document.getElementById("units").innerHTML = "<b>Units</b>: " + value[16] + "</em>";
            document.getElementById("distance").innerHTML = "<b>Distance</b>: " + dist + "km"+ "</em>";
            forprices(value[12]);

        });
      });
    }
  };
}

function forprices(add){
  //add = "188 W. Randolph St.";
  var price,rzestimate,amount;
  add = encodeURI(add);
  console.log(add);
  var xmlhttp = new XMLHttpRequest();
  var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqya3pv957_55f1z&address="+add+"&citystatezip=Chicago+IL&rentzestimate=true";
  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
  xmlhttp.setRequestHeader('Content-type', 'application/ecmascript');
  xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    var markers=[];
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
      //console.log(xmlDoc);
      if (xmlDoc.getElementsByTagName("rentzestimate")[0] != undefined) {
        rzestimate = xmlDoc.getElementsByTagName("rentzestimate")[0];
        amount = rzestimate.childNodes[0];
        price = amount.childNodes[0];
        price = new XMLSerializer().serializeToString(price);
        price = price + "$";
      }else{
        price = "Couldn't find a rent price";
      }
      console.log(price);
      document.getElementById("price").innerHTML = "<b>Rent Price</b>: " + price + "</em>";
    }
  };
}



function shoWheather(){
  var xmlhttp = new XMLHttpRequest();
  var url ="http://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=a60889d46a911b1a8698d131b54e93d8";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var json = JSON.parse(text);
      document.getElementById("weather").innerHTML= "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";
      alert("Today the weather is"+ " " + json.weather[0].main);
    }
  };
}
