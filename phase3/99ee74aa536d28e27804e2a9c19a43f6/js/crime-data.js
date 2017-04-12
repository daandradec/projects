var crimeWashedData=[];

function setCrime(){
	var crimexmlhttp = new XMLHttpRequest();

	var crimeurl = "https://data.cityofchicago.org/resource/6zsd-86xi.json"

	crimexmlhttp.open("GET", crimeurl, true);
	crimexmlhttp.send();
	var washedData=[];

	crimexmlhttp.onreadystatechange = function(){
		 if (crimexmlhttp.readyState == 4 && crimexmlhttp.status == 200){
		 	var resp=crimexmlhttp.responseText;
		 	var result = JSON.parse(resp);
		 	var nearCommunities=[28, 32, 33, 31, 29, 31, 25, 8, 34, 24, 27, 60, 59]
		 	for (var i = 0; i < result.length; ++i){
		 		data=[];
		 		crime=result[i]
		 		area=Number(crime.community_area)
		 		if (crime.year>2015 && nearCommunities.indexOf(area)!==-1){
		 			//0-Type of crime
		 			var type=crime.primary_type
		 			if(type==='BATTERY'){
		 				type='ASSAULT'
		 			}else if(type==='THEFT'){
		 				type='ROBBERY'
		 			}
		 			data.push(type)
		 			//1-Was Arrested
		 			data.push(crime.arrest)
		 			//3-Community Area
		 			data.push(crime.community_area)
		 			//4-Year
		 			data.push(crime.year)
		 			//5-Latitude
		 			data.push(crime.latitude)
		 			//6-Longitude
		 			data.push(crime.longitude)
		 			washedData.push(data)
		 		}
		 	}
		 	//console.log(washedData)
		 	crimeWashedData=washedData.slice();

		}
	}
}

function setCrimeWashedData(){
	setCrime();
	crimeWashedData;
}

function getCrimeWashedData(){
	return crimeWashedData
}
