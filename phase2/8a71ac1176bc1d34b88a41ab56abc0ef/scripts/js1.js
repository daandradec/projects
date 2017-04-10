var map;
var markers = [];
var scrollCount = 0;
var Chicago;

// Google Map
function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14
  });
  
  var image = {
      url: 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png',
      scaledSize: new google.maps.Size(40, 40)
  };

  var marker = new google.maps.Marker({ 
    position: {lat: 41.8708, lng: -87.6505}, 
    map: map,
    icon: image,
    title: 'Department of Computer Science'
  })

  var infowindowP = new google.maps.InfoWindow({content: 'Department of Computer Science'});
  infowindowP.open(marker.get('map'), marker);
  marker.addListener('click', function() {
    map.setCenter(Chicago);
    infowindowP.open(marker.get('map'), marker);
  });



  Chicago = new google.maps.LatLng(41.8708, -87.6505);
  // Query dataSet affordable rental housing developments
  $.ajax({
    url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
    type: "GET",
    data: {
      "$where" : "latitude != 0 AND longitude != 0",
      "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
    }
  }).done(function(data) {
    for (var i = data.length - 1; i >= 0; i--) {

      var location = new google.maps.LatLng(data[i].latitude, data[i].longitude);

      markers[i] = new google.maps.Marker({
        position: location,
        map: map,
        title: data[i].property_name
      });

      markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(location, Chicago) / 1000;
      markers[i].data = data[i];
      addMarker(markers[i]);
    }
    createItems();
  });
}

// Add markers map
var prev_infowindow;
function addMarker(marker) {
  var infowindow = new google.maps.InfoWindow({
    content: marker.data.property_name
  });

  marker.addListener('click', function() {
    if (prev_infowindow != undefined) {
      prev_infowindow.close();
    }
    prev_infowindow = infowindow;
    infowindow.open(marker.get('map'), marker);
    showInformation(marker);
    updateList(marker);
  });
}

// Show data in information section
function showInformation(marker){
  crimes(marker.data.community_area_number);
  document.getElementById("property-name").innerHTML = "<b>Properity Name</b>: " + marker.data.property_name;
  document.getElementById("property-type").innerHTML = "<b>Properity Type</b>: " + marker.data.property_type;
  document.getElementById("community-area-name").innerHTML = "<b>Community Area Name</b>: " + marker.data.community_area;
  document.getElementById("distance").innerHTML = "<b>Distance</b>: " + marker.distance.toFixed(2) + "km";
  document.getElementById("address").innerHTML = "<b>Address</b>: " + marker.data.address;
  document.getElementById("management_company").innerHTML = "<b>Management Company</b>: " + marker.data.management_company;
  document.getElementById("phone-number").innerHTML = "<b>Phone Number</b>: " + marker.data.phone_number;
}

// Show data of crimes in information section
function crimes(community_area_number){
  $.ajax({
    url: 'https://data.cityofchicago.org/resource/6zsd-86xi.json?$query=SELECT community_area, count(community_area) WHERE community_area = \'' + community_area_number + '\' AND year = 2017 GROUP BY community_area',
    type: "GET",
    data: {
      "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
  }
  }).done(function(data) {
    if (community_area_number != undefined) {
      document.getElementById("crimes-2017").innerHTML = "<b>Number of crimes in 2017 in the community</b>: " + data[0].count_community_area;
    } else {
      document.getElementById("crimes-2017").innerHTML = "<b>Number of crimes in 2017 in the community</b>: undefined";
    }
  });
}


// Action when a item of the list is click
var selected;
function clickList(item){
  if (selected != undefined) {
    selected.setAttribute("class", "list-group-item");
  }
  selected = item;
  item.setAttribute("class", "list-group-item active");

  showInformation(item.marker);
  var position = new google.maps.LatLng(item.marker.data.latitude, item.marker.data.longitude);
  map.setCenter(position);

  var infowindow = new google.maps.InfoWindow({
  content: item.marker.data.property_name
  });
  if (prev_infowindow != undefined) {
    prev_infowindow.close();
  }
  prev_infowindow = infowindow;
  infowindow.open(item.marker.get('map'), item.marker);
}

// Update list when a marker is click
function updateList(marker){
  if (selected != undefined) {
    selected.setAttribute("class", "list-group-item");
  }
  selected = marker.item;
  marker.item.setAttribute("class", "list-group-item active");
  var position = new google.maps.LatLng(marker.data.latitude, marker.data.longitude);
  map.setCenter(position);
  scroll(marker.item);
}

// help scroll list
function scroll(item){
  $("#list").scrollTop(item.scroll);
}

// Order list by distance
function orderByDistance() {
  document.getElementById("list").innerHTML = "";
  markers.sort(function(a, b){return b.distance - a.distance});
  createItems();
  clickList(markers[markers.length - 1].item);
  scroll(markers[markers.length - 1].item);
}

// create items and append to listItem
function createItems(){
  scrollCount = 0;
  for (var i = markers.length - 1; i >= 0; i--) {
  var listItem = document.createElement("a");
      listItem.setAttribute("class","list-group-item");
      listItem.setAttribute("onclick","clickList(this)");
      listItem.innerHTML = "<h4 class=list-group-item-heading>" + markers[i].data.property_name +"</h4>" + "<p class=list-group-item-text>" + "Distance: " + markers[i].distance.toFixed(2) + "km" +"</p>";
      listItem.marker = markers[i];
      $("#list").append(listItem);

      // Association between markers and listItem
      markers[i].item = listItem;

      // Set scroll control
      listItem.scroll = scrollCount;
      scrollCount += 63;    
  }
}