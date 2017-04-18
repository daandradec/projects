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
                  ,{"id":"VIS","order":6,"score":json.currentobservation.Visibility,"weight":1,"color":"#ffff33","label":"Visibility"}
                  ,{"id":"SLP","order":7,"score":json.currentobservation.SLP,"weight":1,"color":"#cccc00","label":"Sea Level Pressure (SLP)"}];
          //alert(JSON.parse(text).coord.lon);
          //document.getElementById("id01").innerHTML = myArr;
          Paused=false;
          document.getElementById("name").innerHTML = "Name Station: <em><b>" + json.currentobservation.name+ "</b></em>";
          document.getElementById("temp").innerHTML = "Temperature: <em><b>" + json.currentobservation.Temp+ "°F</b></em>";
          document.getElementById("weat").innerHTML = "Weather: <em><b>" + json.currentobservation.Weather+ "</b></em>";
          document.getElementById("dewpoint").innerHTML = "Dewpoint: <em><b>" + json.currentobservation.Dewp+ "°F</b></em>";
          document.getElementById("relahum").innerHTML = "Relativy Humidity: <em><b>" + json.currentobservation.Relh+ "%</b></em>";
          document.getElementById("windspeed").innerHTML = "Wind Speed: <em><b>" + json.currentobservation.Winds+ " mph</b></em>";
          document.getElementById("visibility").innerHTML = "Visibility: <em><b>" + json.currentobservation.Visibility+ " mi</b></em>";
          document.getElementById("slp").innerHTML = "Sea Level Pressure (SLP): <em><b>" + json.currentobservation.SLP+ " in</b></em>";
          //table information
          document.getElementById("today").innerHTML =  json.time.startPeriodName[0];
          document.getElementById("todayweat").innerHTML =  json.time.tempLabel[0]+ ": "+json.data.temperature[0]+"°F";
          document.getElementById("todaydesc").innerHTML =  json.data.text[0];
          document.getElementById("day2").innerHTML =  json.time.startPeriodName[1];
          document.getElementById("day2weat").innerHTML =  json.time.tempLabel[1]+ ": "+json.data.temperature[1]+"°F";
          document.getElementById("day2desc").innerHTML =  json.data.text[1];
          document.getElementById("day3").innerHTML =  json.time.startPeriodName[2];
          document.getElementById("day3weat").innerHTML =  json.time.tempLabel[2]+ ": "+json.data.temperature[2]+"°F";
          document.getElementById("day3desc").innerHTML =  json.data.text[2];
          document.getElementById("day4").innerHTML =  json.time.startPeriodName[3];
          document.getElementById("day4weat").innerHTML =  json.time.tempLabel[3]+ ": "+json.data.temperature[3]+"°F";
          document.getElementById("day4desc").innerHTML =  json.data.text[3];
          document.getElementById("day5").innerHTML =  json.time.startPeriodName[4];
          document.getElementById("day5weat").innerHTML =  json.time.tempLabel[4]+ ": "+json.data.temperature[4]+"°F";
          document.getElementById("day5desc").innerHTML =  json.data.text[4];
          document.getElementById("day6").innerHTML =  json.time.startPeriodName[5];
          document.getElementById("day6weat").innerHTML =  json.time.tempLabel[5]+ ": "+json.data.temperature[5]+"°F";
          document.getElementById("day6desc").innerHTML =  json.data.text[5];
          document.getElementById("day7").innerHTML =  json.time.startPeriodName[6];
          document.getElementById("day7weat").innerHTML =  json.time.tempLabel[6]+ ": "+json.data.temperature[6]+"°F";
          document.getElementById("day7desc").innerHTML =  json.data.text[6];
          document.getElementById("day8").innerHTML =  json.time.startPeriodName[7];
          document.getElementById("day8weat").innerHTML =  json.time.tempLabel[7]+ ": "+json.data.temperature[7]+"°F";
          document.getElementById("day8desc").innerHTML =  json.data.text[7];
          document.getElementById("day9").innerHTML =  json.time.startPeriodName[8];
          document.getElementById("day9weat").innerHTML =  json.time.tempLabel[8]+ ": "+json.data.temperature[8]+"°F";
          document.getElementById("day9desc").innerHTML =  json.data.text[8];
          document.getElementById("day10").innerHTML =  json.time.startPeriodName[9];
          document.getElementById("day10weat").innerHTML =  json.time.tempLabel[9]+ ": "+json.data.temperature[9]+"°F";
          document.getElementById("day10desc").innerHTML =  json.data.text[9];
          document.getElementById("day11").innerHTML =  json.time.startPeriodName[10];
          document.getElementById("day11weat").innerHTML =  json.time.tempLabel[10]+ ": "+json.data.temperature[10]+"°F";
          document.getElementById("day11desc").innerHTML =  json.data.text[10];
          document.getElementById("day12").innerHTML =  json.time.startPeriodName[11];
          document.getElementById("day12weat").innerHTML =  json.time.tempLabel[11]+ ": "+json.data.temperature[11]+"°F";
          document.getElementById("day12desc").innerHTML =  json.data.text[11];
          document.getElementById("day13").innerHTML =  json.time.startPeriodName[12];
          document.getElementById("day13weat").innerHTML =  json.time.tempLabel[12]+ ": "+json.data.temperature[12]+"°F";
          document.getElementById("day13desc").innerHTML =  json.data.text[12];
          document.getElementById("day14").innerHTML =  json.time.startPeriodName[13];
          document.getElementById("day14weat").innerHTML =  json.time.tempLabel[13]+ ": "+json.data.temperature[13]+"°F";
          document.getElementById("day14desc").innerHTML =  json.data.text[13];
      }
  };
}
main();
