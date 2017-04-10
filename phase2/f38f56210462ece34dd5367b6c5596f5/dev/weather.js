$(document).ready(function(){
    $("#market-button").one("click",function(){ 
     var url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/FIPS:18';
  $.ajax({
    dataType: "jsonp",
    url: url,
    jsonCallback: 'jsonp',
    data: { q: city },
    headers: {token:sfArzIpzMHvLiBHIJHUOQcXlPCZHrpQA}
  });
});
});

function jsonp(result) {
   console.log(result.results);
 
   for(var i=0;i<result.results.length; ++i)
   {
   
  $("#p").append(i);
   }
  
    
}