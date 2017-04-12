//////////////////////////////////////// ----- Get libraries dataset functions ----- ///////////////////////////////

//-- Constants --//
//-- Libraries dataset constants --//
const LIBRARIES_JSON_SOURCE = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
const INDEX_OF_LOCALIZATION_ARRAY_LIBRARIES = 18;
const INDEX_OF_LAT_LIBRARIES = 1;
const INDEX_OF_LNG_LIBRARIES = 2;
const INDER_OF_LIBRARY_NAME = 8;
//-- Libraries dataset constants --//
//-- Houses dataset constants --//
const HOUSES_JSON_SOURCE = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
const INDEX_OF_LOCALIZATION_ARRAY_HOUSES = 21;
const INDEX_OF_LAT_HOUSES = 1;
const INDEX_OF_LNG_HOUSES = 2;
const INDEX_OF_HOUSES_COMMUNITY_AREA_NAME = 9;
const INDEX_OF_HOUSE_ADDRESS = 12;
//-- Houses dataset constants --//
const DATASETS_TYPES_ENUM = {
	LIBRARIES : "LIBRARIES",
	POLICE_STATIONS : "POLICE_STATIONS",
	FIRE_STATIONS : "POLICE_STATIONS",
	PARKS : "PARKS",
	HOUSES : "HOUSES"
}

const HOUSE_MARKER_ICON = "img/houseIcon.png";
//-- Constants --//

//-- markersLists --//

var librariesMarkersList = [];
var housesMarkersList = [];

//-- markersLists --//

//-- datasets json objects --//
var librariesJson;
var housesJson;
//-- datasets json objects --//

//-- Jquery dobject --//
var $ = require("jquery");
//-- Jquery dobject --//



//Get data files in json format using jquery
function initDataSets(){
	$.get(LIBRARIES_JSON_SOURCE, ( response ) => {
		librariesJson = response.data;
		getLibrariesMarkersFromJson(librariesJson);
	} , "json").fail( ( response, status, error ) => {
		// errors:
	}).always( ( response, status, error ) => {
		console.log(response);
	});
	$.get(HOUSES_JSON_SOURCE, ( response ) => {
		housesJson = response.data;
		getHousesMarkersFromJson(housesJson);
	} , "json").fail( ( response, status, error ) => {
		// errors:
	}).always( ( response, status, error ) => {
		console.log(response);
	});

		/*
	
	$.get(LIBRARIES_JSON_SOURCE, ( reponse ) => {
		bookStoresJson = response;
	} , "json");
	
	$.get(LIBRARIES_JSON_SOURCE, ( reponse ) => {
		bookStoresJson = response;
	} , "json");
	*/
}	

//create and store a marker object for each data object on the json
function getLibrariesMarkersFromJson( lib ){
		$.each(lib, ( posIndex, position ) => {
			var latLng = new google.maps.LatLng([position[INDEX_OF_LOCALIZATION_ARRAY_LIBRARIES][INDEX_OF_LAT_LIBRARIES]], [position[INDEX_OF_LOCALIZATION_ARRAY_LIBRARIES][INDEX_OF_LNG_LIBRARIES]]);
				var marker = new google.maps.Marker({
				position: latLng,
				title: position[INDER_OF_LIBRARY_NAME],
				});	
				//Storing each market into an array.
				librariesMarkersList.push(marker);
		});
};

//create and store a marker object for each data object on the json
function getHousesMarkersFromJson( lib ){
		$.each(lib, ( posIndex, position ) => {
			var latLng = new google.maps.LatLng([position[INDEX_OF_LOCALIZATION_ARRAY_HOUSES][INDEX_OF_LAT_HOUSES]], [position[INDEX_OF_LOCALIZATION_ARRAY_HOUSES][INDEX_OF_LNG_HOUSES]]);
				var marker = new google.maps.Marker({
					position: latLng,
					title: position[INDEX_OF_HOUSES_COMMUNITY_AREA_NAME],
					icon : HOUSE_MARKER_ICON,
					address : position[INDEX_OF_HOUSE_ADDRESS]
				});
				
			 	//Storing each market into an array.
			 	housesMarkersList.push(marker);
		});

};


//draw each marker object from markerList array on the map
function drawMarkers( map, markerList){
		$.each(markerList, ( posIndex, marker ) => {
			marker.setMap(map);
		})
};

function setMarkersOnMap( markersCategory, map ) {
	switch (markersCategory){
		case DATASETS_TYPES_ENUM.LIBRARIES:
			if (map != null) {
				console.log(librariesMarkersList);
				drawMarkers(map, librariesMarkersList);
			}else{
				removeAllMarkersFromList(librariesMarkersList);
			}
		break;
		case DATASETS_TYPES_ENUM.POLICE_STATIONS:

		break;
		case DATASETS_TYPES_ENUM.FIRE_STATIONS:

		break;
		case DATASETS_TYPES_ENUM.PARKS:

		break;
		case DATASETS_TYPES_ENUM.HOUSES:
			if (map != null) {
				console.log(housesMarkersList[1].address);
				$.each(housesMarkersList, (posIndex, marker) => {
					//Add a click listener to the marker
					var infowindow = new google.maps.InfoWindow({
						content: marker.address + "\nRent cost per month: Not implented"
					});
					marker.addListener('click', function() {
					    infowindow.open(map, marker);
				 	});
				});
				drawMarkers(map, housesMarkersList);
			}else{
				removeAllMarkersFromList(housesMarkersList);
			}
		break;

	}
	
}

function removeAllMarkersFromList( markerList ) {
	$.each(markerList, ( posIndex, marker ) => {
		marker.setMap(null);
	});
}
//////////////////////////////////////// ----- Get libraries dataset functions end ----- ///////////////////////////////

//exported functions//

module.exports.initDataSets = initDataSets;
module.exports.setMarkersOnMap = setMarkersOnMap;
module.exports.DATASETS_TYPES_ENUM = DATASETS_TYPES_ENUM;

//exported functions//