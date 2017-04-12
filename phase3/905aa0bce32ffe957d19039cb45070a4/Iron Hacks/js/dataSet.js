// JavaScript Document

var myObj, txt = "", x;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
		txt += "<table border='1'>";
		
		
		for(var i = 0; i < 20; i++){
			txt += "<tr><td class='text-left'>" + myObj[i].property_name + "</td><td>" + myObj[i].address + "</td></tr>";
		}

		txt += "</table>";
        document.getElementById("tabla").innerHTML = txt;
    }
};
xmlhttp.open("GET", "https://data.cityofchicago.org/resource/uahe-iimk.json", true);
xmlhttp.send();

