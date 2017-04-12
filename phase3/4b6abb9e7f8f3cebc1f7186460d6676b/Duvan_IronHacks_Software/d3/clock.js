var svgUnderlay = d3.select("svg"),
    svgOverlay = d3.select("body").append(function() { return svgUnderlay.node().cloneNode(true); }),
    svg = d3.selectAll("svg");

svgUnderlay.attr("id", "underlay");
svgOverlay.attr("id", "overlay");

var digit = svg.selectAll(".digit"),
    separator = svg.selectAll(".separator circle");

var digitPattern = [
  [1,0,1,1,0,1,1,1,1,1],
  [1,0,0,0,1,1,1,0,1,1],
  [1,1,1,1,1,0,0,1,1,1],
  [0,0,1,1,1,1,1,0,1,1],
  [1,0,1,0,0,0,1,0,1,0],
  [1,1,0,1,1,1,1,1,1,1],
  [1,0,1,1,0,1,1,0,1,1]
];

(function tick() {
  var now = new Date,
      hours = now.getHours(),
      minutes = now.getMinutes(),
      seconds = now.getSeconds();

  digit = digit.data([hours / 10 | 0, hours % 10, minutes / 10 | 0, minutes % 10, seconds / 10 | 0, seconds % 10]);
  digit.select("path:nth-child(1)").classed("lit", function(d) { return digitPattern[0][d]; });
  digit.select("path:nth-child(2)").classed("lit", function(d) { return digitPattern[1][d]; });
  digit.select("path:nth-child(3)").classed("lit", function(d) { return digitPattern[2][d]; });
  digit.select("path:nth-child(4)").classed("lit", function(d) { return digitPattern[3][d]; });
  digit.select("path:nth-child(5)").classed("lit", function(d) { return digitPattern[4][d]; });
  digit.select("path:nth-child(6)").classed("lit", function(d) { return digitPattern[5][d]; });
  digit.select("path:nth-child(7)").classed("lit", function(d) { return digitPattern[6][d]; });
  separator.classed("lit", seconds & 1);

  setTimeout(tick, 1000 - now % 1000);
})();
