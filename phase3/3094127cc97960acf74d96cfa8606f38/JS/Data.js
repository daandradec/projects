var xmlhttp = new XMLHttpRequest();
//json format data resource url
var idChicago = "CITY:US170006";
var arr;
$.ajax({
  dataType:'json',
  url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?startdate=2017-03-21&enddate=2017-03-30&datasetid=GHCND&locationid=CITY:US170006&stationid=GHCND:USC00110442&sortfield=datatype&sortorder=desc&limit=10 00",
  headers:{ token:'ujxfgioNfoDyQLtquaiFiGfTkyQIQrSc' },
  complete: function(result){
    //console.log(result);
    var arr = result.responseText
    json = JSON.parse(arr)
    console.log(json)
    var f  = [];
    var temp = ["Temperature at the time of observation", "Minimum temperature", "Maximum temperature", "Precipitation"];
    for(var i =0; i<=3; i++){

      f.push(temp[i] + ": " + json.results[i].value  + " Date: " + json.results[i].date + " Station: " +json.results[i].station + "<br>")
    }
    //console.log(f);
    $("#Pre").html(f);
  }
 })
