
var xmlhttp = new XMLHttpRequest();
//document.getElementById("area-name").innerHTML = "hola";
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();
//init the google map in the webpage

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //get the text content from the page response
        var myArr = xmlhttp.responseText;
        var text = myArr;
        json = JSON.parse(text);

            document.getElementById("description").innerHTML= "<b>Weather condition</b>: <em>"+json.weather[0].description;
            document.getElementById("temp").innerHTML= "<b>Temperature</b>: <em>"+(Number(json.main.temp_min) - 273.15).toFixed(1) + " ºC";
            document.getElementById("humidity").innerHTML= "<b>Humidity</b>: <em>"+json.main.humidity + " %";
            document.getElementById("temp_min").innerHTML= "<b>Minimum temperature at the moment</b>: <em>"+(Number(json.main.temp_min) - 273.15) + " ºC";
            document.getElementById("temp_max").innerHTML= "<b>Maximum temperature at the moment</b>: <em>"+(Number(json.main.temp_max) - 273.15) + " ºC";
    }
};
