function toRad(Value)
{
  return Value * Math.PI / 180;
}

function dist(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

function rentalData(url){
  var all = [];
  var uLat = 41.8708;
  var uLong = -87.6505;
  $.getJSON(url, function(result){
    $.each(result.data, function(i,x){
      lat = x[19];
      long = x[20];
      d = dist(uLat, uLong, lat, long);
      name = x[11];
      address = x[12];
      com_area = x[8]
      data = [ d, lat, long, name, address, com_area ];
      all.push(data);
      //console.log( all[i][3] );
    });
  });
  console.log(all);
  return all;
}

function getFormInfo(){
  var police = document.getElementById("check_police");
  
  console.log( "police:" + police.checked );
  
  datoss = rentalData("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD");
  for( var i = 0; i<10; i++ ){
    alert( datoss[i] )
  }
  
}