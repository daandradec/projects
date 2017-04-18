function prcp(){
	$(document).ready(function(){
	$.ajax({		
		url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=CITY:US170006&startdate=2017-04-14&enddate=2017-04-15&units=metric",		
		headers: {token: 'hoKWeFxeNRrQNkbzIfKnNcXvDmMueMzQ'},
		success: function(data){
			document.getElementById("climate").innerHTML = 'Precipitation: '+ data.results[0].value + ' mm'
				+'<br>Date: '+data.results[0].date;	
			console.log(data.results[0].value);	
		},
		error: function(){
			alert("error");
		}
	})
	})
		
}