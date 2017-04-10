function update(){
    var coordinates = getCoordinates("filters");
    var heightDiv = getHeight("filters");
    var posX = coordinates.top+heightDiv;
    document.getElementById("map").style.top=posX;
    if(width<600 || height <550)
        document.getElementById("map").style.height = (height>>1)+"px";
    else
        document.getElementById("map").style.height = (height-posX)+"px";
    var firstFontSize = ((1.0/105.0)*(width-300))+22;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("header1").style.fontSize = firstFontSize+"pt";
}

