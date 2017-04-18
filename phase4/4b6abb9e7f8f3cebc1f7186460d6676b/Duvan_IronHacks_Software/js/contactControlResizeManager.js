function update(){
    var items = document.getElementsByTagName("h1");
    firstFontSize = ((1.0/105.0)*(width-300))+20;
    firstFontSize = Math.floor(firstFontSize);
    for(var i = 0;i < items.length;++i)
        items[i].style.fontSize = firstFontSize+"px";
    items = document.getElementsByTagName("h3");
    for(var i = 0;i < items.length;++i)
        items[i].style.fontSize = (firstFontSize-6) + "px";
}