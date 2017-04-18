var map;
function initMap() {
  var washington = {lat: 41.85081542, lng: -87.69123528};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.85081542, lng: -87.69123528},
    zoom: 12
  });
  var marker = new google.maps.Marker({
    position: washington,
    map: map
  });


  //create a new httprequest for this session
  var xmlhttp = new XMLHttpRequest();
  //json format data resource url
  var url = "https://catalog.data.gov/dataset/libraries-2016-visitors-by-location/resource/ec07d93b-b90d-4afc-832e-ae6acba013a3";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  //once the request is accepted, process the fowllowing function to get data and complete the app information
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          //get the text content from the page response
          var myArr = xmlhttp.responseText;
          var text = myArr;
          json = JSON.parse(text);
      }
    }
  }
