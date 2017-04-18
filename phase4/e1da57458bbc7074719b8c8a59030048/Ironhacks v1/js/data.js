var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    // Obtain data
    var myArr = xmlhttp.responseText;
    var text = myArr;
    //Convert result data into json
    var json = JSON.parse(text);
    //Show data in the HTML
    document.getElementById("extra-info").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";
  }
};
