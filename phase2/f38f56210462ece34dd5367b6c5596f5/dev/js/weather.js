$(document).ready(function() { 

d3.csv("vegetables1.csv", function(error, data) {
    var select = d3.select("#veg")
      .append("veg")
      .append("select")

    select
      .on("change", function(d) {
        var value = d3.select(this).property("value");
     //   alert(value);
      });

    select.selectAll("option")
      .data(data)
      .enter()
        .append("option")
        .attr("value", function (d) { return d.value; })
        .text(function (d) { return d.Vegetables; });
  });

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
*/




