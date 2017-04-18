
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
        map: map,
        suppressMarkers: true
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
            wbyz(value[13]);
            crimesByComArea(value[9]);
            hstatistics(value[9]);
            librarie(value[13]);
            nclinics(value[13]);
            polices(value[13]);

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

function wbyz(zip){
  var w,actualdate;
  var currentdate = new Date();
  actualdate = currentdate.getFullYear()+'-'+((currentdate.getMonth()< 10)?"0":"")+ currentdate.getMonth()+'-'+((currentdate.getDate() < 10)?"0":"")+currentdate.getDate();
  zip = encodeURI(zip);
  begindate = "2016-01-04";
  begindate = encodeURI(begindate);
  actualdate = encodeURI(actualdate);
  console.log(actualdate);
  console.log(zip);
  var xmlhttp = new XMLHttpRequest();
  var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?datasetid=GHCND&locationid=ZIP:"+zip+"&startdate="+actualdate+"&enddate="+actualdate;
  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader('token', 'uyhmtUIXXjeUoTjdxXPEHVkxrHWfGKMk');
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var json = JSON.parse(text);
      console.log(json);
      //document.getElementById("wbyzip").innerHTML = "<b>Wheather by  zip code</b>: " + w + "</em>";
    }
  };
}

function crimesByComArea(area){
  var coma,count;
  //var area = "14";
  count = 0;
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.rdf?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
      coma = xmlDoc.getElementsByTagName("community_area");
      for (var i = 0; i < coma.length; i++) {
        if (coma[i].firstChild.nodeValue == area) {
          count++;
        }
      }
    console.log(count);
    document.getElementById("crimes").innerHTML = "<b>Crimes by Community Area since 2001</b>: " + count + "</em>";
    }
  };
}

function parkfacilities(){
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/eix4-gf83/rows.json?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    var markersp=[];
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var json = JSON.parse(text);
      console.log(json.data[0]);
      var map = initMap();
      var image = {
        url: 'images/park.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }

      $.each(json.data,function(id,value){
          markersp[id] = new google.maps.Marker({
          position: {lat: Number(value[15]), lng: Number(value[14])},
          map: map,
          title: value[12],
          icon: image
          });
          var contentString = '<div id="content">'+
              '<h3 id="firstHeading" class="firstHeading">'+value[10]+'</h3>'+
              '<div id="bodyContent">'+
              '<div><b>Facility Name</b>: '+value[12]+'</em></div> '+
              '<div><b>Facility Type</b>: '+value[13]+'</em></div> '+
              '</div>'+
              '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          google.maps.event.addListener(markersp[id], 'click', function() {
            infowindow.open(map, markersp[id]);
          });
      });
    }
  };
}

function hstatistics(area){
  var coma,frate,ahomicide,bcancerf,gcancer,diabetes,imortality,lcancer,pcanserm,cervascular,ginmales,ginfemales,tuberculosis,chousing,nodiploma,percapita,unemployment;
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/iqnk-2tcu/rows.xml?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
      coma = xmlDoc.getElementsByTagName("community_area");
      frate = xmlDoc.getElementsByTagName("general_fertility_rate");
      ahomicide = xmlDoc.getElementsByTagName("assault_homicide");
      bcancerf = xmlDoc.getElementsByTagName("breast_cancer_in_females");
      gcancer = xmlDoc.getElementsByTagName("cancer_all_sites");
      diabetes = xmlDoc.getElementsByTagName("diabetes_related");
      imortality = xmlDoc.getElementsByTagName("infant_mortality_rate");
      lcancer = xmlDoc.getElementsByTagName("lung_cancer");
      pcanserm = xmlDoc.getElementsByTagName("prostate_cancer_in_males");
      cervascular = xmlDoc.getElementsByTagName("stroke_cerebrovascular_disease");
      ginfemales = xmlDoc.getElementsByTagName("gonorrhea_in_females");
      ginmales = xmlDoc.getElementsByTagName("gonorrhea_in_males");
      tuberculosis = xmlDoc.getElementsByTagName("tuberculosis");
      chousing = xmlDoc.getElementsByTagName("crowded_housing");
      nodiploma = xmlDoc.getElementsByTagName("no_high_school_diploma");
      percapita = xmlDoc.getElementsByTagName("per_capita_income");
      unemployment = xmlDoc.getElementsByTagName("unemployment");
      for (var i = 0; i < coma.length; i++) {
        if (coma[i].firstChild.nodeValue == area) {
          document.getElementById("statistics").innerHTML = "<h2>Statistics:</h2>";
          var chart = c3.generate({
              data: {
                  columns: [
                      ['General Fertility Rate', frate[i].firstChild.nodeValue],
                      ['Homicides', ahomicide[i].firstChild.nodeValue],
                      ['Breast Cancer in Females', bcancerf[i].firstChild.nodeValue],
                      //['Cancer', gcancer[i].firstChild.nodeValue],
                      ['Diabetes', diabetes[i].firstChild.nodeValue],
                      ['Infant Mortality', imortality[i].firstChild.nodeValue],
                      ['Lung Cancer', lcancer[i].firstChild.nodeValue],
                      ['Prostate Cancer Males', pcanserm[i].firstChild.nodeValue],
                      ['Cerebrovascular Disease', cervascular[i].firstChild.nodeValue],
                      //['Gonorrhea in Males', ginmales[i].firstChild.nodeValue],
                      //['Gonorrhea in Females', ginfemales[i].firstChild.nodeValue],
                      ['Crowded Housing', chousing[i].firstChild.nodeValue],
                      ['Tuberculosis', tuberculosis[i].firstChild.nodeValue],
                      ['No High School Diploma', nodiploma[i].firstChild.nodeValue],
                      //['Per Capita Income', percapita[i].firstChild.nodeValue],
                      ['Unemployment', unemployment[i].firstChild.nodeValue],
                  ],
                  type : 'donut',
              },
              donut: {
                  title: "By Community Area"
              },
              size: {

              }

          });
          document.getElementById("tpoints").innerHTML = "<h2>Total Points:</h2>";
          var chart2 = c3.generate({
            bindto: '#chart2',
            data: {
              columns: [
                ['Total Points Percentage ', 91.4]
              ],
              type: 'gauge',
              },
              color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
                threshold: {
                  values: [30, 60, 90, 100]
                }
              },
              size: {
                height: 200
              }
            });
        }
      }
    }
  };
}

function librarie(zip){
  var count;
  count = 0;
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var json = JSON.parse(text);
      var complocation = new google.maps.LatLng( 41.8708,-87.6505 );
      for (var i = 0; i < json.data.length; i++) {
        if (zip == json.data[i][15]) {
          count++;
        }
      }
      document.getElementById("libraries").innerHTML = "<b>Near Libraries</b>: " + count + "</em>";
    }
  };
}

function nclinics(zip){
  var count;
  count = 0;
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var json = JSON.parse(text);
      var complocation = new google.maps.LatLng( 41.8708,-87.6505 );
      for (var i = 0; i < json.data.length; i++) {
        if (zip == json.data[i][15]) {
          count++;
        }
      }
      document.getElementById("clinics").innerHTML = "<b>Near  Public Health Clinics </b>: " + count + "</em>";
    }
  };
}

function polices(zip){
  var count;
  count = 0;
  var xmlhttp = new XMLHttpRequest();
  var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var json = JSON.parse(text);
      var complocation = new google.maps.LatLng( 41.8708,-87.6505 );
      for (var i = 0; i < json.data.length; i++) {
        if (zip == json.data[i][13]) {
          count++;
        }
      }
      document.getElementById("police").innerHTML = "<b>Near Police Stations </b>: " + count + "</em>";
    }
  };
}
