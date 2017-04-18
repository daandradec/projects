$(document).ready(function(){
  $("#id_btnt").click(function(){
    $.ajax({
      type:"GET",
      url:"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=47906",
      dataType:"jsonp",
      jsonpCallback:"resultHandler"
    });
  });
});

function resultHandler(result){
  console.log(result.results);
  var mytable = $("<table></table>");
  mytable.append("<tr><td>ID</td><th>Marketname</th></tr>");
  for(var i = 0; i < result.results.length; ++i ){
    mytable.append("<tr><td>" + result.results[i].id + "</td><td>" + result.results[i].marketname + "</td></tr>");
  }
  $("body").append(mytable);
}
