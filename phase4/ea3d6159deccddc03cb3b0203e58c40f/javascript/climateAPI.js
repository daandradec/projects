var dataWeather = [];

function loadWeather(){
	var infoWeather = new XMLHttpRequest();
	infoWeather.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c", true);
	infoWeather.send();

	infoWeather.onreadystatechange = function() {
		 if (infoWeather.readyState == 4 && infoWeather.status == 200) {
		 	var text = infoWeather.responseText;
		 	var json = JSON.parse(text);

		 	$("#b").css("font-family", "CaviarDreams");
		 	$("#b").css("font-weight", "bold");
		 	$("#b").text("Weather is: " + json.weather[0].main);
		 }
	}
}