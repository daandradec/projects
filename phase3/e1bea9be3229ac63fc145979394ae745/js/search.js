var description = {
	a: "Show the public libraries of the city of chicago. It also shows the area closest to the university with a library nearby. Clicking on a library will display information about it.",
	b: "Show Chicago's police stations on the map. Further, shows the closest supervised sector to the university. Clicking on a station will display information about this station.",
	c: "Show the last 200 affordable rental homes in the city of Chicago reported in the data.gov database. The enclosed area shows the housing closest to the university. Clicking on a house will show information about it.",
	d: "Show public artworks in the city of Chicago. By clicking on one of the artworks of art, you will be offered information about it and you will be able to carry out a search in google images of the artwork, by means of a button."
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
}