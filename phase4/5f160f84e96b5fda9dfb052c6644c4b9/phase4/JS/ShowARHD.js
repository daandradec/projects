 $(document).ready(function(){
            $("#btnShowARHD").click(function () {
                $.ajax({
                    url: "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json",
                    method: "GET",
                    data:"accessType=DOWNLOAD",
                    datatype: "json",
                    
                    success: function(result){
                        var collectedData = result;
                        var dataResults = collectedData.data;
                        
                        
                            initMap();
                            for(i=0 ; i<dataResults.length ; i++){
                                var marker = new google.maps.Marker({
                                    position: {lat:parseFloat(dataResults[i][19]) ,
                                            lng:parseFloat(dataResults[i][20])},
                                    map:map,
                                    title: dataResults[i][11],
                                    //label: "PS",
                                    icon: "IMG/home.png"
                                });
                          
                            }
                    }
                });
            });
        });
        