window.addEventListener('resize', setWindowSize);
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
console.log("width: "+width);
console.log("height:" +height);
function setWindowSize() {
    if (typeof (window.innerWidth) == 'number') {
        width = window.innerWidth;
        height = window.innerHeight;
    }
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
    } else {
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            width = document.body.clientWidth;
            height = document.body.clientHeight;
        }
    }
    console.log("<---------->");
    console.log("width: "+width);
    console.log("height:" +height);
    
    update();
    if(document.getElementById("map") != null){
        map.setCenter(new google.maps.LatLng(41.8708,-87.6505));
    }
  }

