      $(document).ready(function(){
            $("#btnShowPoliceStations").click(function(){
               $.ajax({
                    url: "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json",
                    method: "GET",
                    data:"accessType=DOWNLOAD",
                    datatype: "json",
   
                    success: function(result){
                        var collectedData = result;
                        //Metadata
                        var metaData = collectedData.meta.view;
                        var dataResults = collectedData.data;
                        
                        for(i=0 ; i<dataResults.length ; i++){
                            var marker = new google.maps.Marker({
                                position: {lat:parseFloat(dataResults[i][20]) ,
                                            lng:parseFloat(dataResults[i][21])},
                                map:map,
                                title: dataResults[i][9],
                                //label: "PS",
                                icon: "IMG/police.png"
                            });
                          
                        }
                    }
               }); 
            });
        });
        
        $(document).ready(function(){
            $("#btnShowFireStations").click(function(){
               $.ajax({
                    url: "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json",
                    method: "GET",
                    data:"accessType=DOWNLOAD",
                    datatype: "json",
   
                    success: function(result){
                        var collectedData = result;
                        //Metadata
                        var metaData = collectedData.meta.view;
                        var fireStations = collectedData.data;
                        
                        for(var i=0 ; i<fireStations.length ; i++){
                            var name = fireStations[i][8];
                            var address = fireStations[i][9];
                            var latitude = parseFloat(fireStations[i][14][1]);
                            var longitude = parseFloat(fireStations[i][14][2]);
                            
                            var marker = new google.maps.Marker({
                                position: {lat:latitude ,
                                            lng:longitude},
                                map:map,
                                title: "Name: " + name + "\n" + "Adress: "+ address,
                                //label: "PS",
                                icon: "IMG/firestation.png"
                            });
                          
                        }
                    }
               }); 
            });
        });
        
