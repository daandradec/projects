
var xmlhttp = new XMLHttpRequest();
var url = "https://data.cityofchicago.org/api/views/i6bp-fvbx/rows.json?accessType=DOWNLOAD";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var json = JSON.parse(myArr);
        document.getElementById("header1").innerHTML = "" + json.meta.view.columns[8].id;
        console.log(json.data[0][8]);
    }
};

