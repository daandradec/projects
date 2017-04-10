var xmlhttp3 = new XMLHttpRequest();
var url = "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD";
xmlhttp3.open("GET", url, true);
xmlhttp3.send();

xmlhttp3.onreadystatechange = function() {
	if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
		var myArr = xmlhttp3.responseText;
		var text = myArr;
		var json = JSON.parse(text);
		for(var i = 0; i < json.data.length; i++){
			var x = document.getElementById("farmermarket");
			var option = document.createElement("option");
			option.text = json.data[i][8] + " - " + json.data[i][9];
			x.add(option);
		}
	}
};