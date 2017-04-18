var zillowObject,crimeObject = [],maxZestimate = 0,minZestimate = Number.MAX_VALUE;
var images = [];
var houseSafes = [];
var cnt = 0;
var limit,idInterval; 
$.ajax({
    url: "../zillowData/zillow.txt",
    success: function (data) {
        var dataZillow = data.split("~");
        var length = dataZillow.length - 1;
        var jsonZillow = [];
        for(var i = 0;i < length;++i)
               jsonZillow.push(JSON.parse(dataZillow[i]));
        nextStep(jsonZillow);
    }
});
function nextStep(tepData){
    $.ajax({
        url: "../zillowData/zestimates.txt",
        success: function (data) {
            var dataZillow = data.split("~");
            var length = dataZillow.length - 1;
            var jsonZillow = [];
            var unsortedJsonZillow = [];
            for(var i = 0;i < length;++i)
                unsortedJsonZillow.push(JSON.parse(dataZillow[i]));
            for(var i = 0;i < tepData.length;++i){
                dataZillow = tepData[i].request.zpid;
                for(var j = 0;j < unsortedJsonZillow.length;++j){
                    if(dataZillow === unsortedJsonZillow[j].request.zpid){
                        if(parseInt(unsortedJsonZillow[j].response.zestimate.amount) > maxZestimate)
                            maxZestimate = parseInt(unsortedJsonZillow[j].response.zestimate.amount);
                        if(parseInt(unsortedJsonZillow[j].response.zestimate.amount) < minZestimate)
                            minZestimate = parseInt(unsortedJsonZillow[j].response.zestimate.amount);
                        jsonZillow.push(unsortedJsonZillow[j]);
                        unsortedJsonZillow.slice(j,1);
                        break;
                    }
                }
            }
            var zillowTepData = [];
            for(var i = 0;i < jsonZillow.length;++i){
                for(var j = 0;j < tepData.length;++j){
                    if(tepData[j].request.zpid === jsonZillow[i].request.zpid){
                        zillowTepData.push(tepData[j]);
                        break;
                    }
                }
            }
            zillowObject = new Zillow(zillowTepData,jsonZillow);
            if(houses.length == 0)
                attachData();
        }
    });
}
function attachData(){
    var index = 0,indexTwo,min = Number.MAX_VALUE,minTwo = Number.MAX_VALUE,distance,location;
    var start = mainMarker.getPosition();
    var length = zillowObject.jsonZillow.length;
    for(var i = 0;i<length;++i){
        location = createLocation(zillowObject.jsonZillow[i].response.address.latitude,zillowObject.jsonZillow[i].response.address.longitude);
        distance = google.maps.geometry.spherical.computeDistanceBetween(start, location);
        if(distance<min){
            min = distance;
            index = i;
        }else{
            if(distance < minTwo){
                minTwo = distance;
                indexTwo = i;
            }
        }
        if(distance < 8000)
            houseSafes.push(i);
        addMarkerHouse(location,i,distance);
    }
    document.getElementById("header2").innerHTML = minZestimate+" USD";
    document.getElementById("header3").innerHTML = maxZestimate+" USD";
    var slider = document.getElementById("slider");
    slider.setAttribute('max',""+maxZestimate);
    slider.setAttribute('min',""+minZestimate);
    slider.setAttribute('value',""+maxZestimate);
    document.getElementById("headerTwo").innerHTML = "Current Search Limit: "+maxZestimate+" USD";
    houses[index].setIcon("../img/house2.png");
    houses[indexTwo].setIcon("../img/house2.png");
    var start = new google.maps.LatLng(houses[indexTwo].getPosition().lat()+0.00004 ,houses[indexTwo].getPosition().lng()+0.00001);
    houses[indexTwo].setPosition(start);
    initializeCrimeDataset();
}
