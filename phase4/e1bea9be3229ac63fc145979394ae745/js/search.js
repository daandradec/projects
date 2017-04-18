var description = {
	a: "Shows the public libraries of the city of chicago. It also shows the area closest to the university with a library nearby. Clicking on a library will display information about it.",
	b: "Shows Chicago's police stations on the map. Further, shows the closest supervised sector to the university. Clicking on a station will display information about this station.",
	c: "Shows the latest 200 affordable rental homes in the city of Chicago reported in the data.gov database. The closed area shows the best housing option. Clicking on a house will show information about this, in addition you will be able to compare the houses in the section 'Display', observing 6 different aspects and their respective values for each house.",
	d: "Shows public artworks in the city of Chicago. By clicking on one of the artworks of art, you will be offered information about it and you will be able to carry out a search in google images of the artwork, by means of a button.",
	e: "Shows Chicago fire stations on the map. In addition, it shows the fire zone closest to the university. Clicking on a station will display information about it.",
	f: "Shows the farmer markets in the city of chicago. Clicking on each market will be able to see information about it.",
	g: "Shows the public schools in the city of chicago reported on data.gov. By clicking on each school you can see information about it.",
	h: "Shows the parks in the city of chicago reported on data.gov. By clicking on each park you can see information about it, as well as the activities you can do there."
};

function select(){
  var value = $('select[name=selector]').val();
  selectOption(value);
}

function selectOption(value){
	$('#content_description p').text(description[value]);
	readingData(value);  
}

function initialState(){
	document.getElementById("pInformation").innerHTML = "";
	$('#form').hide();
	dicPark = {};
	distanceHouseToLibrary = 1000;
	dHTL = {};
	distanceHouseToPolice = 1000;
	dHTP = {};
	distanceHouseToFire = 1000;
	dHTF = {};
	distanceHouseToMarket = 1000;
	dHTM = {};
	distanceHouseToPark = 1000;
	dHTP2 = {};
	$("#content_display").css({"padding-left" : "2vh", "padding-top" : "20vh", "padding-right" : "2vh"});
	$("#pDisplay").show(2000);
	$(".chart").css("display", "none");
}