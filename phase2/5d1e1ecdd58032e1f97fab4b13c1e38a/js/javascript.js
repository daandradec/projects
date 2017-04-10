//Javascript for the project

function initMap() {
    var myLatLng = {
        lat: 41.8708,
        lng: -87.6505


    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: myLatLng

    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'C.S Dept U. of Illinois',
        icon: 'images/univ.png'

    });
}

var elevator;
var map;
// 2-level array 
var arrayPoliceStations = [];


String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//
function savePoliceStations() {

    var infowindow = new google.maps.InfoWindow({
        content: ""
    });

    var xmlhttp = new XMLHttpRequest();

    var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            //alert(json.data[1][1]);

            //information of the markets 

            for (var i = 0; i < 23; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][20]);
                //longitude - 1
                dataLine.push(json.data[i][21]);
                //name - 2
                dataLine.push(json.data[i][9]);
                //address - 3
                dataLine.push(json.data[i][10]);
                //website - 4
                dataLine.push(json.data[i][14][0]);
                //phone - 5
                dataLine.push(json.data[i][15][0]);
                //fax- 6
                dataLine.push(json.data[i][16][0]);
                //TTY-7
                dataLine.push(json.data[i][17][0]);
                //zip - 8
                dataLine.push(json.data[i][13][0]);

                arrayPoliceStations.push(dataLine);
            };
            //alert(arrayPoliceStations);


            //number of the markets
            var numberOfMarkets = arrayPoliceStations.length;


        }
    }
};