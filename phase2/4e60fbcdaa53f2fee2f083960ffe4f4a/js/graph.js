var margin = {top: 20, right: 20, bottom:30, left: 40},
    width = 400 - margin.left - margin.rigt,
    height = 300 - margin.top - margin.bottom;
var x = d3.scaleBand()
          .range([0,width]);
var y = d3.scaleLinear()
          .range([height,0]);
var svg = d3.select("#graph").append("svg")
    .attr("width",400)
    .attr("height",300)
  .append("g")
    .attr("transform","translate("+margin.left+","+margin.top+")");
var barGraph = {
  draw: function(data){
    x.domain(["Distance","Parks","Security","Transportation"]);
    y.domain([0,5]);
  }
}
