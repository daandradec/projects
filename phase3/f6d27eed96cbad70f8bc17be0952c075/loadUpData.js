var xmlhttp = new XMLHttpRequest();
var url = "https://data.cityofchicago.org/resource/uahe-iimk.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var myArr = xmlhttp.responseText;		
	}
};
var json = JSON.parse(myArr);
