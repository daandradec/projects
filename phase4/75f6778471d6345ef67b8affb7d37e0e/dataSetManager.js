var collegesID ='38625c3d-5388-4c16-a30f-d105432553a4';
function dataGovRequest(id,query,limit,callback){
  var data = {
      resource_id: id, // the resource id
      limit: limit, // get limit results
      q: query // query for 'xxxxxxx'
    };
    $.ajax({
      url: 'https://inventory.data.gov/api/action/datastore_search',
      data: data,
      dataType: 'json',
      success: callback
      });

}