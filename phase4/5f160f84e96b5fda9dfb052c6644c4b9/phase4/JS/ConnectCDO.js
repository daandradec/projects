 
 $(document).ready(function () {
    
            $("#btnShowWindTemperature").click(function () {
                //chicagoLocationId="CITY:US170006";
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                if(dd<10) {
                    dd='0'+dd;
                } 
                if(mm<10) {
                    mm='0'+mm;
                } 
                today = yyyy+'-'+mm+'-'+dd;
                
                
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("token", "nRpmYzhkcrweuVXxRmEMMGcfkVUvXgTi");
                    },
                    url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND",
                    method: "GET",
                    data: {
                        locationid:"CITY:US170006",
                        limit: "50",
                        startdate:"2017-04-11",
                        enddate:today,
                        datatypeid:"TAVG",
                        units:"metric"
                    },
                    datatype: "json",
                    success: function (result) {
                       var collectedData = result;
                       var dataResults = collectedData.results; // object array (data)
                       $("#pInformation").html("<h2>Average Wind Temperature For Chicago,IL: "+dataResults[dataResults.length-1].value +"º C"+"</h2>");
                        
                       
                    }});
            });
        });
        
        