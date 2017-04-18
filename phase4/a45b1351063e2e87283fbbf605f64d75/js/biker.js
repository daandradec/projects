var bike = [];
var xmlhttp3 = new XMLHttpRequest();
//document.getElementById("area-name").innerHTML = "hola";
var url3 = "https://data.cityofchicago.org/api/views/cbyb-69xx/rows.json?accessType=DOWNLOAD";
xmlhttp3.open("GET", url3, true);
xmlhttp3.send();
//init the google map in the webpage

xmlhttp3.onreadystatechange = function() {
    if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
        //get the text content from the page response
        var myArr3 = xmlhttp3.responseText;
        var text3 = myArr3;
        json3 = JSON.parse(text3);

        //77=> number of communityNum total
        for (var i = 1; i < 78; i++) {
            bike[i] = 0;
        }

        $.each(json3.data, function(i, x) {
          bike[x[11]] = bike[x[11]] + 1;
        });

          document.getElementById("map").addEventListener("click", myFunction2);

        function myFunction2() {
            var ii = Number(document.getElementById("area-number").innerHTML.replace("<b>Area Number</b>: ", ""));
            document.getElementById("bike").innerHTML = "<b>Number of bicycle racks nearby</b>: " + bike[ii];
        }

    }
};
