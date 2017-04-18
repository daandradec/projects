
var collegesID ='38625c3d-5388-4c16-a30f-d105432553a4';
function dataGovRequest(id,query,limit,callback){
  var data = {
      resource_id: id, // the resource id
      limit: limit, // get limit results
      q: query // query for 'xxxxxxx'
    };
    response=$.ajax({
      url: 'https://inventory.data.gov/api/action/datastore_search',
      data: data,
      dataType: 'json',
      success: callback
      });

}
/*
* 'data' is an object whith values like:
datasetid
locationid
startdate
enddate

*
*/
function climateDataReq(data,callback){
  var token1="bniowfbHXPaIIaeOWKEzhNoYaBZBZzKe";
  //var reqUrl="https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:61021&startdate=2010-05-01&enddate=2010-05-01";
  //var reqUrl="https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets";
  data.ZIP=data.ZIP.slice(0,5);
  var reqUrl="https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:";
  reqUrl=reqUrl+data.ZIP+"&startdate="+data.startdate+"&enddate="+data.enddate;
  console.log(reqUrl);
  $.ajax({ url:reqUrl,
            data:{},
           headers:{ token:token1 },
           dataType: 'json',
           success:callback
         });
}

function chicagoDataReq(data,callback){
  var reqUrl="https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json";
  reqUrl=reqUrl;
  $.ajax({ url:reqUrl,
            data:{},
           dataType: 'json',
           success:callback
         });
  }
function chicagoParksReq(data,callback){
 var reqUrl="https://data.cityofchicago.org/api/views/vcti-mbcd/rows.json";
 reqUrl=reqUrl;
 $.ajax({ url:reqUrl,
          dataType: 'json',
          success:callback
        });

}
