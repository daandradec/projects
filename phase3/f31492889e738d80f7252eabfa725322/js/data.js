var xmlhttp = new XMLHttpRequest();

var url = "https://data.cityofchicago.org/resource/77jv-5zb8.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        
        //alert(json);
    }
}

