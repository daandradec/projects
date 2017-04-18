 /* global dataSetARHD */
/* global dataSetCommunityAreaPrice */
        $(document).ready(function(){
            $("#SelectPlaceOption").change(function(){
                updatePlaceOption();
            });
        });

function updatePlaceOption(){
    if(document.getElementById("SelectSearchOption").selectedIndex ===0){
                    
                    var placeSelected= dataSetARHD[document.getElementById("SelectPlaceOption").selectedIndex];
                    if(placeSelected[19]!== null){
                        initMap();
                        var latitude = parseFloat(placeSelected[19]);
                        var longitude = parseFloat(placeSelected[20]);
                        var name = placeSelected[11];
                        var contactNumber = placeSelected[14];
                        var center = new google.maps.LatLng(latitude, longitude);

                        var index = Number(placeSelected[9])-1;
                            if (index < 0){ // fix an error in ARHD dataset (doesnot show the community area number)
                                for(var j =0;j<dataSetCommunityAreaPrice.length;j++){
                                    if(dataSetCommunityAreaPrice[j].name === dataSetARHD[i][8]){
                                        index = j;
                                    }
                                }
                            }
                        var name=placeSelected[11];    
                        var adress=placeSelected[12];
                        var zip = placeSelected[13];
                        var communityArea =placeSelected[8];
                        var contactPhone =placeSelected[14];
                        var units = placeSelected[16];
                        var managementCompany = placeSelected[15];
                        var priceMonth =(dataSetCommunityAreaPrice[index].minRentPrice).toString();
                        
                        map.panTo(center);
                        var marker = new google.maps.Marker({
                            position: {lat:latitude ,
                            lng:longitude},
                            map:map,
                            title: name + "\nContact number: " + contactNumber,
                            label: "                    "+ priceMonth + "$",
                            icon: "IMG/home.png"

                        });
                        var directionsService = new google.maps.DirectionsService;
                        var directionsDisplay = new google.maps.DirectionsRenderer;
                        var origin = new google.maps.LatLng(latitude, longitude);
                        var destination = new google.maps.LatLng("41.8708", "-87.6505");
                        var travelmode = "DRIVING";
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
                        
                        
                        calculateAndDisplayRoute(directionsService, directionsDisplay, travelmode, origin, destination);
                        directionsDisplay.setMap(map);
                        directionsDisplay.setOptions( { suppressMarkers: true } );
                    }else{
                        window.alert("Coordinates NOT FOUND for this place,  Try other place...");
                    }
                }
                if(document.getElementById("SelectSearchOption").selectedIndex ===1){
                    var placeSelected= dataSetCommunityAreaPrice[document.getElementById("SelectPlaceOption").selectedIndex]; 
                    initMap();
                    var latitude =parseFloat(placeSelected.latitude);
                    var longitude=parseFloat(placeSelected.longitude);
                    var name =placeSelected.name;
                    var center = new google.maps.LatLng(latitude, longitude);
                    
                    map.panTo(center);
                    var marker = new google.maps.Marker({
                        position: {lat:latitude ,
                        lng:longitude},
                        map:map,
                        title: name,
                        label: "                    "+ (placeSelected.avgRentPrice).toString() + "$",
                        icon: "IMG/home.png"
                    
                    });
                    var directionsService = new google.maps.DirectionsService;
                    var directionsDisplay = new google.maps.DirectionsRenderer;
                    var origin = new google.maps.LatLng(latitude, longitude);
                    var destination = new google.maps.LatLng("41.8708", "-87.6505");
                    var travelmode = "DRIVING";
                    calculateAndDisplayRoute(directionsService, directionsDisplay, travelmode, origin, destination);
                    directionsDisplay.setMap(map);
                    directionsDisplay.setOptions( { suppressMarkers: true } ); 
                    
                     
                    var communityArea =placeSelected.name;
                    var minPriceMonth =(placeSelected.minRentPrice).toString();
                    var avgPriceMonth =(placeSelected.avgRentPrice).toString();
                    var maxPriceMonth =(placeSelected.maxRentPrice).toString();
                    var pLatitude = placeSelected.latitude;
                    var pLongitude = placeSelected.longitude;
                    var CAID =document.getElementById("SelectPlaceOption").selectedIndex+1;

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