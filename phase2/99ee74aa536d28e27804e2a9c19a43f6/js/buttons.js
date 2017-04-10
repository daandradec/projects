var options=0
var police= false;
var parks= false;
var ger=true;
function setButtons(){
	if (ger){
		$('#res').toggle();
	}
	ger=false;
}


$(document).ready(function(){ $("#Nearest-btn").click(function(){
	setButtons()
    clearOverlays()
    options=2
    police= false;
	parks= false;

    markersPlacer(options)
});});

$(document).ready(function(){ $("#Default-btn").click(function(){
   	setButtons()
    clearOverlays()
    options=0
	police= false;
	parks= false;

    markersPlacer(options)
});});

$(document).ready(function(){ $("#Near-btn").click(function(){
    setButtons()
    clearOverlays()
    options=1
    police= false;
	parks= false;
    markersPlacer(options)
});});

$(document).ready(function(){ $("#Police-btn").click(function(){
    clearOverlays()
    police=!police
    markersPlacer(options, police, parks)
});});


$(document).ready(function(){ $("#Parks-btn").click(function(){
    clearOverlays()
    parks=!parks
    markersPlacer(options, police, parks)
});});
