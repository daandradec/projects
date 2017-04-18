        function calculateAndDisplayRoute(directionsService, directionsDisplay, travelmode, origin, destination) {
            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: "TRANSIT",
                transitOptions: {
                    routingPreference: 'FEWER_TRANSFERS'
                } 
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                }else{
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        
        $(document).ready(function(){
            $("#btnResetMap").click(function(){
                initMap();              
            });
        });
        
        function clearSelectSearchOption(){
            if(document.getElementById("SelectPlaceOption").disabled === false){
                    document.getElementById("SelectPlaceOption").options.length = 0;
                    document.getElementById("SelectPlaceOption").disabled = true;
                }
            
        }