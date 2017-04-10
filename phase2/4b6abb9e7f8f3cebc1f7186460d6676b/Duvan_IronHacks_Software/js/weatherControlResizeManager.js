function update(){
    var firstFontSize = ((2.0/75.0)*(width-300))+20;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("header1").style.fontSize = firstFontSize+"pt";
    firstFontSize = ((5.0/175.0)*(width-300))+16;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("header2").style.fontSize = firstFontSize+"pt";
    firstFontSize = ((1.0/105.0)*(width-300))+12;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("header3").style.fontSize = firstFontSize+"pt";
    firstFontSize = ((2.0/175.0)*(width-300))+8;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("paragraph1").style.fontSize = firstFontSize+"pt";
    document.getElementById("paragraph2").style.fontSize = firstFontSize+"pt";
    document.getElementById("paragraphWeather").style.fontSize = firstFontSize+"pt";
    document.getElementById("paragraphWeather2").style.fontSize = (firstFontSize-2)+"pt";
}


