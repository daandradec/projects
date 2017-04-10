var imgDir = "images/";
var map;
var panorama;
var userMove = false;
var autoLocation = false;
var openSideAgain = false;
var openSide = false;
var openSideL = true;
var infoPopUpOver = false;
var fahrenheit = true;
var radiusSearch = 3e3;
var maxPrice = 10e6;
var userMarker;
var markers = {};
var markerSelected;
var firstSet = true;
var wheatherPreview;
var wheatherPreviewSet = false;

//open weather maps
var urlBaseOWM = "http://api.openweathermap.org/data/2.5/";
var urlOWMIcons = "http://openweathermap.org/img/w/";
var appIdOWM = "&appid=6aa0bdb1f586c5630d60b6237dfce45c";

//Affordable Rental Housing Developments
var urlARHD = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD"


var pinUser = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    img: imgDir + "pin-user.png",
    draggable: true,
    title: "user",
}

var pinHouse = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    img: imgDir + "pin-house.png",
    imgMin: imgDir + "pin-house-min.png",
    imgBlue: imgDir + "pin-house-blue.png",
    imgBlueMin: imgDir + "pin-house-blue-min.png",
    draggable: false,
    title: "house",
}
var pinOther = {
    position: {
        lat: 40.424,
        lng: -86.929
    },
    img: imgDir + "pin-other.png",
    imgMin: imgDir + "pin-other-min.png",
    draggable: false,
    title: "other",
}