/* global dataSetARHD */
/* global dataSetCommunityAreaPrice */
$(document).ready(function(){
            $("#btnFindCheapest").click(function(){
                var SearchOpt = document.getElementById("SelectSearchOption").selectedIndex;
                clearSelectSearchOption();
                if (SearchOpt===0){                             
                    initMap();
                    var min=999999;
                    var i1Min=0;
                    var i2Min=0;
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
                        if(dataSetCommunityAreaPrice[index].minRentPrice <= min){
                            min = dataSetCommunityAreaPrice[index].minRentPrice;
                            i1Min = index;
                            i2Min = i;
                        }
                    }
                    var placeSelected=dataSetARHD[i2Min];
                    var name=placeSelected[11];    
                    var adress=placeSelected[12];
                    var zip = placeSelected[13];
                    var communityArea =placeSelected[8];
                    var contactPhone =placeSelected[14];
                    var units = placeSelected[16];
                    var managementCompany = placeSelected[15];
                    var priceMonth =(dataSetCommunityAreaPrice[i1Min].minRentPrice).toString();

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


                    document.getElementById("SelectPlaceOption").selectedIndex= i2Min; //select the cheapest
                    //create a single marker for cheapest 
                    var latitude =parseFloat(dataSetARHD[i2Min][19]);
                    var longitude = parseFloat(dataSetARHD[i2Min][20]);
                    var center = new google.maps.LatLng(latitude, longitude);
                    map.panTo(center);
                    var marker = new google.maps.Marker({
                        position: {lat:latitude ,
                        lng:longitude},
                        map:map,
                        title: dataSetARHD[i2Min][11] + "\nContact number: " + dataSetARHD[i2Min][14],
                        label: "                    "+ (dataSetCommunityAreaPrice[i1Min].minRentPrice).toString() + "$",
                        icon: "IMG/home.png"
                    });
 
                }
                
                if (SearchOpt===1){
                  
                    initMap();
                    var min =999999;
                    var i1Min=0;
                    for(var i=0 ; i<dataSetCommunityAreaPrice.length ; i++){

                        //creates options elements
                        var x = document.getElementById("SelectPlaceOption");
                        var option = document.createElement("option");
                        option.text = dataSetCommunityAreaPrice[i].name;
                        x.add(option, x[i]);
                        x.disabled = false;
                        //-------------
                        if(dataSetCommunityAreaPrice[i].avgRentPrice <= min){
                            min = dataSetCommunityAreaPrice[i].avgRentPrice;
                            i1Min = i;
                        }
                    }
                    document.getElementById("SelectPlaceOption").selectedIndex= i1Min; //select the cheapest
                    var center = new google.maps.LatLng(dataSetCommunityAreaPrice[i1Min].latitude,dataSetCommunityAreaPrice[i1Min].longitude);
                    map.panTo(center);
                    var marker = new google.maps.Marker({
                        position: {lat:parseFloat(dataSetCommunityAreaPrice[i1Min].latitude) ,
                        lng:parseFloat(dataSetCommunityAreaPrice[i1Min].longitude)},
                        map:map,
                        title: dataSetCommunityAreaPrice[i1Min].name,
                        label: "                    "+ (dataSetCommunityAreaPrice[i1Min].avgRentPrice).toString() + "$",
                        icon: "IMG/home.png"
                    });
                    var placeSelected=dataSetCommunityAreaPrice[i1Min];   
                    var communityArea =placeSelected.name;
                    var minPriceMonth =(placeSelected.minRentPrice).toString();
                    var avgPriceMonth =(placeSelected.avgRentPrice).toString();
                    var maxPriceMonth =(placeSelected.maxRentPrice).toString();
                    var pLatitude = placeSelected.latitude;
                    var pLongitude = placeSelected.longitude;
                    var CAID =i1Min+1;

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

            }); 
        });
        