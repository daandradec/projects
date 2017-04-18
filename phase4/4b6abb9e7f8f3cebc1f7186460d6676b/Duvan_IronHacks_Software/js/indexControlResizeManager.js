function update(){
    var firstFontSize = ((1.0/21.0)*(width-300))+22;
    firstFontSize = Math.floor(firstFontSize);
    if(height<300){
        var changeFontSize = ((-1.0/7.0)*(height-160))+20;
        changeFontSize = Math.floor(changeFontSize);
        firstFontSize -= changeFontSize;
    }
    document.getElementById("header1").style.fontSize = firstFontSize+"pt";
    firstFontSize = ((2.0/105.0)*(width-300))+12;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("paragraph1").style.fontSize = firstFontSize+"pt";
    document.getElementById("shadowP1").style.fontSize = firstFontSize+"pt";
    firstFontSize = ((3.0/350.0)*(width-300))+9;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("buttn").style.fontSize = firstFontSize+"px";
    document.getElementById("icon").style.fontSize = firstFontSize+"px";
    firstFontSize = ((2.0/105.0)*(width-300))+16;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("paragraph2").style.fontSize = firstFontSize+"pt";
}

