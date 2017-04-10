

var token1="bniowfbHXPaIIaeOWKEzhNoYaBZBZzKe"
var reqUrl="https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GHCND"

// It query the dataset whith the value of the search box
$(document).ready(function(){
  $(".form-control").on("keyup",function(){
    query=$(this).val();
    dataGovRequest(collegesID,query,15,setList);
  })
  $(".asy-search-list").on("click","li",function(){
    query = $(this).text();
    dataGovRequest(collegesID,query,1,searchInMap);
    $(".asy-search-item").remove();
    $("#collegeSearch").attr('value', query);
  })

});
function searchInMap(value){
  var response = value.result.records;
  var collegeUb = {lat:+response[0].LATITUDE ,lng:+response[0].LONGITUD };
  addMarker(collegeUb,response[0].INSTNM);
  map.setZoom(13);
  map.panTo(collegeUb);
}

function setList(data){
  var response = data.result.records;
  var list = $(".asy-search-list");
  $(".asy-search-item").remove();// empty list
  var li="";
  for (var i = 0; i < response.length; i++) {
    //console.log(response[i]);
    li=$('<li class="asy-search-item" style="list-style-type:none" >'
      +response[i].INSTNM +"</li>");
    list.append(li);
}
}
