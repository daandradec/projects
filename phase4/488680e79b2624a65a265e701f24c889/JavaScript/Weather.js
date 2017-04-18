function getWeather(map){
var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=ae433d940b847d325cf152363304bcf8";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);

        document.getElementById("weather").innerHTML = "In this moment the weather is: <b>" + json.weather[0].main + "</b>";
      }}}