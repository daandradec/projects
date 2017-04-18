//Interaction in navigation bar
$(document).ready( function() {
  $("#homebar").on("click", function() {
    d3.select(".d3-tip").remove();
    d3.select("svg").remove();
      $("#content").load("pages/home.html");
    });
});
$(document).ready( function() {
  $("#weatherbar").on("click", function() {
    d3.select("svg").remove();
      $("#content").load("pages/weather.html");
    });
});
$(document).ready( function() {
  $("#aboutbar").on("click", function() {
    d3.select(".d3-tip").remove();
    d3.select("svg").remove();
      $("#content").load("pages/about.html");
    });
});
