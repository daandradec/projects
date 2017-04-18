$(document).ready(function(){
    $("#id_btn5").click(function(){
        $.ajax({
            type:"GET",
            url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOY&locationid=FIPS:17&startdate=2016-01-01&enddate=2016-12-31",
            headers:{token:"eUJAFHNCGUyRKDUalOUmhFsdVBRBacCN"},
            success:resultHandler,
            });
    });
});

function resultHandler(result){
    console.log(result.results);
    var mytable = $("<table></table>");
    mytable.append("<tr><td>ID</td><th>Marketname</th></tr>");
    for (var i = 0; i < result.results.length; ++i){
        mytable.append("<tr><td>" + result.results[i].TMAX + "</td><td>" + result.results[i].value + "</td></tr>")
    }
    $("body").append(mytable);
    $("body").css("background", "red");
}

document.getElementById("dataButton").addEventListener("click", fillRentHouses)

