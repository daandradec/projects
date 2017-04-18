//// JavaScript Document
//var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=CITY:US170006&startdate=2017-04-09&enddate=2017-04-09";
//
//var aux = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&station=GHCND:AEM00041194&units=metric";
//
//var dataTypes = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&station=GHCND:AEM00041194&units=metric&startdate=2017-04-16&endate=2017-04-16";
//
//function isDigit(val){
//	if(val >= 0 && val <=9)
//		return "0"+val;
//	else
//		return val;
//}
//
//var d = new Date();
//
//var year = d.getFullYear();
//var month = isDigit(d.getMonth()+1);
//var day = isDigit(d.getDate() - 1);
//
//var strDate = year + "-" + month + "-" + day; 
//aux += "&startdate="+strDate+"&enddate="+strDate;
//
//
//
//$.ajax({
//	dataType: 'JSON',
//	url: aux,
//	type: "GET",
//	headers: {
//		token: 	"cHnMXldKcwmRpwFQEmlcbcQkhmrxfqRc"
//	},
//	
//	success: function(data){
//		console.log("GOT THOS", data);
//		
//		$(document).ready(function(){
//			
//		$.each(data, function(i, elem){
//			console.log("My data: ");
//			if(elem.datatype == "PRCP"){
//				console.log("Found this man !!!!!!!!!!"),
//				if(elem.value == 0){
//					$('.weather').hmtl('<h3> Clima soleado </h3>');
//				}else if(elem.value > 0 && elem.value < 10){
//					$('.weather').hmtl('<h3> Lluvia ligera </h3>');
//				}else{
//					$('.weather').hmtl('<h3> Lluvia fuerte </h3>');
//				}
//				
//				return false;	
//			}
//			
//			
//		});
//		});
//
//		
//	}
//	
//});// JavaScript Document

$.ajax({
	url: "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c",
	dataType: 'JSON',
	type: "GET",
	
	success: function(data){
		
		var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
		var weatherIcon = "<img src='" + iconUrl + "'>"; 
		$(document).ready(function(){
			$('.weather').html("<p> Want to check?, the weather is: <b>" + data.weather[0].main + "</b>" + weatherIcon+ "</p>");
		});
	}
	
	
});