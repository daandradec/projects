function update(){
    var coordinates = getCoordinates("flag");
    var heightDiv = getHeight("flag");
    var posX = coordinates.top+heightDiv;
    document.getElementById("map").style.top=posX;
    if(width<600 || height <550)
        document.getElementById("map").style.height = ((height>>1)+(height>>2))+"px";
    else
        document.getElementById("map").style.height = height+"px";
    var firstFontSize = ((1.0/105.0)*(width-300))+22;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("header1").style.fontSize = firstFontSize+"pt";
    var firstFontSize = ((1.0/210.0)*(width-300))+7;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("paragraph0").style.fontSize = firstFontSize+"pt";
    document.getElementById("paragraph1").style.fontSize = firstFontSize+"pt";
    document.getElementById("paragraph2").style.fontSize = firstFontSize+"pt";
    document.getElementById("paragraph3").style.fontSize = firstFontSize+"pt";
    document.getElementById("homeDescription").style.fontSize = firstFontSize+"pt";
}
