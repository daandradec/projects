var map;
var markers = [];
var fields = [];
var centerUniversity;

function initMap() {
	centerUniversity = {lat: 41.870800, lng: -87.650500}; 

	map = new google.maps.Map(document.getElementById('map'), {
    	center: centerUniversity, 
    	zoom: 13
    });

	var icon = {
		url: "images/marker university.png",
    	scaledSize: new google.maps.Size(50, 50),
    	origin: new google.maps.Point(0,0),
	};

    var marker = new google.maps.Marker({
    	position: centerUniversity,
		map: map,
		title: 'Department of Computer Science – University of Illinois',
		icon: icon,
		animation: google.maps.Animation.DROP,
	});

	var centerControlDiv = document.createElement('div');
	centerControlDiv.style.paddingTop = '2vh';
  	var centerControl = new CenterControl(centerControlDiv, map);
  	centerControlDiv.index = 1;
  	map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}


function CenterControl(controlDiv, map) {

	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'lightblue';
	controlUI.style.border = '0.2vh solid black';
	controlUI.style.borderRadius = '2vh';
	controlUI.style.boxShadow = '0 1vh 0vh rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '0vh';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to return to Department of Computer Science – University of Illinois';
	controlDiv.appendChild(controlUI);

	var controlText = document.createElement('div');
  	controlText.style.color = 'black';
  	controlText.style.fontSize = '3vh';
  	controlText.style.lineHeight = '2vh';
  	controlText.style.paddingLeft = '1vh';
  	controlText.style.paddingRight = '1vh';
  	controlText.innerHTML = 'Point Origin';
  	controlUI.appendChild(controlText);

  	controlUI.addEventListener('click', function() {
    	map.setZoom(13);
    	map.setCenter(centerUniversity);
  	});
}

function readingData(option){
	if(cityCircle != undefined) cityCircle.setMap(null);

	initialState();
	deleteMarkers();

	switch(option){
		case 'a':
			libraryData();
			break;
		case 'b':
			policeData();
			break;
		case 'c':
			countBarChart = 0;
			affordableRentalData();
			break;
		case 'd':
			$('#zone').text(' --- ');
			publicArtData();
			break;
		case 'e':
			fireData();
			break;
		case 'f':
			marketData();
			break;
		case 'g':
			schoolData();
			break;
		case 'h':
			parksData();
			break;
		default:
			break;
	}
}

