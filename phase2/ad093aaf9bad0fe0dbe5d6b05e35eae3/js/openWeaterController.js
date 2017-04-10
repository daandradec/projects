function covertToCelcius(kelvin) {
    return parseInt(parseFloat(kelvin) - 273.15);
}

function covertToFahrenheit(kelvin) {
    return parseInt((9 / 5) * (parseFloat(kelvin) - 273.15) + 32);
}

function getWeatherByGeographicCoordinates(latitude, longitude) {
    var url = urlBaseOWM + "weather?lat=" + latitude + "&lon=" + longitude;
    url += appIdOWM;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = JSON.parse(xmlhttp.responseText);
            $("#weatherDay").text((new Date()).toString().slice(0, 10));
            $("#weatherDayIcon").attr("src", urlOWMIcons + json.weather[0].icon + ".png");
            $("#weatherDayIcon").attr("title", json.weather[0].description);
            fahrenheit ?
                $("#weatherDayMaxMin").text(covertToFahrenheit(json.main.temp_min) + "º | " + covertToFahrenheit(json.main.temp_max) + "º F") :
                $("#weatherDayMaxMin").text(covertToCelcius(json.main.temp_min) + "º | " + covertToCelcius(json.main.temp_max) + "º C");
        }
    };
}


function getWeatherByGeographicCoordinatesPreview(latitude, longitude) {
    var url = urlBaseOWM + "forecast?lat=" + latitude + "&lon=" + longitude;
    url += appIdOWM;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = JSON.parse(xmlhttp.responseText);
            var day = 1;
            wheatherPreview = [];
            $.each(json.list, function (i, weather) {
                var item = {
                    yy: Number(weather.dt_txt.slice(0, 4)),
                    mm: Number(weather.dt_txt.slice(5, 7)),
                    dd: Number(weather.dt_txt.slice(8, 10)),
                    hh: Number(weather.dt_txt.slice(11, 13)),
                    date: new Date(
                        Number(weather.dt_txt.slice(0, 4)),
                        Number(weather.dt_txt.slice(5, 7)) - 1,
                        Number(weather.dt_txt.slice(8, 10)),
                        Number(weather.dt_txt.slice(11, 13))
                    ),
                    icon: urlOWMIcons + weather.weather[0].icon + ".png",
                    description: weather.weather[0].description,
                    temp: Number(weather.main.temp),
                    temp_min: Number(weather.main.temp_min),
                    temp_max: Number(weather.main.temp_max),
                    grnd_level: Number(weather.main.grnd_level),
                    humidity: Number(weather.main.humidity),
                    pressure: Number(weather.main.pressure),
                    sea_level: Number(weather.main.sea_level),
                    tempC: covertToCelcius(weather.main.temp),
                    tempF: covertToFahrenheit(weather.main.temp),
                    temp_minF: covertToFahrenheit(weather.main.temp_min),
                    temp_maxF: covertToFahrenheit(weather.main.temp_max),
                    temp_minC: covertToCelcius(weather.main.temp_min),
                    temp_maxC: covertToCelcius(weather.main.temp_max),
                };
                if (item.hh == 12) {
                    $("#weatherDay" + day).text(item.mm + " - " + item.dd);
                    $("#weatherDay" + day + "Icon").attr("src", item.icon);
                    $("#weatherDay" + day + "Icon").attr("title", item.description);
                    fahrenheit ?
                        $("#weatherDay" + day + "MaxMin").text(item.temp_minF + "º | " + item.temp_maxF + "º F") :
                        $("#weatherDay" + day + "MaxMin").text(item.temp_minC + "º | " + item.temp_maxC + "º C");
                    day += 1;
                }
                wheatherPreview.push(item);
            });
        }
    };
}

function setGraphWeatherPrev() {
    if (!wheatherPreviewSet) {
        setGraphWeather();
    } else {
        removeGraphWeather();
    }
    wheatherPreviewSet = !wheatherPreviewSet;
}

function setGraphWeather() {
    d3.select("#weatherToday").style("display", "none");
    d3.select("#weatherPrevSVG").style("display", "block");
    width = $("#weatherPrevSVG").width();
    height = $("#weatherPrevSVG").height();
    var margin = {
        top: height * 0.1,
        right: width * 0.1,
        bottom: height * 0.1,
        left: width * 0.1
    };
    width += -margin.left - margin.right;
    height += -margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var container = d3.select("#weatherPrevSVG")
        .append("svg")
        .attr("id", "graphWeather")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(wheatherPreview, function (d) {
        return d.date;
    }));
    y.domain([
        d3.min(wheatherPreview, function (d) {
            return fahrenheit ? d.temp_maxF : d.temp_maxC;
        }) - 5,
        d3.max(wheatherPreview, function (d) {
            return fahrenheit ? d.temp_maxF : d.temp_maxC;
        }) + 5
    ]);

    container.selectAll("circle")
        .data(wheatherPreview)
        .enter()
        .append("circle")
        .attr("class", "circleWeather")
        .attr("cx", function (d) {
            return x(d.date);
        })
        .attr("cy", function (d) {
            return y(fahrenheit ? d.temp_maxF : d.temp_maxC);
        })
        .attr("r", function (d) {
            return (fahrenheit ? d.tempF : d.tempC) * 0.2;
        });

    // Add the Y Axis
    container.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    /*container.append("g")
        .call(d3.axisLeft(y));*/
}

function removeGraphWeather() {
    d3.select("#weatherToday").style("display", "block");
    d3.select("#weatherPrevSVG").style("display", "none");
    $("#graphWeather").remove();
}