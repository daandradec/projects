
var tempZipCode;


// It query the dataset whith the value of the search box
$(document).ready(function(){
  $(".form-control").on("keyup",function(){
    query=$(this).val();
    dataGovRequest(collegesID,query,15,setList);
  })
  //listener for click event in the Suggestions list
  $(".asy-search-list").on("click","li",function(){
    query = $(this).text();
    var response=dataGovRequest(collegesID,query,1,searchInMap);
    $(".asy-search-item").remove();
    $("#collegeSearch").attr('value', query);
  })

  // Listener for search Button click event
  $("#search").on("click",function(){

      var data={
        ZIP:tempZipCode,
        startdate:"2017-04-10",
        enddate:"2017-04-13"
      }
      console.log(tempZipCode);
      climateDataReq(data,probeClimate);
      data ={};
      //find in the dataset the info about houses
      chicagoDataReq(data,drawHouses);
      chicagoParksReq(data,drawParks);

    });



});
function drawParks(response){
  console.log(response);
  for (var i = 0; i < response.data.length; i++) {
    park={lat:+response.data[i][27],
            lng:+response.data[i][26]
          };
    name = response.data[i][20];
    addParkMarker(park,name);
  }
}

function drawHouses(response){
  var zip = +tempZipCode.slice(0,5);
  var placesList = $("#places-list");
  for (var i = 0; i < response.data.length; i++) {
    place={lat:+response.data[i][19],
            lng:+response.data[i][20]
          };
          if ((response.data[i][13]>=zip-2) && (response.data[i][13]<=zip+2)) {
            li=$('<li class="list-group-item" style="list-style-type:none"> <span> Place: </span>'+response.data[i][11]+
            '<br><span> Address: </span>'+response.data[i][12] +'<br><span>Phone: </span>'+response.data[i][14]+'<br></li>');
            placesList.append(li);
          }
    addHouseMarker(place,response.data[i][11]);
  }

}

function probeClimate(data){
  //console.log(data);
  var response = data.results[0];
  span =$("<span> "+response.datatype+"</span>");
  $("#climateText").append(span);
}

function searchInMap(value){
  var response = value.result.records;
  var collegeUb = {lat:+response[0].LATITUDE ,lng:+response[0].LONGITUD };
  addMarker(collegeUb,response[0].INSTNM);
  map.setZoom(13);
  map.panTo(collegeUb);
  tempZipCode=response[0].ZIP;
}

function setList(data){
  var response = data.result.records;
  var list = $(".asy-search-list");
  $(".asy-search-item").remove();// empty list
  var li="";
  for (var i = 0; i < response.length; i++) {
    //console.log(response[i]);
    li=$('<li class="asy-search-item list-group-item" style="list-style-type:none" >'
      +response[i].INSTNM +"</li>");
    list.append(li);
}
}
