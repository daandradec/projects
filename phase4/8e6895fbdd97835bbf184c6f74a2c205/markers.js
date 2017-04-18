/*jslint devel: true */
/*jslint white: true */
/*jslint JSON: true */
/*global $ */
/*global document */
/*global google */
/*global $ */
/*global JSON: true */
/*global map */
/*global rentaldata */


function addMarkers(i){
    i=i.substring(3);
    addBikesMark(rentaldata[i][2]);
    addCondomMark(rentaldata[i][3]);
    addHouseMark(rentaldata[i]);
    addParkMark(rentaldata[i][0]);
    addPoliceMark(rentaldata[i][1]);
    map.setZoom(15);
    map.setCenter({lat: parseFloat(rentaldata[i][4].latitude), lng: parseFloat(rentaldata[i][4].longitude)});

}

var policeMarkers=[];
function addPoliceMark(dataPoliceStation){
    for (var i in dataPoliceStation){
        policeMarkers.push( new google.maps.Marker({ 
            position: {lat: dataPoliceStation[i][0], lng: dataPoliceStation[i][1]},
            map: map,
            icon: 'police.png',
            title: 'Police estation: '+ dataPoliceStation[i][1]
        }));
    }}

var bikesMarkers=[];
function addBikesMark(dataBikes){
    for (var i in dataBikes){
        bikesMarkers.push( new google.maps.Marker({ 
            position: {lat: dataBikes[i][0], lng: dataBikes[i][1]},
            map: map,
            icon: 'bike.PNG',
            title: dataBikes[i][2]
        }));
    }
}


var condomMarkers=[];
function addCondomMark(dataCondoms){
    for (var i in dataCondoms){
        condomMarkers.push(new google.maps.Marker({ 
            position: {lat: dataCondoms[i][0], lng: dataCondoms[i][1]},
            map: map,
            icon: 'condom.PNG',
            title: 'condom store: '+ dataCondoms[i][2]
        }));
    }
}

var parkMarkers=[];
function addParkMark(dataParcks){
    for (var i in dataParcks){
        parkMarkers.push(new google.maps.Marker({ 
            position: {lat: dataParcks[i][0], lng: dataParcks[i][1]},
            map: map,
            icon: 'tennis.png',
            title: dataParcks[i][2]
        }));
    }
}

var houseMarkers=[];
function addHouseMark(rentaldata){
    map.setZoom(15);
    map.setCenter({lat: parseFloat(rentaldata[4].latitude), lng: parseFloat(rentaldata[4].longitude)});
    houseMarkers.push(new google.maps.Marker({ 
            position: {lat: parseFloat(rentaldata[4].latitude), lng: parseFloat(rentaldata[4].longitude)},
            map: map,
            icon: 'house.png',
            title: rentaldata[4].address
        }));
    
}

function addHouseMark(rentaldata , sdgr){
    map.setZoom(13);
    houseMarkers.push(new google.maps.Marker({ 
        position: {lat: parseFloat(rentaldata[4].latitude), lng: parseFloat(rentaldata[4].longitude)},
        map: map,
        icon: 'house.png',
        title: rentaldata[4].address
    }));

}


function cleanMap(){
    var i =0;
    for(i in houseMarkers){
        houseMarkers[i].setMap(null);
    }
    for( i in policeMarkers){
        policeMarkers[i].setMap(null);
    }
    for( i in condomMarkers){
        condomMarkers[i].setMap(null);
    }
    for( i in bikesMarkers){
        bikesMarkers[i].setMap(null);
    }
    for( i in parkMarkers){
        parkMarkers[i].setMap(null);
    }
    policeMarkers=[];
    houseMarkers=[];
    condomMarkers=[];
    bikesMarkers=[];
    parkMarkers=[];
}