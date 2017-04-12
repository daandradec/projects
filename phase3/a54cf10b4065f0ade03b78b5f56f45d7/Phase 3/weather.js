
//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        var weather = json.weather[0].main;

      //  document.getElementById("weather").innerHTML = "<em><b>" + json.weather[0].main + "</b></em>";
        console.log( json.weather[0].main );
        loadBackground(41.8, -87.6, weather);   // 41.870800, -87.650500
        //loadBackground(4.7250648, -74.2238019, weather);
      }
    };



    function loadBackground(lat, lon, weatherTag) {
        var script_element = document.createElement('script');
        // key API Flickr
        script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=41c1cbe4685ae6cce7b5ddd0cdf2cc0e&lat=" + lat + "&lon=" + lon + "&accuracy=1&tags=" + weatherTag + "&sort=relevance&extras=url_l&format=json";

        document.getElementsByTagName('head')[0].appendChild(script_element);
    }

    function jsonFlickrApi(data) {
        console.log(data);
        if (data.photos.pages > 0) {
            var photo = data.photos.photo[0];
            document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
            //document.querySelector("#image-source").setAttribute("href", "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id);
        } else {
            document.querySelector("body").style.backgroundImage = "url('http://www.chicagosouthloophotel.com/resourcefiles/homeimages/chicago-south-loop-hotel-home1-top.jpg ')";
            //document.querySelector("#image-source").setAttribute("href", "https://www.flickr.com/photos/superfamous/310185523/sizes/o/");
        }
    }
