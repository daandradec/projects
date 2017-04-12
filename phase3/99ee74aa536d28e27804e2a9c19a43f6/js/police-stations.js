function getPoliceStations(typeMarker, callback){
	var parkxmlhttp = new XMLHttpRequest();
	//var parkurl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=FIPS:17&datatypeid=PRCP&startdate=2017-03-30&enddate=2017-03-30"//FIPS:37&startdate="+date+"&enddate="+date;
	var parkurl="https://data.cityofchicago.org/resource/4xwe-2j3y.json"

	parkxmlhttp.open("GET", parkurl, true);
	parkxmlhttp.send();
	var washedData=[];
	var maxDate=""
	var whole=["60613", "60608", "60612", "60644", "60616", "60622", "60610", "60624", "60607", "60623", "60605", "60601", "60647", "60642"]
	var near=["60612", "60616", "60608", "60607", "60605", "60601"]
	var nearest=["60607", "60608"]

	parkxmlhttp.onreadystatechange = function(){
		var pinColor = "00ff00";
		if (parkxmlhttp.readyState == 4 && parkxmlhttp.status == 200){
		 	var resp=parkxmlhttp.responseText;
		 	var plResult = JSON.parse(resp);
			var area;
			if (typeMarker===0){
				area=whole.slice();
			}else if (typeMarker===1){
				area=near.slice();
			}else{
				area=nearest.slice();
			}
			var result=[]
			for (var i = plResult.length - 1; i >= 0; i--) {
				var data=[]
				var rest=plResult[i];
				var ac=Number(rest.acres)
				if (area.indexOf(rest.zip)!==-1 and ac>5){
					
					data.push(rest.park_name)
					data.push(rest.street_address)
					data.push(rest.location.coordinates[0])
					data.push(rest.location.coordinates[0])
					result.push(data)
				}
			}
			callback(result);
		}
	}
}