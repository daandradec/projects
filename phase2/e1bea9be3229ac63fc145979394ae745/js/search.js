var description = {
	b: "Show Chicago's police stations on the map. Further, shows the closest supervised sector to the university. Clicking on a station will display information about this station.",
};

function select(){
  var value = $('select[name=selector]').val();
  selectOption(value);
}

function selectOption(value){
	$('#content_description p').text(description[value]);
  readingData(value);  
}
