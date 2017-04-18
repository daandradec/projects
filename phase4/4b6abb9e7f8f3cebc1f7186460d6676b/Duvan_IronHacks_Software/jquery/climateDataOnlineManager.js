getCurrentDateForClimateDataOnline();
$.ajax(
{
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?',
    data:{datasetid:'GHCND',startdate:date,enddate:date,
        limit:'1000',units:'metric',locationid:'CITY:US170006',includemetadata:'false'},
    headers:{ token: 'mCgwTtalGQhDNddfYZKBHkdVSiomhhaa' }
})
.done(function(data) {
    if(data.results !== undefined){
        var dataWeath;
        for(var i = 0;i < data.results.length;++i){
            if(data.results[i].datatype=="TAVG"){
                dataWeath = data.results[i].value;
                break;
            }
        }
        document.getElementById("paragraphWeather").innerHTML = dataWeath + "°";
        if(dataWeath < 10){
            document.getElementById("imgReport").src = "../img/cold.jpg";
            document.getElementById("paragraphWeather2").innerHTML = "Cold and a bit dangerous";
        } else if(dataWeath < 20){
            document.getElementById("imgReport").src = "../img/tempered.jpg";
            document.getElementById("paragraphWeather2").innerHTML = "Cool and safe";
        }else{
            document.getElementById("imgReport").src = "../img/hot.jpg";
            document.getElementById("paragraphWeather2").innerHTML = "Warm and half safe";
        }
    }else{
        for(var i = 0;i < 5000;++i){}
        var minTmp = dataWeatherJson.main.temp_min;
        var maxTmp = dataWeatherJson.main.temp_max;
        var avgTmp = (maxTmp+minTmp)/2;
        document.getElementById("paragraphWeather").innerHTML = avgTmp + "°";
        if(avgTmp < 10){
            document.getElementById("imgReport").src = "../img/cold.jpg";
            document.getElementById("paragraphWeather2").innerHTML = "Cold and a bit dangerous";
        } else if(avgTmp < 20){
            document.getElementById("imgReport").src = "../img/tempered.jpg";
            document.getElementById("paragraphWeather2").innerHTML = "Cool and safe";
        }else{
            document.getElementById("imgReport").src = "../img/hot.jpg";
            document.getElementById("paragraphWeather2").innerHTML = "Warm and half safe";
        }
    }
})
.fail(function(data) {
    document.getElementById("paragraphWeather").innerHTML = "The server is on hold";
    document.getElementById("paragraphWeather2").innerHTML = "Please try again";
})
