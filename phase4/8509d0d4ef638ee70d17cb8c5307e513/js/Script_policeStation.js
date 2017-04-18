function SeeStations(){
	var LatU=41.8708;
	var LonU=-87.6505
	var VerIndx=document.getElementById("SelcSecu").selectedIndex;
	var Ver = document.getElementById("SelcSecu").options[VerIndx].value; //yes or not
	var xmlhttp = new XMLHttpRequest(); 
	var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var myArr;
	var text;
	var json;
	var numberOfPA;
	
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myArr = xmlhttp.responseText;
	        text = myArr;
	        json = JSON.parse(text);
	        numberOfPA = json.data.length;
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            	if (Ver=="Yes"){	            	
		        	latLng = JSON.parse('{ "lat":'+ json.data[i][20] +', "lng":'+ json.data[i][21] +' }');
		        	var n = new google.maps.Marker({
							    	position: latLng,
							   		map: map,
							  		icon: 'img/police_ico.png'
							  	});
					
				}
			
	        }
		}
	}	
	
}