/* global dataSetARHD */
/* global dataSetCommunityAreaPrice */
$(document).ready(function(){
            $("#btnFindSafest").click(function(){
                var SearchOpt = document.getElementById("SelectSearchOption").selectedIndex;
                
                if (SearchOpt===0){
                    var minCrimes=99999999;
                    var indexARHD=0;
                    var indexCAP=0;
                    clearSelectSearchOption();
                    for(var i=0 ; i<dataSetARHD.length ; i++){

                        var index  =Number(dataSetARHD[i][9])-1;
                        if (index < 0){ // fix an error in ARHD dataset (doesnot show the community area number)
                            for(var j =0;j<dataSetCommunityAreaPrice.length;j++){
                                if(dataSetCommunityAreaPrice[j].name === dataSetARHD[i][8]){
                                    index = j;
                                }
                            }
                        }
                        if(dataSetARHD[i][19] === null){
                            var x = document.getElementById("SelectPlaceOption");
                            var option = document.createElement("option");
                            option.text = dataSetARHD[i][11] + " : (Dataset Error) COORDINATES NOT FOUND";
                            x.add(option, x[i]);
                            x.disabled = false;
                            //------------- 
                            
                        }
                        var latitude =parseFloat(dataSetARHD[i][19]);
                        var longitude = parseFloat(dataSetARHD[i][20]);
                        var radius;
                        if(document.getElementById("SelectCrimeRadius").selectedIndex === 0){
                           radius=500; 
                        }
                        if(document.getElementById("SelectCrimeRadius").selectedIndex ===1){
                           radius=1000; 
                        }
                        if(document.getElementById("SelectCrimeRadius").selectedIndex ===2){
                           radius=2000; 
                        }
                        //disable button
                        $("#btnFindSafest").html("WAIT THIS CAN TAKE A LONG...");
                        document.getElementById("btnFindSafest").disabled = true;
                        $.ajax({
                            url: "https://data.cityofchicago.org/resource/3uz7-d32j.json",
                            method: "GET",
                            data:"$select=count(location)&$where=within_circle(location, " + latitude + ", "+ longitude + ", "+ radius+")",
                            datatype: "json",
                           async : false // I need to wait :'( 
                        }).done(function(data) {
                            var crimes = parseInt(data[0].count_location);
                            //creates options elements
                            var x = document.getElementById("SelectPlaceOption");
                            var option = document.createElement("option");
                            option.text = dataSetARHD[i][11] + " ---> Crimes within "+radius+"m: "+ crimes;
                            x.add(option, x[i]);
                            x.disabled = false;
                            //-------------
                            if(crimes <= minCrimes){

                                indexARHD = i;
                                indexCAP = index;
                                minCrimes= crimes;

                            }

                        });


                    }

                    var latitude = parseFloat(dataSetARHD[indexARHD][19]);
                    var longitude = parseFloat(dataSetARHD[indexARHD][20]);
                   
                    var center = new google.maps.LatLng(latitude,longitude);
                    initMap();
                    map.panTo(center);
                    var marker = new google.maps.Marker({
                        position: {
                            lat: latitude,
                            lng:longitude
                        },
                        map:map,
                        title: dataSetARHD[indexARHD][11] + "\nContact number: " + dataSetARHD[indexARHD][14],
                        label: "                    "+ (dataSetCommunityAreaPrice[indexCAP].minRentPrice).toString() + "$",
                        icon: "IMG/home.png"
                    });
                    //enable button
                    $("#btnFindSafest").html("Find Safest");
                    document.getElementById("btnFindSafest").disabled = false;
                    var placeSelected=dataSetARHD[indexARHD];
                    var name=placeSelected[11];    
                    var adress=placeSelected[12];
                    var zip = placeSelected[13];
                    var communityArea =placeSelected[8];
                    var contactPhone =placeSelected[14];
                    var units = placeSelected[16];
                    var managementCompany = placeSelected[15];
                    var priceMonth =(dataSetCommunityAreaPrice[indexCAP].minRentPrice).toString();
                    
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
                     document.getElementById("SelectPlaceOption").selectedIndex= indexARHD; //select the safest
                }
                if (SearchOpt===1){
                    var minCrimes=99999999;
                    var indexCAP=0;
                    clearSelectSearchOption();
                    $("#btnFindSafest").html("WAIT THIS CAN TAKE A LONG...");
                    document.getElementById("btnFindSafest").disabled = false;
                    for(var i=0 ; i<dataSetCommunityAreaPrice.length ; i++){
                        var latitude =parseFloat(dataSetCommunityAreaPrice[i].latitude);
                        var longitude = parseFloat(dataSetCommunityAreaPrice[i].longitude);
                        var radius;
                        if(document.getElementById("SelectCrimeRadius").selectedIndex === 0){
                           radius=500; 
                        }
                        if(document.getElementById("SelectCrimeRadius").selectedIndex ===1){
                           radius=1000; 
                        }
                        if(document.getElementById("SelectCrimeRadius").selectedIndex ===2){
                           radius=2000; 
                        }
                        $.ajax({
                            url: "https://data.cityofchicago.org/resource/3uz7-d32j.json",
                            method: "GET",
                            data:"$select=count(location)&$where=within_circle(location, " + latitude + ", "+ longitude + ", "+ radius+")",
                            datatype: "json",
                            async : false // I need to wait :'( 
                        }).done(function(data) {
                            var crimes = parseInt(data[0].count_location);
                            //creates options elements
                            var x = document.getElementById("SelectPlaceOption");
                            var option = document.createElement("option");
                            option.text = dataSetCommunityAreaPrice[i].name + " ---> Crimes within "+radius+"m: "+ crimes;
                            x.add(option, x[i]);
                            x.disabled = false;
                            //-------------
                            if(crimes <= minCrimes){
                                indexCAP = i;
                                minCrimes= crimes;

                            }

                        });
                    }

                    var latitude =parseFloat(dataSetCommunityAreaPrice[indexCAP].latitude);
                    var longitude = parseFloat(dataSetCommunityAreaPrice[indexCAP].longitude);
                    document.getElementById("SelectPlaceOption").selectedIndex= indexCAP; //select the safest
                    document.getElementById("SelectPlaceOption").selectedIndex= indexCAP; //borrame
                    var center = new google.maps.LatLng(latitude,longitude);
                    initMap();
                    map.panTo(center);
                    var marker = new google.maps.Marker({
                        position: {
                            lat: latitude,
                            lng:longitude
                        },
                        map:map,
                        title: dataSetCommunityAreaPrice[indexCAP].name,
                        label: "                    "+ (dataSetCommunityAreaPrice[indexCAP].avgRentPrice).toString() + "$",
                        icon: "IMG/home.png"
                    });
                    //enable button
                     $("#btnFindSafest").html("Find Safest");
                    document.getElementById("btnFindSafest").disabled = false;

                    var placeSelected=dataSetCommunityAreaPrice[indexCAP];   
                    var communityArea =placeSelected.name;
                    var minPriceMonth =(placeSelected.minRentPrice).toString();
                    var avgPriceMonth =(placeSelected.avgRentPrice).toString();
                    var maxPriceMonth =(placeSelected.maxRentPrice).toString();
                    var pLatitude = placeSelected.latitude;
                    var pLongitude = placeSelected.longitude;
                    var CAID =indexCAP+1;

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
        