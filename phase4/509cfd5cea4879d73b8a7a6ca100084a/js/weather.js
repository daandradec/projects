weather();
function weather(){
	var xmlhttp = new XMLHttpRequest();
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%2012778445&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

	        var loc = xmlhttp.responseText;
	        var text = JSON.parse(loc);
	        console.log(text);
	        console.log(1);
	        var condition = text.query.results.channel.item.condition.text;
	        temp = text.query.results.channel.item.condition.temp;
	        output_weather(condition, temp);
	    }
	};
}

function output_weather(condition, temp){
	var report = "Today's weather is " + condition + "!";
	$("#card").html('<CENTER><br><h1 style="font-size: 30px;">' + report + '</h1>' +  '<h2 style="font-size: 30px;">' + "Temperature: "+temp + "F" + '</h2></CENTER>');
}