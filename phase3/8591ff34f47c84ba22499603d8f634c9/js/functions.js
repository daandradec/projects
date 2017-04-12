function getData(id) {
    $.ajax({
        //url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets",
        //url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid="+id+"&startdate=2016-01-01&enddate=2016-01-01",
        //url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&stationid=GHCND:USC00010008&units=standard&startdate=2010-05-01&enddate=2010-05-31",
        url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=CITY&sortfield=name&sortorder=desc",
        headers: { token: "tukeGYOTbzRFCEScMXqzfYiUkPoUhWIU" },
        success: function (resultData) {
            //here is your json.
            // process it
            console.log("ID: "+id);
            console.log(resultData);
            var htmlText = '';
            let data = resultData.results;

            $('.container').append(htmlText);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000,
    });
}

function getClima() {
    $.ajax({
        url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets",
        //url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&startdate=2010-05-01&enddate=2010-05-01",
        headers: { token: "tukeGYOTbzRFCEScMXqzfYiUkPoUhWIU" },
        success: function (resultData) {
            //here is your json.
            // process it
            console.log(resultData);
            var htmlText = '';
            let data = resultData.results;
            for (let key in data) {
                //getData(data[key].id);
                htmlText += '<div class="div-conatiner">';
                htmlText += '<p class="p-loc"> id: ' + data[key].id + '</p>';
                htmlText += '<p class="p-name"> Name: ' + data[key].name + '</p>';
                htmlText += '<p class="p-desc"> Data coverage: ' + data[key].datacoverage + '</p>';
                htmlText += '<p class="p-created"> Min date: ' + data[key].mindate + '</p>';
                htmlText += '<p class="p-uname"> Max date: ' + data[key].maxdate + '</p>';
                htmlText += '</div>';
            }
            getData('1');
            $('.container').append(htmlText);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000,
    });
}
function initMap() {
    var myLatLng = {lat:41.8708 , lng: -87.6505};

    window.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: myLatLng,
    });
    var contentString = '<div id="content">'+
                'Deparment of Electrical & Computer Engineering' + 
                '</div>'; 
    var infowindow = new google.maps.InfoWindow({content: contentString});
    var markerImage = new google.maps.MarkerImage
        (
            "https://cdn4.iconfinder.com/data/icons/businesses/130/SVG_university-256.png",
            new google.maps.Size(64, 64, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(64, 64, "px", "px")
        );

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: markerImage,
        title: 'Deparment of Electrical & Computer Engineering' 
    });

    google.maps.event.addListener(marker, 'click', 
            function (infowindow, marker) {
                return function () {
                    infowindow.open(map, marker);
                };
            }(infowindow, marker)
        );
    marker.setMap(map);
}
function explore() {
    let container = document.getElementById("container");
    let sucess = document.getElementById("msj-sucess");
    let price = document.getElementById('price_range');
    let strprice = price.options[price.selectedIndex].value;
    let txtprice = price.options[price.selectedIndex].text;
    let safety = document.getElementById('safety');
    let strsafety = safety.options[safety.selectedIndex].value;
    let txtsafety = safety.options[safety.selectedIndex].text;
    let distance = document.getElementById('distance');
    let strdistance = distance.options[distance.selectedIndex].value;
    let txtdistance = distance.options[distance.selectedIndex].text;
    let propertyType = document.getElementById('property-type');
    let strpropertyType = distance.options[propertyType.selectedIndex].value;
    let txtpropertyType = distance.options[propertyType.selectedIndex].text;
    let roommate = document.querySelector('input[name="roommate"]:checked').value;
    let userform = document.getElementById('options');

    userform.style.display = "none";
    sucess.style.display = "block";
    document.getElementById("searchButton").style.display = "block";
    sucess.innerHTML="<h4> Update ready </h4><p> Your consulting dates are: </p>";
    sucess.innerHTML+="<strong>Price Range: </strong>"+txtprice+"<br><strong> Crime percent: </strong>"+ txtsafety +"<br><strong> Distance: </strong>"+ txtdistance +"<br><strong> Property Type: </strong>"+ txtpropertyType +"<br> <strong>Want roommate: </strong>"+ roommate;
    container.style.height = '750px';
    alert("Searching... \n We currently can't find more info, sorry =(. \n But don't worry We're working on it... Coming soon ;)");
}
function searchAgain() {
    document.getElementById('options').style.display = "block";
    document.getElementById("msj-sucess").style.display = "none";
    document.getElementById("searchButton").style.display = "none";
}
function addMarker(location, datarray) {
    //console.log(datarray);
    var contentString = '<div id="content">'+
                '<strong> Property information:</strong> <br><br>' + "<strong>Community area:</strong> " + datarray.comarea + "<br> <strong>Property type:</strong> " + datarray.protype + "<br> <strong>Property name:</strong> " + datarray.proname + "<br> <strong>Adress: </strong> " + datarray.adress + "<br> <strong>Zip code: </strong> " + datarray.zip + "<br> <strong>Phone number: </strong> " + datarray.phone +
                '</div>'; 
    var infowindow = new google.maps.InfoWindow({content: contentString});
    var markerImage = new google.maps.MarkerImage
        (
            "https://cdn3.iconfinder.com/data/icons/pure_web_icon_pack/PNG/512/home.png",
            new google.maps.Size(44, 44, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(44, 44, "px", "px")
        );
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: markerImage,
        title: 'Deparment of Electrical & Computer Engineering' 
    });
    
    google.maps.event.addListener(marker, 'click', 
            function (infowindow, marker) {
                return function () {
                    infowindow.open(map, marker);
                };
            }(infowindow, marker)
        );
    marker.setMap(map);
}
function getHouses(){
    var houseAPI = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json";
    var myLatLng = {lat:41.8808 , lng: -87.6505};
    $.getJSON(houseAPI, function (data) {
        console.log(data);
        for (datos in data.data){
            var info = data.data[datos];
            var lati = Number(info[19]);
            var long = Number(info[20]);
            var comarea = info[8];
            var protype = info[10];
            var proname = info[11];
            var adress = info[12];
            var zip = info[13];
            var phone = info[14];
            myLatLng={lat:lati, lng:long};
            var datarray = {comarea,protype,proname,adress,zip,phone}
            addMarker(myLatLng,datarray);
        }
    });
    
}

function getPolice(){

}
function getBykes(){

}
function getPlaces(){

}