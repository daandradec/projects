/** 2017-04-04 by Alejandro Sierra **/

var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=2120f3eaee0ae63760f0ffc4bd8bcaf0";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var myArr = xmlhttp.responseText;
		var text = myArr;
		var json = JSON.parse(text);
   		document.getElementById("weather").innerHTML = "Today the weather is <b>" + json.weather[0].main + "</b>";
	}
};