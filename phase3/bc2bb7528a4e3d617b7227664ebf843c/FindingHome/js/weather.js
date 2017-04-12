var data;
var Paused=true;
function  main(){
  //create a new httprequest for this session
  var xmlhttp = new XMLHttpRequest();
  //json format data resource url
  var url = "http://forecast.weather.gov/MapClick.php?lat=41.8708&lon=-87.6505&FcstType=json";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();


  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var myArr = xmlhttp.responseText;
          var text = myArr;
          var json = JSON.parse(text);
          data = [{"id":"TMP","order":1,"score":json.currentobservation.Temp,"weight":1,"color":"#0099ff","label":"Temperature"}
                  ,{"id":"DEW","order":2,"score":json.currentobservation.Dewp,"weight":1,"color":"#cc00ff","label":"Dewpoint"}
                  ,{"id":"REH","order":3,"score":json.currentobservation.Relh,"weight":1,"color":"#ff3366","label":"Relativy Humidity"}
                  ,{"id":"WDS","order":4,"score":json.currentobservation.Winds,"weight":1,"color":"#cc3300","label":"Wind Speed"}
                  ,{"id":"GST","order":5,"score":json.currentobservation.Gust,"weight":1,"color":"#ff6600","label":"Wind Gust"}
                  ,{"id":"VIS","order":6,"score":json.currentobservation.Visibility,"weight":1,"color":"#ffff33","label":"Visibility"}
                  ,{"id":"SLP","order":7,"score":json.currentobservation.SLP,"weight":1,"color":"#cccc00","label":"Sea Level Pressure (SLP)"}];
          //alert(JSON.parse(text).coord.lon);
          //document.getElementById("id01").innerHTML = myArr;
          document.getElementById("name").innerHTML = "Name Station: <em><b>" + json.currentobservation.name+ "</b></em>";
          document.getElementById("temp").innerHTML = "Temperature: <em><b>" + json.currentobservation.Temp+ "</b></em>";
          document.getElementById("weat").innerHTML = "Weather: <em><b>" + json.currentobservation.Weather+ "</b></em>";
          document.getElementById("dewpoint").innerHTML = "Dewpoint: <em><b>" + json.currentobservation.Dewp+ "</b></em>";
          document.getElementById("relahum").innerHTML = "Relativy Humidity: <em><b>" + json.currentobservation.Relh+ "</b></em>";
          document.getElementById("windspeed").innerHTML = "Wind Speed: <em><b>" + json.currentobservation.Winds+ "</b></em>";
          document.getElementById("gust").innerHTML = "Wind Gust: <em><b>" + json.currentobservation.Gust+ "</b></em>";
          document.getElementById("visibility").innerHTML = "Visibility: <em><b>" + json.currentobservation.Visibility+ "</b></em>";
          document.getElementById("slp").innerHTML = "Sea Level Pressure (SLP): <em><b>" + json.currentobservation.SLP+ "</b></em>";
          document.getElementById("windchill").innerHTML = "Wind Chill Factor: <em><b>" + json.currentobservation.WindChill+ "</b></em>";
          Paused=false;
      }
  };
}
main();
