function rent2(){
	

	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.xml?$where=within_circle(location, 41.8708, -87.6505, 3000)&appid=LyZAusKpBwuVTvrprJvY7SnjV";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var xmlDoc;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(myArr,"text/xml");
			var txt = "<tr><th>Address</th><th>Phone number</th></tr>";
			//txt += "<table border='2'>"
			for(var i = 0; i <= 20; i++){

				txt += "<tr><td>" +
				xmlDoc.getElementsByTagName("address")[i].childNodes[0].nodeValue +
				"</td><td>" +
				xmlDoc.getElementsByTagName("phone_number")[i].childNodes[0].nodeValue +
				"</td></tr>";
				//txt += "<tr><td>" + xmlDoc.getElementsByTagName("phone_number")[i].childNodes[0].nodeValue + "</td></tr>";
			}
			//txt += "</table>" ;
			document.getElementById("rent").innerHTML = txt;
			//document.getElementById("rent").innerHTML = xmlDoc.getElementsByTagName("phone_number")[0].childNodes[0].nodeValue;
		}
	};

/*
table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";

    */



	//document.getElementById("demo").innerHTML =	xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
	//var txt;
	//var json = JSON.parse(text);
	//document.getElementById("rent").innerHTML=myArr[1].;
	//txt = text.getElementsByTagName("row")[1].childNodes[1].nodeValue;
	//console.log(txt);
	//document.getElementById("rent").innerHTML = myArr;
	/*
	var txt = "";
	txt += "<table border='1'>"
	for(x in json){
		txt += "<tr><td>" + json[x].phone_number + "</td></tr>";
	}
	txt += "</table>" ;
    document.getElementById("rent").innerHTML = txt;
    */



	//document.getElementById("rent").innerHTML = "Today the weather is <em><b>" + json.name + "</b></em>";
}
/*
if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        txt += "<table border='1'>"
        for (x in myObj) {
            txt += "<tr><td>" + myObj[x].name + "</td></tr>";
        }
        txt += "</table>" 
        document.getElementById("demo").innerHTML = txt;
    }


*/