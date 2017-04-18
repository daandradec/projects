var chart;
var token = "uuWvuBfskakEmoDmXVNbnXZkPdhDKfwJ";

function avg(o) {
    if (typeof o == "string") {
        return o;
    }
    return d3.mean(o) || 0;
}

function currentWeather(){
var xmlhttp = new XMLHttpRequest();
	//json format data resource url 
	var url = "http://api.openweathermap.org/data/2.5/weather?id=4887398&units=metric&appid=b078022cb2fe1b17bd1bf0b87ae96e5f";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	//once the request is accepted, process the fowllowing function to get data and complete the app information
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var text = myArr;
			var json = JSON.parse(text);
		
			document.getElementById("weather").innerHTML = "Today the weather is <i>" + json.weather[0].main + "</i> and the temperature is between <i>" + json.main.temp_min + "</i> and <i>" + json.main.temp_max + "</i> degrees.";
		}
	}	
}

function getWeather() {
    
	currentWeather();
	
    $.ajax({
	url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GHCND",
	data: {
	    locationid: "CITY:US170006"
	},
	headers: {
	    token: token
	}
    }).done(function() {
	$.when(
	    $.ajax({
		url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data/?datatypeid=TMAX&datatypeid=TMIN",
		data: {
		    locationid: "CITY:US170006",
		    datasetid: "GHCND",
		    startdate: "2017-04-01",
		    enddate: "2017-04-11",
		    limit: 1000,
		    sortfield: "date",
		    units: "metric"
		},
		headers: {
		    token: token
		}
	    }),
	    $.ajax({
		url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data/?datatypeid=TMAX&datatypeid=TMIN",
		data: {
		    locationid: "CITY:US170006",
		    datasetid: "GHCND",
		    startdate: "2017-04-01",
		    enddate: "2017-04-11",
		    limit: 1000,
		    sortfield: "date",
		    units: "metric",
		    offset: 1001
		},
		headers: {
		    token: token
		}
	    })			
	).done(function(data1, data2) {
	    if (data2 && data2[0] && data2[0].results)
				data1[0].results.push.apply(data1[0].results, data2[0].results);

	    var TMIN = ["Minimum temperature"],
		TMAX = ["Maximum temperature"],
		xCategory = ["x"],
		results = data1[0].results;

				i = 0, j = 1;

	    while (i < results.length) {
		var inf = results[i];
		var date = inf.date;
		TMIN[j] = [];
		TMAX[j] = [];
		xCategory[j] = date.slice(0, 10);

		do {
		    switch (inf.datatype) {
			case "TMIN":
			    TMIN[j].push(inf.value);
			    break;
						case "TMAX":
			    TMAX[j].push(inf.value);
			    break;
			default:
		    };
		    i += 1;
		    inf = results[i];
		} while (inf && date == inf.date);
		j += 1;
	    };
	    TMIN = TMIN.map(avg);
	    TMAX = TMAX.map(avg);

	    chart = c3.generate({
		bindto: '#chart',
		size: {
		    width: 470,
		    height: 300
		},
		data: {
		    x: 'x',
		    columns: [
			xCategory,
			TMIN,
			TMAX
		    ],
		    colors: {
			"Minimum temperature": '#4400FF',
			"Maximum temperature": '#FF0000'
		    },
		},
		axis: {
		    x: {
			type: 'timeseries',
			tick: {
			    rotate: 50,
			    format: '%Y-%m-%d',
			    centered: true
			}
		    },
		    y: {
			label: {
			    text: 'Temperature °C',
			    position: 'outer-middle'
			}
		    }
		},
		tooltip: {
		    format: {
			value: function(value) {
			    return value.toFixed(1) + ("&deg;C");
			}
		    }
		}
	    });
	});
    });
}
