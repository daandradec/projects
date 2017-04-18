var imgDir = "images/";
var map;
var panorama;
var crimeMaxTolerance = 0.02;
var userMove = false;
var autoLocation = false;
var openSideAgain = false;
var openSide = false;
var openSideL = true;
var infoPopUpOver = false;
var fahrenheit = true;
var radiusSearch = 3e3;
var radiusPolice = 2e3;
var radiusFire = 2e3;
var radiusClinic = 3e3;
var radiusPark = 1e3;
var radiusFarmerMarket = 2e3;
var radiusGroceryStores = 1e3;
var radiusSchool = 1e3;
var radiusLibrary = 2e3;
var polygonPolice;
var fireStation;
var maxPrice = 10e6;
var userMarker;
var markers = {};
var markersPolice;
var markerSelected;
var firstSet = true;
var wheatherPreview;
var wheatherPreviewSet = false;
var crimeLayer;
var summaryObj;

//open weather maps 0 ----OK----
var urlBaseOWM = "http://api.openweathermap.org/data/2.5/";
var urlOWMIcons = "http://openweathermap.org/img/w/";
var appIdOWM = "&appid=6aa0bdb1f586c5630d60b6237dfce45c";

//Affordable Rental Housing Developments 7 ----OK----
var urlARHD = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";

//Pilice stations 52 ----OK----
var urlPoliceStations = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";

//Police Boundaries 34 ----OK----
var urlPoliceBoundaries = "https://data.cityofchicago.org/api/views/24zt-jpfn/rows.json?accessType=DOWNLOAD";

//Fire Stations 17 ----OK----
var urlFireStations = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";

//Clinic Locations 30 ----OK----
var urlClinicLocations = "https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD";

//Crime 9 ----OK----
var urlCrime = "https://data.cityofchicago.org/resource/3uz7-d32j.json";

//Parks ----OK----
var urlParks = "https://data.cityofchicago.org/resource/4xwe-2j3y.json";

//Farmers Market 16 ----OK----
var urlFarmersMarket = "https://data.cityofchicago.org/resource/3r5z-s68i.json";

//Grocery Stores - 2011 ----OK----
var urlGroceryStores = "https://data.cityofchicago.org/resource/cuva-m4yn.json";

//Chicago Public Schools ----OK----
var urlSchools = "https://data.cityofchicago.org/resource/mntu-576c.json";

//Libraries ----OK----
var urlLibraries = "https://data.cityofchicago.org/resource/psqp-6rmg.json";

var positionInitialAll = {
    lat: 41.8708,
    lng: -87.6505
};

var pinUser = {
    position: positionInitialAll,
    img: imgDir + "pin-user.png",
    draggable: true,
    title: "user",
};

var pinHouse = {
    position: positionInitialAll,
    img: imgDir + "pin-house.png",
    imgMin: imgDir + "pin-house-min.png",
    imgBlue: imgDir + "pin-house-blue.png",
    imgBlueMin: imgDir + "pin-house-blue-min.png",
    imgPoint: imgDir + "bluePoint.png",
    draggable: false,
    title: "house",
};

var pinPolice = {
    position: positionInitialAll,
    img: imgDir + "pin-police.png",
    imgMin: imgDir + "pin-police-min.png",
    draggable: false,
    title: "police",
};

var pinFire = {
    position: positionInitialAll,
    img: imgDir + "pin-fire.png",
    imgMin: imgDir + "pin-fire-min.png",
    draggable: false,
    title: "fireman",
};

var pinClinic = {
    position: positionInitialAll,
    img: imgDir + "pin-clinic.png",
    imgMin: imgDir + "pin-clinic-min.png",
    draggable: false,
    title: "Public Health Clinic",
};

var pinPark = {
    position: positionInitialAll,
    img: imgDir + "pin-park.png",
    imgMin: imgDir + "pin-park-min.png",
    draggable: false,
    title: "Park",
};

var pinFarmerMarket = {
    position: positionInitialAll,
    img: imgDir + "pin-farmermarket.png",
    imgMin: imgDir + "pin-farmermarket-min.png",
    draggable: false,
    title: "Farmer Market",
};

var pinGroceryStores = {
    position: positionInitialAll,
    img: imgDir + "pin-grocerystore.png",
    imgMin: imgDir + "pin-grocerystore-min.png",
    draggable: false,
    title: "Grocery Store",
};

var pinSchool = {
    position: positionInitialAll,
    img: imgDir + "pin-school.png",
    imgMin: imgDir + "pin-school-min.png",
    draggable: false,
    title: "Public School",
};

var pinLibrary = {
    position: positionInitialAll,
    img: imgDir + "pin-library.png",
    imgMin: imgDir + "pin-library-min.png",
    draggable: false,
    title: "Library",
};


var pinOther = {
    position: positionInitialAll,
    img: imgDir + "pin-other.png",
    imgMin: imgDir + "pin-other-min.png",
    draggable: false,
    title: "other",
};