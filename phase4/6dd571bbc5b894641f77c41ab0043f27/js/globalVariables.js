var radiusSearch = 3e3;
var radiusPolice = 3e3;
var maxPrice = 10e6;
var markers = {};
//open weather maps
var urlBaseOWM = "http://api.openweathermap.org/data/2.5/";
var appIdOWM = "&appid=d47ca477ae4b4337507e0104d1f579da";

//Affordable Rental Housing Developments
var urlRental = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";

var pinUser = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    title: "user",
};

var rentalPin = {
    position: {
        lat: 41.8708,
        lng: -87.6505
    },
    draggable: true,
    title: "house",
};