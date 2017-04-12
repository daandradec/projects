

$(document).ready(function(){
    $("#butt").click(function(){
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
//iterate through the JSON result object.
function searchResultsHandler(result) {
  console.log(result.results);
   var mytable = $("<table></table>");
   mytable.append("<tr><td>ID</td><th>Marketname</th></tr>");
   for(var i=0;i<result.results.length; ++i){
    mytable.append("<tr><td>" + result.results[i].id +"</td><td>" + 
        result.results[i].marketname + "</td></tr>");
   }

   $("body").append(mytable);
    
}
