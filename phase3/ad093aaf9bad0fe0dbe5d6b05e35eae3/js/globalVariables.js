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
var radiusPolice = 3e3;
var maxPrice = 10e6;
var userMarker;
var markers = {};
var markerSelected;
var firstSet = true;
var wheatherPreview;
var wheatherPreviewSet = false;
var crimeLayer;

//open weather maps
var urlBaseOWM = "http://api.openweathermap.org/data/2.5/";
var urlOWMIcons = "http://openweathermap.org/img/w/";
var appIdOWM = "&appid=6aa0bdb1f586c5630d60b6237dfce45c";

//Affordable Rental Housing Developments
var urlARHD = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";

//Pilice stations
var urlPoliceStations = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";

//Police Boundaries
var urlPoliceBoundaries = "https://data.cityofchicago.org/api/views/24zt-jpfn/rows.json?accessType=DOWNLOAD";

//Fire Stations
var urlFireStations = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";

//Clinic Locations
var urlClinicLocations = "https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD";

//Parks
var urlParks = "https://data.cityofchicago.org/api/views/wwy2-k7b3/rows.json?accessType=DOWNLOAD";

//Farmers Market 
var urlFarmersMarket = "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD";

//GroceryStores
var urlGroceryStores = "https://data.cityofchicago.org/api/views/ddxq-pdr6/rows.json?accessType=DOWNLOAD";

//Grocery Store Chains
var urlGroceryStoreChains = "https://data.cityofchicago.org/api/views/wryv-d7zf/rows.json?accessType=DOWNLOAD";

//Schools
var UurlSchools = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";

//Crime
var urlCrime = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";



var pinUser = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    img: imgDir + "pin-user.png",
    draggable: true,
    title: "user",
};

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
};

var pinPolice = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    img: imgDir + "pin-police.png",
    imgMin: imgDir + "pin-police-min.png",
    imgBlue: imgDir + "pin-police-blue.png",
    imgBlueMin: imgDir + "pin-police-blue-min.png",
    draggable: false,
    title: "police",
};

var pinOther = {
    position: {
        lat: 40.424,
        lng: -86.929
    },
    img: imgDir + "pin-other.png",
    imgMin: imgDir + "pin-other-min.png",
    draggable: false,
    title: "other",
};