$(document).ready(function(){
            $("#button2").click(function () {
                $.ajax({
                    url: "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json",
                    method: "GET",
                    data:"accessType=DOWNLOAD",
                    datatype: "json",
                    
                    success: function(result){
                        var collectedData = result;
                        //Metadata
                        var metaData = collectedData.meta.view;
                        var mdID = metaData.id;
                        $("#p2").html(mdID + " (connected)");
                    }
                });
            });
        });
        
