$(document).ready(function() { 
var token = '	vIbBxdNrmcirXgqXgHqzZufjtdCfeDSq';

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