        var dataSetARHD;
        var dataSetCommunityAreaPrice;
        //ARHD
        $.ajax({
            url: "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json",
            method: "GET",
            data:"accessType=DOWNLOAD",
            datatype: "json"
        }).done(function(data){
            var collectedData=data;
            dataSetARHD = collectedData.data; 
         });
         //CommunityAreas
         $.getJSON("DATA/CommunityAreasPrice.json", function(json) {
            var cData = json;
            dataSetCommunityAreaPrice = cData.CommunityArea.Areas;
         });
         //Crimes 
        
        //event search
        $(document).ready(function(){
            $("#btnSearch").click(function(){
                clearSelectSearchOption();
                var SearchOpt = document.getElementById("SelectSearchOption").selectedIndex;
                if (SearchOpt===0){
                    initMap();
                    for(var i=0 ; i<dataSetARHD.length ; i++){
                        //creates options elements
                        var x = document.getElementById("SelectPlaceOption");
                        var option = document.createElement("option");
                        option.text = dataSetARHD[i][11];
                        x.add(option, x[i]);
                        x.disabled = false;
                        //-------------
                        var index  =Number(dataSetARHD[i][9])-1;
                        if (index < 0){ // fix an error in ARHD dataset (doesnot show the community area number)
                            for(var j =0;j<dataSetCommunityAreaPrice.length;j++){
                                if(dataSetCommunityAreaPrice[j].name === dataSetARHD[i][8]){
                                    index = j;
                                }
                            }
                        }

                        //creates every marker in google map
                        var marker = new google.maps.Marker({
                            position: {lat:parseFloat(dataSetARHD[i][19]) ,
                                    lng:parseFloat(dataSetARHD[i][20])},
                            map:map,
                            title: dataSetARHD[i][11] + "\nContact number: " + dataSetARHD[i][14],
                            label: "                    "+ (dataSetCommunityAreaPrice[index].minRentPrice).toString() + "$",
                            icon: "IMG/home.png"
                        });
                        if(i===0){
                            var placeSelected=dataSetARHD[i];
                            var name=placeSelected[11];    
                            var adress=placeSelected[12];
                            var zip = placeSelected[13];
                            var communityArea =placeSelected[8];
                            var contactPhone =placeSelected[14];
                            var units = placeSelected[16];
                            var managementCompany = placeSelected[15];
                            var priceMonth =(dataSetCommunityAreaPrice[index].minRentPrice).toString();

                             //display info
                            $("#pInformation").html(
                                "<br><u><i><b>"+name+"</i></b></u><br>"
                                +"<b>Price /mo (Aprox): </b>"+ priceMonth +" USD"+" <br> " 
                                +"<b>Adress: </b>"+adress +" <br> " 
                                +"<b>ZipCode: </b>"+zip +" <br> " 
                                +"<b>Community Area: </b>"+communityArea +" <br> " 
                                +"<b>Contact Phone: </b>"+ contactPhone +" <br> " 
                                +"<b>Units: </b>"+ units +" <br> " 
                                +"<b>Management Company: </b>"+ managementCompany +" <br> " 
                            );
                        }    
                    }  
                }
                
                if (SearchOpt===1){
                    initMap();
                    for(var i=0 ; i<dataSetCommunityAreaPrice.length ; i++){

                        //creates options elements
                            var x = document.getElementById("SelectPlaceOption");
                            var option = document.createElement("option");
                            option.text = dataSetCommunityAreaPrice[i].name;
                            x.add(option, x[i]);
                            x.disabled = false;
                            //-------------

                        var marker = new google.maps.Marker({
                            position: {lat:parseFloat(dataSetCommunityAreaPrice[i].latitude) ,
                                        lng:parseFloat(dataSetCommunityAreaPrice[i].longitude)},
                            map:map,
                            title: dataSetCommunityAreaPrice[i].name,
                            label: "                    "+ (dataSetCommunityAreaPrice[i].avgRentPrice).toString() + "$",
                            icon: "IMG/home.png"
                        });
                        if(i===0){
                            var placeSelected =dataSetCommunityAreaPrice[i];
                            var communityArea =placeSelected.name;
                            var minPriceMonth =(placeSelected.minRentPrice).toString();
                            var avgPriceMonth =(placeSelected.avgRentPrice).toString();
                            var maxPriceMonth =(placeSelected.maxRentPrice).toString();
                            var pLatitude = placeSelected.latitude;
                            var pLongitude = placeSelected.longitude;
                            var CAID =1;

                                //display info
                            $("#pInformation").html(
                                "<br><u><i><b>"+communityArea+"</i></b></u><br>"
                                +"<b>Minimum Price /mo (Aprox): </b>"+ minPriceMonth +" USD"+" <br> " 
                                +"<b>Average Price /mo (Aprox): </b>"+ avgPriceMonth +" USD"+" <br> " 
                                +"<b>Maximum Price /mo (Aprox): </b>"+ maxPriceMonth +" USD"+" <br> " 
                                +"<b>Community Area ID: </b>"+CAID +" <br> " 
                                +"<b>Latitude: </b>"+ pLatitude +" <br> " 
                                +"<b>Longitude: </b>"+ pLongitude +" <br> " 
                            );   
                        }
                    }
                    
                      
                }
 
                
                
            }); 
        });