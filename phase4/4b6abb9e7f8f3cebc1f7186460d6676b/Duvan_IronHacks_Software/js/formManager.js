function slider(){
    var value = parseInt(document.getElementById("slider").value);
    var length = zillowObject.jsonZestimate.length;
    for(var i = 0;i<length;++i)
        showMarker(houses[i]);
    for(var i = 0;i<length;++i){
        if(parseInt(zillowObject.jsonZestimate[i].response.zestimate.amount) > value)
            hideMarker(houses[i]);
    }
}
function hideEvent(){
    $("#houseInformation").fadeToggle("slow");
}

