var map;
var datosLimpios = [];
var xd =['assets/college.png','assets/rent.png','assets/food.png','assets/fun.png','assets/study.png']
var markers = []
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
    var infr1,infr2,infr3,infr4;
    var str1,str2,str3,str4;
    //Create a new function that will get te dataset selected by the user
    $(function(){
      $("#home").click(function(){
        console.log("HOME");
        lookingdata=0;
        latitudeJson = 19;
        longitudeJson = 20;
        adressJson = 12;
        posIcon = 1;
        str1="  Comunity area";
        infr1 = 8;
        str2="  ZIP CODE";
        infr2 = 13;
        str3="  MANAGEMENT COMPANY";
        infr3 = 15;
        str4= " ADRESS";
        infr4 = 12;
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
        str1="  OPEN";
        infr1 = 11;
        str2="  CLOSE";
        infr2 = 12;
        str3="  LOCATION";
        infr3 = 8;
        str4="  TYPE";
        infr4 = 16;
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
        str1="  PARK";
        infr1 = 8;
        str2="  NAME";
        infr2 = 10;
        str3="  ARTIST";
        infr3 = 14;
        str4="  OWNER";
        infr4 = 15;
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
        str1="  HOURS OF OPERAION";
        infr1 = 9;
        str2="  CYBERNAVIGATION";
        infr2 = 10;
        str3="  TEACHER";
        infr3 = 11;
        str4="  ADRESS";
        infr4 = 12;
        xmlhttp.open("GET", url[lookingdata], true);
        xmlhttp.send();
      });
    });//end of click function





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
          }

    //clear all the data arrays
     if(markers.length > 0){
       datosLimpios = [];
       markers = [];
       console.log("LIMPIO TODO");
     }

     function getRandom(max) {
       return Math.floor(Math.random() * (max - 2)) + 3;
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
       //1 -3
       linea.push(json.data[i][infr1]);
       //2 -4
       linea.push(json.data[i][infr2]);
       //3 -5
       linea.push(json.data[i][infr3]);
       //4 -6
       linea.push(json.data[i][infr4]);
       }else{
       //latitude - 0
       linea.push(json.data[i][latitudeJson]);
       //longitude - 1
       linea.push(json.data[i][longitudeJson]);
       // adress - 2
       linea.push(json.data[i][adressJson]);
       //1 -3
       linea.push(json.data[i][infr1]);
       //2 -4
       linea.push(json.data[i][infr2]);
       //3 -5
       linea.push(json.data[i][infr3]);
       //4 -6
       linea.push(json.data[i][infr4]);
       }
       datosLimpios.push(linea);
     };
//chart
var svg = d3.select(".Informacion")
	.append("svg")
	.append("g")

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

var width = 400,
    height = 400,
	radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.label; };

var color = d3.scale.ordinal()
	.domain(["CONFORTABLE","SIZE","PRICE","RATE","DISTANCE"])
	.range(["#2D4059", "#622569", "#E84545", "#F07B3F", "#FF9A00"]);

function randomData (){
	var labels = color.domain();
	return labels.map(function(label){
		return { label: label, value: Math.random() }
	});
}
//Keep chart
function change(data) {

/* ------- PIE SLICES -------*/
var slice = svg.select(".slices").selectAll("path.slice")
.data(pie(data), key);

slice.enter()
.insert("path")
.style("fill", function(d) { return color(d.data.label); })
.attr("class", "slice");

slice
.transition().duration(1000)
.attrTween("d", function(d) {
this._current = this._current || d;
var interpolate = d3.interpolate(this._current, d);
this._current = interpolate(0);
return function(t) {
return arc(interpolate(t));
};
})

slice.exit()
.remove();


};

//Draw markers
     var rnd;
     for(var i=0; i < datosLimpios.length;i++){

            var marker =    new google.maps.Marker({
                            icon:xd[posIcon] ,
                            position: {lat: Number(datosLimpios[i][0]), lng: Number(datosLimpios[i][1])},
                            map: map,
                            title: datosLimpios[i][2]
                        });
                        markers.push(marker)

                        google.maps.event.addListener(markers[i], 'click', function(){
                                            //clean data
                                            $(".inf").empty();
                                            rnd = getRandom(markers.length);
                                            var clean = datosLimpios[rnd][0];
                                            // console.log(rnd);
                                            $("#inf1").text(str1+":   "+datosLimpios[rnd][3]);
                                            $("#inf2").text(str2+":   "+datosLimpios[rnd][4]);
                                            $("#inf3").text(str3+":   "+datosLimpios[rnd][5]);
                                            $("#inf4").text(str4+":   "+datosLimpios[rnd][6]);
                                            change(randomData());
                                          });

        }//ok map

   }
}
