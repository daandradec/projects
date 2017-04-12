function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
function searchHomeWithParameters(affordableValue, secureValue, entertainmentValue, cultureValue, priceValue){
  
}
function Api() {
  $.ajax({
      url: "http://campuapi.azurewebsites.net/Home/ZillowApi?url=GetRegionChildren.htm?zws-id=X1-ZWz19a031ofl6z_3v2ae$state=Chicago$city=Chicago$childtype=neighborhood",
      type: "GET",
    }).done(function(data) {
      var elements = data.getElementsByTagName("region");
      for(var j = 0; j < elements.length; j++){
        var location = new google.maps.LatLng(elements[j].getElementsByTagName("latitude")[0].innerHTML, elements[j].getElementsByTagName("longitude")[0].innerHTML);
        var marker = new google.maps.Marker({
            position: location,
            map: map,
        });
        console.log(elements[j]);
      }
    });

}
function affordable(){
  var focusList = [];
  $.ajax({
      url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
      type: "GET",
      data: {
        "$$app_token" : "mtXTKE9SDmNytCMv1wvlNoe1k"
      }
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var point = data[i];
          console.log(point)
          if(getDistanceFromLatLonInKm(latitudeCenter, longitudeCenter, point.latitude, point.longitude) <= 10){
            focusList.push(point);
            var location = new google.maps.LatLng(point.latitude, point.longitude);
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: "images.png"
            });
          }
        };
    });
    console.log(focusList.length);
}
