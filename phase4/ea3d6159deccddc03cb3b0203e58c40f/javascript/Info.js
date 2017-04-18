//i is the index of the data array
//d is the element on the i index of the data array
//function(d, i){}

//Set the data array
var data = [1,1,1,1,1];	
var colors = ["#ffff89", "#0c7c0c", "#adbcff", "#66ff9b", "#ff8f2d"];
var ancho = $("#chart").width() - 5;
var alto = $("#chart").height();

function setData(a, b, c, d, e){
	data[0] = a;
	data[1] = b;
	data[2] = c;
	data[3] = d;
	data[4] = e;
}

//Draw bars
function reDraw(){
	$("#chart rect").remove();

	d3.select("#chart")
		.selectAll("rect")
		.data(data)
	  .enter().append("rect") //add datos.length rects
	  	.attr("fill", function(d, i){
	  		return colors[i]
	  	})
	  	.attr("stroke-width", "2px")
	  	.attr("stroke", "#0E2632")
	  	.attr("x", 2)
		.attr("width", function(d){
			if(d > 30){ d = 30}
			return (ancho*d)/30
		})
		.attr("height", function(){
			return alto/((2*data.length)+1)
		})
		.attr("y", function(d, i){
			return alto/(2*data.length+1) + i * ((alto/(2*data.length+1))+(alto/(2*data.length+1))) 
		})
		.attr("rx", 8)
		.attr("ry", 8)
	  .append("text")
	  	.text(function(d){
	  		return d
	  	})
	  	.attr("x", 10)
	  	.attr("y", ancho/2)
	  	.attr("fill", "black");
}


//Information to the bars
var policeCoords = [];
var librariesCoords = [];
var parksCoords = [];
var traficCoords = [];
var cicleCoords = [];

function loadPolice(){
	const deferred = $.Deferred();

	var police = new XMLHttpRequest();
	police.open("GET", "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD", true);
	police.send();

	police.onreadystatechange = function(){
		if (police.readyState == 4 && police.status == 200) {
			var text = police.responseText;
			var parsed = JSON.parse(text);

			deferred.resolve(parsed);
		} 
	}

	return deferred.promise();
}

function loadLibraries(){
	const deferred = $.Deferred();

	var libraries = new XMLHttpRequest();
	libraries.open("GET", "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD", true);
	libraries.send();

	libraries.onreadystatechange = function(){
		if (libraries.readyState == 4 && libraries.status == 200) {
			var text = libraries.responseText;
			var parsed = JSON.parse(text);

			deferred.resolve(parsed);
		}
	}

	return deferred.promise();
};

function loadTrafic(){
	const deferred = $.Deferred();

	var trafic = new XMLHttpRequest();
	trafic.open("GET", "https://data.cityofchicago.org/api/views/pf56-35rv/rows.json?accessType=DOWNLOAD", true);
	trafic.send();

	trafic.onreadystatechange = function(){
		if (trafic.readyState == 4 && trafic.status == 200) {
			var text = trafic.responseText;
			var parsed = JSON.parse(text);

			deferred.resolve(parsed);
		}
	}

	return deferred.promise();
};

function loadParks(){
	const deferred = $.Deferred();

	var parks = new XMLHttpRequest();
	parks.open("GET", "https://data.cityofchicago.org/api/views/y7qa-tvqx/rows.json?accessType=DOWNLOAD", true);
	parks.send();

	parks.onreadystatechange = function(){
		if (parks.readyState == 4 && parks.status == 200) {
			var text = parks.responseText;
			var parsed = JSON.parse(text);

			deferred.resolve(parsed);
		}
	}

	return deferred.promise();
};

function loadBikes(){
	const deferred = $.Deferred();

	var bikes = new XMLHttpRequest();
	bikes.open("GET", "https://data.cityofchicago.org/api/views/bbyy-e7gq/rows.json?accessType=DOWNLOAD", true);
	bikes.send();

	bikes.onreadystatechange = function(){
		if (bikes.readyState == 4 && bikes.status == 200) {
			var text = bikes.responseText;
			var parsed = JSON.parse(text);

			deferred.resolve(parsed);
		}
	}

	return deferred.promise();
};

function setInfoView(i){
	$(".panel-body.address").text(information[i][0]);
	$(".panel-body.phone").text(information[i][1]);
	$(".panel-body.type").text(information[i][2]);
	$(".panel-body.area").text(information[i][3]);
};