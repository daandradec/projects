$.ajax(
{
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?',
    data:{datasetid:'GHCND',startdate:'2017-04-04',enddate:'2017-04-04',
        limit:'1000',units:'metric',locationid:'CITY:US170006',includemetadata:'false'},
    headers:{ token: 'mCgwTtalGQhDNddfYZKBHkdVSiomhhaa' }
})
.done(function(data) {
  console.log(data);
    console.log(data.results[116].value);//Max TMP
    console.log(data.results[154].value);// AVG TMP
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
})
.fail(function(data) {
  alert( "error reading data" );
})
