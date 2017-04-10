//Interaction in navigation bar
$(document).ready( function() {
  $("#homebar").on("click", function() {
      $("#content").load("home.html");
    });
});
$(document).ready( function() {
  $("#weatherbar").on("click", function() {
      $("#content").load("weather.html");
    });
});
$(document).ready( function() {
  $("#aboutbar").on("click", function() {
      $("#content").load("about.html");
    });
});

//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();


xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;

        document.getElementById("weather").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>" + ", it is a <em><b>" + json.weather[0].description + "</b></em>";

    }
};
