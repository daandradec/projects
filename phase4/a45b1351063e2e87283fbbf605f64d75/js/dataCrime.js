// 2-level array for washed markets data
var crime = [];
var xmlhttp2 = new XMLHttpRequest();
//document.getElementById("area-name").innerHTML = "hola";
var url2 = "https://data.cityofchicago.org/api/views/d62x-nvdr/rows.json?accessType=DOWNLOAD";
xmlhttp2.open("GET", url2, true);
xmlhttp2.send();

//init the google map in the webpage

xmlhttp2.onreadystatechange = function() {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
        //get the text content from the page response
        var myArr2 = xmlhttp2.responseText;
        var text2 = myArr2;
        json2 = JSON.parse(text2);
        var crime = [];
        var porcentaje = [];
        var total = 0;
        //77=> number of communityNum total
        for (var i = 1; i < 78; i++) {
            crime[i] = 0;
        }

        $.each(json2.data, function(i, x) {
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
