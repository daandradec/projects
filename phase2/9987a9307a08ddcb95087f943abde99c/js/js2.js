//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?datacategoryid=TEMP&limit=56";
var token = "XbUKNpcAVlnLSkwJtuPveEiqVFkmmGBp";

xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader("Token", token);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
    
        document.getElementById("weather").innerHTML = "Today the weather is <em><b>" + json + "</b></em>";
    }
};



