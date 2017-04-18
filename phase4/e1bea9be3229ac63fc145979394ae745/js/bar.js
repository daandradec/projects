var data = [0, 0, 0, 0, 0, 0];
var countBarChart = 0; 
var x; 

function barChart(){
    $(document).ready(function(){
      $("#pDisplay").hide(1000);
      $("#content_display").css({"padding" : "1vh"});
    });
    $(".chart").css("display", "inline");
  
  d3.select(".chart").selectAll("div")
  .data(data)
  .style("width", x)
  .text(String);
}

function initBarChart(){
  x = d3.scale.linear()
    .domain([0, 100])
    .range(["0%", "100%"]);

  d3.select(".chart")
    .selectAll("div")
    .data(data)
    .enter().append("div")
    .style("width", x)
    .text(String);

}