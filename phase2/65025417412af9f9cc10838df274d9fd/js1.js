$(document).ready(function(){

	$("#id_btn1").click(function(){
		$.ajax({
			type:"GET",
			url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=47906",
			dataType: 'jsonp',
			jsonpCallback: 'resultsHandler'
		});
	});
});

function resultsHandler(result){
	console.log(result.results);
	var chi = $("<table></table>");
	chi.append('<tr><th>Distance from Purdue-MarketName</th></tr>');
	for(var i = 0; i < result.results.length; ++i){
		chi.append('<tr><td>' + result.results[i].marketname +'</td></tr>');
	}

	$('body').append(chi);
}