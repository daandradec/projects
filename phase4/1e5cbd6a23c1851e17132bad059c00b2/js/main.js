$(document).ready(function() {

    $("body").addClass("loaded");

    $(function () {
        $('a[rel="lightbox"]').fluidbox();
    })

});


var xmlhttp = new XMLHttpRequest();
var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/stations/GHCND:US1ILCK0014";
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader("token", "qEImmOnOvuoeCOAtjPgUPuzxDkioWmgm");
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        document.getElementById("selevation").innerHTML="<center>Elevation: " +json.elevation + " " + json.elevationUnit;
        document.getElementById("sname").innerHTML="<center>Name: " + json.name;
        document.getElementById("slatitude").innerHTML="<center>Latitude: " +json.latitude;
        document.getElementById("slongitude").innerHTML="<center>Longitude: " +json.longitude;
        document.getElementById("sdate").innerHTML="<center>Informates from: " + json.mindate + " to: " + json.maxdate;
        //alert(JSON.parse(text).coord.lon);    
        //document.getElementById("weather").innerHTML = "<center>Today the weather is <em>" + json.weather[0].main + "<img src=\"http://openweathermap.org/img/w/"+json.weather[0].icon+".png\"</em></center>";
        } else {
            //document.getElementById("weather").innerHTML = "Actually we can't get the weather from Chicago :(";
        }
    };
var xh = new XMLHttpRequest();
var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=SNWD&startdate=2015-01-01&enddate=2016-01-01&stationid=GHCND:US1ILCK0014&limit=100";
xh.open("GET",url, true);
xh.setRequestHeader("token", "qEImmOnOvuoeCOAtjPgUPuzxDkioWmgm");
xh.send();
xh.onreadystatechange = function() {
    if(xh.readyState == 4 && xh.status == 200){
        var myArr = xh.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        var count = 0;
        var i = 0;
        while(i < json.results.length-1){
            i+=1;
            count+=json.results[i].value;
        }
        document.getElementById("weather").innerHTML="<h3><center>In the last year, " + count/json.results.length + " was the average snow depth on Chicago</h3>";
    }
}