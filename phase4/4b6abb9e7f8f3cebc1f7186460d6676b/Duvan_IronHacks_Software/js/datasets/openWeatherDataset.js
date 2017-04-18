var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?id=4887442&units=metric&appid=6aa0bdb1f586c5630d60b6237dfce45c";
var dataWeatherJson;
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var json = JSON.parse(myArr);
        dataWeatherJson = json;
        console.log(json);
        document.getElementById("paragraph4").innerHTML = json.main.temp+"°";
        document.getElementById("description").innerHTML = json.weather[0].description;
        document.getElementById("maxTmp").innerHTML = json.main.temp_max+"°";
        document.getElementById("minTmp").innerHTML = json.main.temp_min+"°";
    }
};


