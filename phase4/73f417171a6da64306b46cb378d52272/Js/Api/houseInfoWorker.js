 importScripts('cvsToJson.js');
  importScripts('../mapFunctions.js');


 self.addEventListener("message",function(e){

 	var support = e.data.sup;
 	var address = e.data.addr;
 	var xhttp;

 	switch(support){
 		case 'xmlhttp':
 			xhttp = new XMLHttpRequest();
 				break;

 		case 'active':
 			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
 				break;

 		default:
 			console.log('<error>: Type of connection undefined in worker ...');
 			return;
 	}

   xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var fixedData = parseCsvToJson(this.responseText);

      var max = fixedData.length;
       var outputArray = [];

       for(var i =0;i<max;i++){
       		if(fixedData[i]["Bldg City"] === "CHICAGO"){

       		outputArray.push(
                {"address":fixedData[i]["Bldg Address1"].replace(/ /gi,"+")});
  			
       		}
       }
       postMessage(outputArray);
    }
  };
  
  	if(typeof(FormData)!=='undefined'){
  		var data = new FormData();
  			data.append('type','realStateUsa');
  			data.append('linkAddress',address);

  			xhttp.open("POST","../../proxy.php", true);
  			xhttp.send(data);
  	}else{
  		console.log('<error>: Form Data undefined in worker ...');
  	}
 },false);

  