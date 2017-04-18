$(document).ready(function(){
            $("#btnShowCommunityAreas").click(function() {
                var ctaLayer = new google.maps.KmlLayer({
                    url: 'https://data.cityofchicago.org/api/geospatial/cauq-8yn6?method=export&format=KML',
                    map: map,
                    preserveViewport:true
                });
                
            });
        });
        
           