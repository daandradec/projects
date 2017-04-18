// JavaScript Document

//var myObj, txt = "", x;
//
//var xmlhttp = new XMLHttpRequest();
//xmlhttp.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//        myObj = JSON.parse(this.responseText);
//		txt += "<table border='1'>";
//		
//		
//		for(var i = 0; i < 20; i++){
//			txt += "<tr><td class='text-left'>" + myObj[i].property_name + "</td><td>" + myObj[i].address + "</td></tr>";
//		}
//
//		txt += "</table>";
//        document.getElementById("tabla").innerHTML = txt;
//    }
//};
//xmlhttp.open("GET", "https://data.cityofchicago.org/resource/uahe-iimk.json", true);
//xmlhttp.send();




var url = "https://data.cityofchicago.org/resource/uahe-iimk.json";
var query;

$.ajax({
	async: false,
	url: url,
	success: function(data){
		query = data;

	},
	error: function(){
		alert("Error on data loading, City of Chicago.");
	}
	
});


var url = "https://data.cityofchicago.org/resource/dfnk-7re6.json";
var crime;

$.ajax({
	async: false,
	url: url,
	success: function(data){
		crime = data;

	},
	error: function(){
		alert("Error on data loading, City of Chicago.");
	}
	
});
