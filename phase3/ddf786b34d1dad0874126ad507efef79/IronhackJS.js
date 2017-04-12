$(document).ready(function(){
    $("#WestLafayetteBTN").click(function(){
        $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service zipSearch or locSearch.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=47906",
        // or
        // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: 'jsonp',
        jsonpCallback: 'searchResultsHandler'
        });
    });
});


$(document).ready(function(){
    $("#LafayetteBTN").click(function(){
        $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service zipSearch or locSearch.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=47909",
        // or
        // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: 'jsonp',
        jsonpCallback: 'searchResultsHandler'
        });
    });
});


/*
function getResults(zip) {
    //alert("hello world");
    // or
    // function getResults(lat, lng) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service zipSearch or locSearch.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
        // or
        // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: 'jsonp',
        jsonpCallback: 'searchResultsHandler'
    });
}
*/

//iterate through the JSON result object.
function searchResultsHandler(searchResults) {
    console.log(searchResults.results);

    //Table for Farmer's Market Data
    var fmTable = $("<table></table>");
    fmTable.append("<tr><td>ID</td><td>Market Name</td></tr>");
    for(var ctr = 0; ctr < searchResults.results.length; ++ctr){
        fmTable.append("<tr><td>" + searchResults.results[ctr].id + "</td><td>" + searchResults.results[ctr].marketname + "</td></tr>");
    }
    $("#divTable").html("");
    $("#divTable").append(fmTable);
    /*
    for (var key in searchresults) {
        alert(key);
        var results = searchresults[key];
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            for (var key in result) {
                //only do an alert on the first search result
                if (i == 0) {
                    alert(result[key]);
                }
            }
        }
    }
    */
}


//Attempting to pull NCDC data. Not functional yet.
//Needed assistance in figuring out how to use the token in a header. 
//Used this link as reference: http://gis.stackexchange.com/questions/122633/accessing-noaa-web-service-with-token
$(document).ready(function(){
    $("#NCDCdata").click(function(){
        //curl -H "token:lSUOHwGPpmZMqOpctlZQIdeNrHPgZAhT" "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets";
        //alert('t1');
        /*
        var data;
        $.ajax({ 
            //url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01",
            url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=",
            data: "GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01",
            type: 'GET',
            headers:{ token:"lSUOHwGPpmZMqOpctlZQIdeNrHPgZAhT" },
            success: 'NOAAcallback',
            error: function() {
                alert('t3');
            }

        });
        */
        //Code for API taken from POSTMAN Post I have created
        //Working, but now needs to be changed for the West Lafayette area
        var settings = {
          async: true,
          crossDomain: true,
          url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP%3A28801&startdate=2010-05-01&enddate=2010-05-01",
          method: "GET",
          headers: {
            token: "lSUOHwGPpmZMqOpctlZQIdeNrHPgZAhT"
          }
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
          alert(response.results[1].datatype);
        });
    });
});

function NOAAcallback(searchResults) {
    alert('t2');
    console.log(searchResults.results);
}
