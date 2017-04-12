var map;
var datosLimpios = [];
//create and draw the map in the mash-up
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708 , lng: -87.6505},
    zoom: 15,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU ,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,

  });
   map.setTilt(45);

}


/*create a request into a rent dataset*/
var xmlhttp = new XMLHttpRequest();
    //json format data resource url
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  /*Once my request be ready let's work with the data*/
  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     //get the text content from the page response
     var myArr = xmlhttp.responseText;
     var text = myArr;
     json = JSON.parse(text);
     for (var i= 0; i<263;i++){
       var linea = [];
       //latitude - 0
       linea.push(json.data[i][19]);
       //longitude - 1
       linea.push(json.data[i][20]);
       // adress - 2
       linea.push(json.data[i][12]);
       datosLimpios.push(linea);
     };
     var markers = [];
     var xd ='assets/college.png'
     var uluru = {lat: 41.8708, lng: -87.6505};
     var marker = new google.maps.Marker({
               icon: xd,
               position: uluru,
               map: map,
               title: 'Departament of Electrical & Computer Engineering'
             });


     for(var i=0; i < datosLimpios.length;i++){
       markers[i] = new google.maps.Marker({
                            icon: 'assets/rent.png',
                            position: {lat: Number(datosLimpios[i][0]), lng: Number(datosLimpios[i][1])},
                            map: map,
                            title: datosLimpios[i][2]
                            //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                        });
                    }


   }
}
