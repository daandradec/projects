 importScripts('cvsToJson.js');
  importScripts('../mapFunctions.js');


self.addEventListener("message",function(e){

 	var support = e.data.sup;
 	var address = e.data.addr;
  var houses = e.data.houses;// string
  var id = e.data.id;
  var city = e.data.city;
 	var xhttp;
  var outputObject = {};
  var result;


  var max = houses.length;

  for(var i =0;i<max;i++){

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
        
          houses[i].xmlData = this.responseText;
        }
    };

    if(typeof(FormData)!=='undefined'){
      var data = new FormData();
        data.append('type','zillowData');
        data.append('linkAddress',address);
        data.append('id',id);
        data.append('cityCode',city);
        data.append('houseAddress',houses[i].address);

         xhttp.open("POST","../../proxy.php", false);

         xhttp.responseType = 'document';
        //probando
        xhttp.overrideMimeType('text/xml');
        xhttp.send(data);
    }else{
      console.log('<error>: Form Data undefined in worker ...');
    }
  }
  postMessage(houses);

},false);

   
