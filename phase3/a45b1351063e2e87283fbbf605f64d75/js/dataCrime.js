// 2-level array for washed markets data
var crime = [];
var xmlhttp = new XMLHttpRequest();
//document.getElementById("area-name").innerHTML = "hola";
var url = "https://data.cityofchicago.org/api/views/d62x-nvdr/rows.json?accessType=DOWNLOAD";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//init the google map in the webpage

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //get the text content from the page response
        var myArr = xmlhttp.responseText;
        var text = myArr;
        json = JSON.parse(text);
        var crime = [];
        var porcentaje = [];
        var total = 0;
        //77=> number of communityNum total
        for (var i = 1; i < 78; i++) {
            crime[i] = 0;
        }

        $.each(json.data, function(i, x) {
            crime[x[21]] = crime[x[21]] + 1;
            total = total + 1;
        });
        for (var i = 1; i < 78; i++) {
            porcentaje[i] = (100 * crime[i]) / total;
        }
        document.getElementById("map").addEventListener("click", myFunction);

        function myFunction() {
            var i = Number(document.getElementById("area-number").innerHTML.replace("<b>Area Number</b>: ", ""));
            document.getElementById("crimes").innerHTML = "<b>Percentage of crimes</b>: " + porcentaje[i].toFixed(2) + "%";
        }

    }
};
