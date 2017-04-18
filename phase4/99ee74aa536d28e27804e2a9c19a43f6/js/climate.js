/*$(document).ready(function(){
	$("#climate_button").click(function(){
		$.ajax({
  			type: "GET"
  			url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations"
  			dataType:"json"
  			beforeSend: function(request) {
    			request.setRequestHeader("token", "kiCELWYgmLBQPJOEcUQYrtyjsIPeRmel");
  			}
		});
	})
})*/



var climateWashedData=[];
var maxDate=""


function setDate(date){
	console.log(date)
	maxDate=date
}

function getDate(){
	return maxDate
}

function setMaxDate(){
	var climatexmlhttp = new XMLHttpRequest();
	//var climateurl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=FIPS:17&datatypeid=PRCP&startdate=2017-03-30&enddate=2017-03-30"//FIPS:37&startdate="+date+"&enddate="+date;
	var climateurl="https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/FIPS:17"

	climatexmlhttp.open("GET", climateurl, true);
	climatexmlhttp.setRequestHeader("token", "kiCELWYgmLBQPJOEcUQYrtyjsIPeRmel")

	climatexmlhttp.send();
	var washedData=[];
	var maxDate=""
	climatexmlhttp.onreadystatechange = function(){
		var pinColor = "00ff00";
		if (climatexmlhttp.readyState == 4 && climatexmlhttp.status == 200){
		 	var resp=climatexmlhttp.responseText;
		 	var clResult = JSON.parse(resp);
			console.log(clResult)
		 	setDate(clResult.maxdate)
		}
	}

}


function setclimate(ZIPCODE){
	var climatexmlhttp = new XMLHttpRequest();
	var maxDate=getDate()
	var climateurl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=NEXRAD2&locationid=FIPS:17&startdate="+String(maxDate)+"&enddate="+String(maxDate) //FIPS:37&startdate="+date+"&enddate="+date;

	console.log(climateurl)
	climatexmlhttp.open("GET", climateurl, true);
	climatexmlhttp.setRequestHeader("token", "kiCELWYgmLBQPJOEcUQYrtyjsIPeRmel")

	climatexmlhttp.send();
	var washedData=[];
	var maxDate=""
	climatexmlhttp.onreadystatechange = function(){
		var pinColor = "00ff00";
		if (climatexmlhttp.readyState == 4 && climatexmlhttp.status == 200){
		 	var resp=climatexmlhttp.responseText;
		 	var clResult = JSON.parse(resp);
			console.log(clResult)
		 	maxDate=clResult.maxDate
		}

	}
}

function setclimateWashedData(){
	setclimate();
	climateWashedData;
}

function getclimateWashedData(){
	return climateWashedData
}