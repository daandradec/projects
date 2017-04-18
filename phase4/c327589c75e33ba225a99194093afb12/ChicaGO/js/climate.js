

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
        var climate = json.weather[0].main;
        document.getElementById("climate").innerHTML = "Today the weather is <em><b>" + climate + "</b></em>";
        if (climate == "Clouds") {
          $(document).ready(function(){
                  $("#info-section").css("background-image", "url(\"css/cloudsDes.jpg\")");
                  $("#climate").css("background-image", "url(\"css/clouds.jpg\")");

          });
        }else {
          if (climate == "Rain") {
            $(document).ready(function(){
              $("#info-section").css("background-image", "url(\"css/rainDes.jpg\")");
              $("#climate").css("background-image", "url(\"css/rain.jpg\")");

            });
          } else {
            if (climate == "Snow") {
              $(document).ready(function(){
                $("#info-section").css("background-image", "url(\"css/snowDes.jpg\")");
                $("#climate").css("background-image", "url(\"css/snow.jpg\")");
              });
            } else {
              if (climate == "Clear") {
                $(document).ready(function(){
                  $("#info-section").css("background-image", "url(\"css/clearDes.jpg\")");
                  $("#climate").css("background-image", "url(\"css/clear.jpg\")");
                });
              } else {


              }
            }
          }
        }

  }
};
