
  var localMarkets = [];
  var localMarketDetails = [];
// Function to work with the markets
function extractMarkets(markets){
  var dfrd = $.Deferred();
  for (var key in markets) {
    var results = markets[key];
    localMarkets = results;
    for (var i = 0; i < results.length; i++){
      var res = results[i];
      for(var k in res){
        console.log(k + " : " + res[k]);
      }
      //detailedInfo.done(handleDetailedMarkets(dtInfo));
    }
  }
  dfrd.resolve();
  return dfrd.promise();
}


// Function to work with the detailed information about the markets
function extractMarketDetails(dtlInfo, id){
  for (var key in dtlInfo){
    var dtlResults = dtlInfo[key];
    console.log("I got here");
    localMarketDetails.push({label: id, value: dtlResults});
    for(var i = 0; i < dtlResults.length; i++){
      var dtRes = dtlResults[i];
      for(var k in dtRes){
        console.log(k + " : " + dtRes[k]);
      }
    }
  }
}
