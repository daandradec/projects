
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
		var size = " pe-5x pe-va"    
        document.getElementById("text_weather").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";
        x = document.getElementById("imgWeather");
        y = json.weather[0].main;
        //x.className ="pe-is-w-rain-1" + size ;

        if(y =="Clouds"){
        	x.className ="pe-is-w-mostly-cloudy-2" + size ;
        }else if(y == "Rain"){
        	x.className ="pe-is-w-rain-1" + size ;
        }else if(y == "Clear"){
        	x.className ="pe-is-w-sun-2" + size ;
        }else if("Drizzle"){
        	x.className ="pe-is-w-drizzle" + size ;

        } 
	
    }
};