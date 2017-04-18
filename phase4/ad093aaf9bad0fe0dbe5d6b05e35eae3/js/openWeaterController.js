function covertToCelcius(kelvin) {
    return parseInt(parseFloat(kelvin) - 273.15);
}

function covertToFahrenheit(kelvin) {
    return parseInt((9 / 5) * (parseFloat(kelvin) - 273.15) + 32);
}

function getWeatherByGeographicCoordinates(latitude, longitude) {
    var url = urlBaseOWM + "weather?lat=" + latitude + "&lon=" + longitude;
    url += appIdOWM;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        $("#weatherDay").text((new Date()).toString().slice(0, 10));
        $("#weatherDayIcon").attr("src", urlOWMIcons + json.weather[0].icon + ".png");
        $("#weatherDayIcon").attr("data-balloon", json.weather[0].description);
        fahrenheit ?
            $("#weatherDayMaxMin").text(covertToFahrenheit(json.main.temp_min) + "º | " + covertToFahrenheit(json.main.temp_max) + "º F") :
            $("#weatherDayMaxMin").text(covertToCelcius(json.main.temp_min) + "º | " + covertToCelcius(json.main.temp_max) + "º C");
    });
}


function getWeatherByGeographicCoordinatesPreview(latitude, longitude) {
    var url = urlBaseOWM + "forecast?lat=" + latitude + "&lon=" + longitude;
    url += appIdOWM;
    var weatherP = [];
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
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
                speed_wind: Number(weather.wind.speed),
            };
            if (item.hh == 12) {

                weatherP.push(item);
            }
            wheatherPreview.push(item);
        });
        setGraphWeatherPrev(wheatherPreview);
        var dateFormat = d3.time.format("%H:%M %e %b");
        $("#weatherPrev div").remove();
        var weatherPrev = d3.select("#weatherPrev")
            .selectAll("div")
            .data(weatherP)
            .enter()
            .append("div")
            .attr("class", "col-xs-2 weatherPrevContent");

        weatherPrev
            .append("div")
            .style("font-size", "7pt")
            .html(function (d) {
                return dateFormat(d.date);
            })
            .attr("data-balloon", "mm - dd")
            .attr("data-balloon-pos", "down");

        weatherPrev
            .append("div")
            .attr("data-balloon", function (d) {
                return d.description;
            })
            .attr("data-balloon-pos", "up")
            .append("img")
            .attr("src", function (d) {
                return d.icon;
            })
            .attr("width", "40%");
        weatherPrev
            .append("div")
            .html(function (d) {
                return fahrenheit ?
                    d.temp_minF + "º | " + d.temp_maxF + "º F" :
                    d.temp_minC + "º | " + d.temp_maxC + "º C";
            })
            .attr("data-balloon", "Max | Min")
            .attr("data-balloon-pos", "up")
            .style("font-size", "7pt");
    });
}


function setGraphWeatherPrev(wheatherPreview) {
    var graph = {
        bindto: "#weatherPrevSvg",
        data: {
            json: wheatherPreview,
            keys: {
                x: "date",
                value: ["tempF", "temp_minF", "temp_maxF", "speed_wind", "humidity"],
            },
            names: {
                temp_minF: 'Minimum Temperature',
                temp_maxF: 'Maximum Temperature',
                speed_wind: "Speed Wind",
                tempF: "Temperature",
                humidity: "Humidity"
            }
        },
        axis: {
            x: {
                type: "timeseries",
                tick: {
                    culling: {
                        max: 16
                    },
                    multiline: false,
                    count: 5,
                    format: "%H:%M %e %b"
                }
            }
        },
        zoom: {
            enabled: true
        },
        legend: {
            position: "top"
        }
    };
    var chart = c3.generate(graph);
}