/*longitude -87.6659809767 latitude 41.8822718277

longitude -87.6616918421 latitude 41.866806049

 longitude -87.6693820787 latitude 41.8587687803
*/
var marker;
var marker2;
var marker3;

 function option1(map){
 	marker = new google.maps.Marker({
        position: new google.maps.LatLng(41.8822718277,-87.6659809767),
        map: map,
        //se copia el url de la imagen que se desea utilizar                           
        optimized:false,
     });
 	if(map!=null){
 		map.setCenter(new google.maps.LatLng(41.8822718277,-87.6659809767))       
 	
 	}
 }
 function option2(map){
 	marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(41.866806049,-87.6616918421),
        map: map,
        //se copia el url de la imagen que se desea utilizar                           
        optimized:false,
     });
 	if(map!=null){
 		map.setCenter(new google.maps.LatLng(41.866806049,-87.6616918421))       
 	
 	}
 }
function option3(map){
 	marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(41.8587687803,-87.6693820787),
        map: map,
        //se copia el url de la imagen que se desea utilizar                           
        optimized:false,
     });
 	if(map!=null){
 		map.setCenter(new google.maps.LatLng(41.8587687803,-87.6693820787))       
 	
 	}
 }


