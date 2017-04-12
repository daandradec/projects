$(document).ready(function() {

	$("body").addClass("loaded");

	$(function () {
		$('a[rel="lightbox"]').fluidbox();
	})

});


var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=1d4ebab0fee09d9c5a41d255a004c7f5";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);    
        document.getElementById("weather").innerHTML = "<center>Today the weather is <em>" + json.weather[0].main + "<img src=\"http://openweathermap.org/img/w/"+json.weather[0].icon+".png\"</em></center>";
        } else {
        	document.getElementById("weather").innerHTML = "Actually we can't get the weather from Chicago :(";
        }
    };

