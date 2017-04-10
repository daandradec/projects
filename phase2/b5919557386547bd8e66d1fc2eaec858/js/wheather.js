var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=1c524cb83daee34fc39df3344e8ae34a";
xmlhttp.open("GET", url, true);
xmlhttp.send();
var json;

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
        document.getElementById("weather").innerHTML = "Today the weather is <em><b>" + json.weather[0].description + "</b></em><img src='http://openweathermap.org/img/w/"+json.weather[0].icon +".png'"+ "/>";
        //  document.getElementById("iconW").src = "http://openweathermap.org/img/w/"+json.weather[0].icon+".png"
        document.getElementById("cloud").innerHTML = json.clouds.all+"%"
        document.getElementById("cloud1").innerHTML = json.clouds.all+"%"


        document.getElementById("tem").innerHTML = json.main.temp+"°K"
        document.getElementById("tem1").innerHTML = json.main.temp+"°K"

        document.getElementById("temL").innerHTML = json.main.temp_min+"°K"
        document.getElementById("temL1").innerHTML = json.main.temp_min+"°K"

        document.getElementById("temH").innerHTML = json.main.temp_max+"°K"
        document.getElementById("temH1").innerHTML = json.main.temp_max+"°K"

        document.getElementById("wind").innerHTML = json.wind.speed+"m/s"
        document.getElementById("wind1").innerHTML = json.wind.speed+"m/s"
    }
};
$(function() {
    $( "#show-option" ).tooltip({
        show: {
        effect: "slideDown",
        delay: 300
        }
    });
});
