var width = $(window).width(),height=$(window).height();

var radius = (((width/2)+(height/2))/3)-30,
    scale = radius,
    velocity = .02;

var rotate = [-71.03, 42.37],
    velocityr = [.028, .016];
    
var projectionr = d3.geo.orthographic()
    .scale((((width/2)+(height/2))/3)-30)
    .translate([width / 2, height / 2]);

var pathr = d3.geo.path()
    .projection(projectionr);
    
var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var gradient = svg.append("defs").append("radialGradient")
    .attr("id", "gradient")
    .attr("cx", "75%")
    .attr("cy", "25%");

gradient.append("stop")
    .attr("offset", "5%")
    .attr("stop-color", "#1fd");

gradient.append("stop")
    .attr("offset", "80%")
    .attr("stop-color", "#079");

var circle = svg.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r",(((width/2)+(height/2))/3)-30)
    .style("fill", "url(#gradient)");;

var feature = svg.append("path")
    .datum(graticule);
  
d3.timer(function(elapsed) {
  projectionr.rotate([rotate[0] + elapsed * velocityr[0], rotate[1] + elapsed * velocityr[1]]);
  circle.attr("transform", "rotate(" + (rotate[0] + elapsed * velocityr[0]) + " " + width / 2 + "," + height / 2 + ")");
  feature.attr("d", pathr);
});

var projection = d3.geo.orthographic()
    .translate([width / 2, height / 2])
    .scale(scale)
    .clipAngle(90);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

d3.json("https://d3js.org/world-110m.v1.json", function(error, world) {
  if (error) throw error;

  var land = topojson.feature(world, world.objects.land);

  d3.timer(function(elapsed) {
    context.clearRect(0, 0, width, height);

    projection.rotate([velocity * elapsed, 0]);
    context.beginPath();
    path(land);
    context.fill();

    context.beginPath();
    context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
    context.lineWidth = 2.5;
    context.stroke();
  });
});

d3.select(self.frameElement).style("height", height + "px");
