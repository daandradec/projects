var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var myArr = xmlhttp.responseText;
var text = myArr;
}
};

$(document).on('pagebeforeshow', '#index', function(){       
    $(document).ready(function () {
        $('#test').weatherfeed(['UKXX0085','EGXX0011','UKXX0061','CAXX0518','CHXX0049']);
    });
});