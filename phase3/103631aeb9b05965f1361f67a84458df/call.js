var x = 0;
var y = 0;

function populate( s1 ){
   var s1 = document.getElementById( s1 );
      if( s1.value == "1" ){
         x = 0.0;
         y = 0.05;
      }
      else if( s1.value == "2" ){
         x = 0.05;
         y = 0.1;
      }
      else if( s1.value == "3" ){
         x = 0.1;
         y = 0.15;
      }
      else if( s1.value == "4" ){
         x = 0.15;
         y = 0.2;
      }
      else if( s1.value == "5" ){
         x = 0.0;
         y = 0.2;
      }

   initMap( )
}
 
function initMap( ){
   var mapDiv = document.getElementById( 'map' );
   var map = new google.maps.Map( mapDiv, { center: { lat:  41.868099, lng: -87.671617 }, zoom : 12 } );
   var marker = new google.maps.Marker( { position: { lat:  41.868099, lng: -87.671617 }, map : map, title : 'Chicago University' } )
         
   var aptData = [];
   var xmlhttp = new XMLHttpRequest();
   var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
   xmlhttp.open( "GET", url, true );
   xmlhttp.send( );

   var aptData2 = [];
   var xmlhttp2 = new XMLHttpRequest();
   var url2 = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
   xmlhttp2.open( "GET", url2, true );
   xmlhttp2.send( );

   xmlhttp.onreadystatechange = function( ){
      if( xmlhttp.readyState == 4 && xmlhttp.status == 200 ){
         var myArr = xmlhttp.responseText;
         var text = myArr;
         var json = JSON.parse( text );

         for( var i = 0; i < 263; i++ ){
            var dataLine = [];
            dataLine.push( Number( json.data[ i ][ 19 ] ) );
            dataLine.push( Number( json.data[ i ][ 20 ] ) );
            
            dataLine.push( Math.abs( Number( json.data[ i ][ 19 ] ) - 41.868099 ) +  Math.abs( Number( json.data[ i ][ 20 ] ) + 87.671617 ) );
            
            if(  dataLine[ 2 ] >= x && dataLine[ 2 ] <= y ){
               var myLatLng = { lat : Number( json.data[ i ][ 19 ] ), lng : Number( json.data[ i ][ 20 ] ) };
               var labels = 'H';
               var marker = new google.maps.Marker( { position : myLatLng, map : map, label : labels, title : json.data[ i ][ 12 ] } ); 
               marker.addListener( 'click', function( ){
                  var lati = marker.getPosition( ).lat( ) ;
                  var long = marker.getPosition( ).lng( ) ; 

                  if( xmlhttp2.readyState == 4 && xmlhttp2.status == 200 ){
                     var myArr2 = xmlhttp2.responseText;
                     var text2 = myArr2;
                     var json2 = JSON.parse( text2 );

                     for( var j = 0; j < 23; j++ ){
                        var dataLine2 = [];
                        dataLine2.push( json2.data[ j ][ 20 ]  );
                        dataLine2.push( json2.data[ j ][ 21 ]  );

                        dataLine2.push( Math.abs( Number( json.data[ j ][ 19 ] ) - lati ) +  Math.abs( Number( json.data[ j ][ 20 ] ) - long ) );  
                         
                        if(  dataLine2[ 2 ] <= 0.1 ){
                          var myLatLng2 = { lat : Number( json2.data[ j ][ 20 ] ), lng : Number( json2.data[ j ][ 21 ] ) };
                          var labels2 = 'P';
                          var marker2 = new google.maps.Marker( { position : myLatLng2, map : map, label : labels2, title : json.data[ j ][ 10 ] } );
                        } 
                     };                
                  }
               } );
            }
         };

         var numberOfMarkets = aptData.length;
      }
   }
}

