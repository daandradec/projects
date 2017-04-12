function initializeMap(){
                var mapDiv = document.getElementById('googlemap');
                var map = new google.maps.Map(mapDiv, {
                        center: {lat: 40.4237, lng: -86.9212}, zoom: 12});
                 var marker1 = new google.maps.Marker({ 
                    position: {lat: 40.461469, lng: -86.915836},
                        map: map,
                    title: 'West Lafayette Farmers Markert'});
                var marker2 = new google.maps.Marker({ 
                    position: {lat: 40.4450, lng: -86.9136},
                        map: map,
                    title: 'Sagamore West Farmers Market'});
                var marker3 = new google.maps.Marker({
                    position: {lat: 40.425830, lng: -86.914239},
                        map: map,
                    title: 'Purdue Farmers Market'});
                var marker4 = new google.maps.Marker({ 
                    position: {lat: 40.417715, lng: -86.891895},
                        map: map,
                    title: 'Historic Lafayette Farmers Market'})
                var infowindow = new google.maps.InfoWindow({
                            content: ""});
                }