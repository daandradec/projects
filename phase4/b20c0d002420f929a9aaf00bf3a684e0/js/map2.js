var map;
var datosLimpios = [];
var xd =['assets/college.png','assets/rent.png','assets/food.png','assets/fun.png','assets/study.png']
var markers = []
var elevator;
//create and draw the map in the mash-up
function initMap() {
  var uluru = {lat: 41.8708, lng: -87.6505};
  map = new google.maps.Map(document.getElementById('map'), {
    center: uluru,
    zoom: 15,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU ,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,

  });
   map.setTilt(45);
   var marker = new google.maps.Marker({
             icon: xd[0],
             position: uluru,
             map: map,
             title: 'Departament of Electrical & Computer Engineering'
           });

}


/*create a request into a rent dataset*/
var xmlhttp = new XMLHttpRequest();
    //json format data resource url
    var url = ["https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD",
               "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD",
               "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD",
               "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD"];
    //basic data from JSON
    var lookingdata = 0;
    var lalitudeJson = 19;
    var longitudeJson = 20;
    var adressJson = 12;
    var posIcon = 1;
    //Create a new function that will get te dataset selected by the user
    $(function(){
      $("#home").click(function(){
        lookingdata=0;
        latitudeJson = 19;
        longitudeJson = 20;
        adressJson = 12;
        posIcon = 1;
        xmlhttp.open("GET", url[lookingdata], true);
        xmlhttp.send();
      });
      $("#food").click(function(){
        console.log("FOOD");
        lookingdata=1;
        latitudeJson = 18;
        longitudeJson = 19;
        adressJson = 8;
        posIcon = 2;
        xmlhttp.open("GET", url[lookingdata], true);
        xmlhttp.send();
      });
      $("#fun").click(function(){
        console.log("FUN");
        lookingdata=2;
        latitudeJson = 13;
        longitudeJson = 12;
        adressJson = 10;
        posIcon = 3;
        xmlhttp.open("GET", url[lookingdata], true);
        xmlhttp.send();
      });
      $("#study").click(function(){
        console.log("STUDY");
        lookingdata=3;
        latitudeJson =  18;
        longitudeJson = 18;
        adressJson = 12;
        posIcon = 4;
        xmlhttp.open("GET", url[lookingdata], true);
        xmlhttp.send();
      });





    });


  /*Once my request be ready let's work with the data*/
  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     //get the text content from the page response
     var myArr = xmlhttp.responseText;
     var text = myArr;
     json = JSON.parse(text);

//look if I have some markers
    //clear all markers
      for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
            console.log("lol");
          }

    //clear all the data arrays
     if(markers.length > 0){
       datosLimpios = [];
       markers = [];
       console.log("LIMPIO TODO");
     }

     for (var i= 0; i<json.data.length;i++){
       var linea = [];
       if(lookingdata == 3){
       //latitude - 0
       linea.push(json.data[i][latitudeJson][1]);
       //longitude - 1
       linea.push(json.data[i][longitudeJson][2]);
       // adress - 2
       linea.push(json.data[i][adressJson]);

       }else{
       //latitude - 0
       linea.push(json.data[i][latitudeJson]);
       //longitude - 1
       linea.push(json.data[i][longitudeJson]);
       // adress - 2
       linea.push(json.data[i][adressJson]);
       }
       datosLimpios.push(linea);
     };

//Draw markers
//add markers on the map
            // var markers = [];
            // Create an ElevationService

            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            // getting bounds of current location
            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();
            // adding  markers to the map at random locations
            var locations = [];
            for (var j = 0; j < markers.length; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            // Create a LocationElevationRequest object using the array's one value
            var positionalRequest = {
                'locations': locations
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status){

              console.log("HOLIq");
              console.log(status);
               if (status === google.maps.ElevationStatus.OK){
                 console.log("HOLI2");

                   $.each(results, function(key, value) {
                     console.log("HOLI3");
                     console.log(key);
                          markers[key] = new google.maps.Marker({
                                icon:xd[posIcon],
                                position: {lat: Number(datosLimpios[key][0]), lng: Number(datosLimpios[key][1])},
                                map: map,
                                title: datosLimpios[i][2]
                              });//marker create

                   });



              }
            }); //fin elevator





///













    //  for(var i=0; i < datosLimpios.length;i++){
    //         var marker =    new google.maps.Marker({
    //                         icon:xd[posIcon] ,
    //                         position: {lat: Number(datosLimpios[i][0]), lng: Number(datosLimpios[i][1])},
    //                         map: map,
    //                         title: datosLimpios[i][2]
    //                     });
    //                     markers.push(marker)
     //
    //                     google.maps.event.addListener(markers[i], 'click', function(){
    //                                         //if another window is open, close it
    //                                         console.log(  datosLimpios[i][2]  );
    //                                       });

   }
}
