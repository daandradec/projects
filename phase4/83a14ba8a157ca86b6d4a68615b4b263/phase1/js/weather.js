//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
       //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
    
        document.getElementById("w").innerHTML = "<p>Today the weather is <b>" + json.weather[0].main +"</b>.</p> " + 
		"Temp Max: <b>" + json.main.temp_max+" F°</b>" + "  Temp Min: <b>" + json.main.temp_min+" F°</b>" 
    }
};
