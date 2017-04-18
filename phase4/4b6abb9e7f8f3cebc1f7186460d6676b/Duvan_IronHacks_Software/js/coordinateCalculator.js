function getCoordinates(id){
    var elemento = document.getElementById(id);
    var posicion = elemento.getBoundingClientRect();
    return posicion;
}
function getHeight(id){
    return document.getElementById(id).offsetHeight;
}


