function update(){
    firstFontSize = ((2.0/175.0)*(width-300))+8;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("paragraph1").style.fontSize = firstFontSize+"pt";
}

