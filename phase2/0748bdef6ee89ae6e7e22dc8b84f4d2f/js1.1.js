

   var elevator;
            var map;
            // 2-level array for washed markets data
            var washedData = [];

            	//X1-ZWz1fqgyly9wy3_2t4xn
                //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url

   // var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?&locationid=FIPS:17&limit=150";
   var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=NEXRAD2&startdate=2017-03-01&enddate=2017-03-31&limit=15";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('token','BxdbNWpHSLkgXjwnVHLmfBrIfHOZBcWp');
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
           document.getElementById("text").innerHTML += JSON.stringify(json);
            }

    }