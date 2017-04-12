var xmlhttp2 = new XMLHttpRequest();
var url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
xmlhttp2.open("GET", url, true);
xmlhttp2.send();

xmlhttp2.onreadystatechange = function() {
	if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
		var myArr = xmlhttp2.responseText;
		var text = myArr;
		var json = JSON.parse(text);
		for(var i = 0; i < json.data.length; i++){
			var x = document.getElementById("firestation");
			var option = document.createElement("option");
			option.text = json.data[i][8] + " - " + json.data[i][9];
			x.add(option);
		}
	}
};