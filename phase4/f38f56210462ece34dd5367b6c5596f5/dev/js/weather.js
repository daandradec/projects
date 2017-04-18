$(document).ready(function() { 
var token = 'sfArzIpzMHvLiBHIJHUOQcXlPCZHrpQA';

 $.ajaxSetup({
   url: '//www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?datacategoryid=TEMP&limit=56',
   cache:false,
   jsonpCallback: 'jsonp',
    dataType: "jsonp",
   beforeSend: function (xhr) 

   { xhr.setRequestHeader('Authorization', token); }
   });

 

  });
function jsonp(resultHandler)
{
  alert(resultHandler);
}
/*  $.ajax({
    url:'//www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?datacategoryid=TEMP&limit=56',
    headers:{ token: 'sfArzIpzMHvLiBHIJHUOQcXlPCZHrpQA'},
    jsonCallback:'jsonp',
    dataType: "jsonp",
    data: { "name": "Indiana" }
  });
});-->

function jsonp(resultHandler)
{
  alert(resultHandler);
}

$.ajax({
  type: "GET",
  url: '//www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?datacategoryid=TEMP&limit=56',
  beforeSend: (xhr) -> xhr.setRequestHeader("token", sfArzIpzMHvLiBHIJHUOQcXlPCZHrpQA)
  )};

});
*/


//});