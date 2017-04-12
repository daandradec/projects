
const DCS_UI_POSITION = {lat: 41.870808, lng : -87.650390}; //Department of Computer Science – University of Illinois, Chicago
const MARKER_BOUNCE_AMIMATION_TIME = 2100 //3 jumps
const DCS_UI_INFO_WINDOW_STRING = "Department of Computer Science – University of Illinois, Chicago";

var map, DCS_UI_MARKER, infowindow;
var areLibrariesDrawed = false;
var areHousesDrawed= false;
//--------- basic dependensies ---------//
var $ = require("jquery");
var ZillowLibrary = require("./zillowLibrary");
var DatasetLibrary = require("./datasetLibrary");
//--------- basic dependensies ---------//
//init datasets
DatasetLibrary.initDataSets();
//ZillowLibrary.getZillowData();
//initGoogleMap funcion.
function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center : DCS_UI_POSITION,
		zoom: 12
	});
	//inicializing the map info window with the DCS_UI_MARKER info.
	infowindow = new google.maps.InfoWindow({
		content: DCS_UI_INFO_WINDOW_STRING
	});
	//Adding the DCS_UI_MARKER to the map
	addDefaultMarker();
	console.log("Map loaded");
}

//default marker function
function showLibrariesButtonClicked() {
	console.log("clicked");
	if(!areLibrariesDrawed){
		DatasetLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.LIBRARIES , map);
		areLibrariesDrawed = true;
		$("#librariesButton").text("Hide all Libraries");
	}else{
		DatasetLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.LIBRARIES , null);
		areLibrariesDrawed = false;
		$("#librariesButton").text("Hide all Libraries");
	}
}

function showHousesButtonClicked() {
	console.log("clicked");
	
	if(!areHousesDrawed){
		DatasetLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.HOUSES , map);
		areHousesDrawed = true;
		$("#housesButton").text("Hide all Houses");
	}else{
		DatasetLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.HOUSES , null);
		areHousesDrawed = false;
		$("#housesButton").text("Show all Houses");
	}
}

function markerButtonClicked4() {
	//console.log("clicked");
	//DatasetLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.HOUSES , null);
	ZillowLibrary.getZillowData();
}

//Default mark behaviour func
function addDefaultMarker() {
	//Initializing defaulteMarker by first time
	DCS_UI_MARKER = new google.maps.Marker({
		position: DCS_UI_POSITION,
		map: map,
		title: "DCS_UI_MARKER",
	});
	//Add a click listener to the marker
	DCS_UI_MARKER.addListener('click', function() {
	    infowindow.open(map, DCS_UI_MARKER);
 	});
}

//This function add or remove the animation to a specific marker (not in use)
function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
    	marker.setAnimation(null);
	} else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}


// map global function

var mapExercise = {};
mapExercise.initGoogleMap = initGoogleMap;
mapExercise.showLibrariesButtonClicked = showLibrariesButtonClicked;
mapExercise.showHousesButtonClicked = showHousesButtonClicked;

window.MapExercise =  mapExercise;

// map global function

$(document).ready( () => {
	$("#librariesButton").on("click", mapExercise.showLibrariesButtonClicked);
	$("#housesButton").on("click", mapExercise.showHousesButtonClicked);
})
