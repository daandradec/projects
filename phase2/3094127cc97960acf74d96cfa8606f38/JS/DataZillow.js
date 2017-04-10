$.support.cors = true;

var result;
var markers = [];
var infowindow = [];

$.ajax({
  type: "GET",
  cache: false,
  dataType:'xml',
  url:"http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=X1-ZWz199tu45lc0b_8b748&zpid=3874522&count=25",
  success: function(pre){
    console.log(pre);
    var x2js = new X2JS();
    var result = x2js.xml2json(pre);

    console.log(result);


    for(var i = 0; i < 25 ; i ++)
    {
    // $.ajax({ // Get Specific information for Apartment
    //   type: "GET",
    //   cache: false,
    //   dataType:'xml',
    //   url:"http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz199xs6dpa8b_5i268&zpid="+result.comps.response.properties.comparables.comp[i].zpid,
    //   success: function( pre1 ){
    //     console.log(pre1);
    //     //var x2js = new X2JS();
    //     //var result = x2js.xml2json(pre);
    //   }
    // })

      marker1 = new objetcMarker(
        Number(result.comps.response.properties.comparables.comp[i].address.latitude),
        Number(result.comps.response.properties.comparables.comp[i].address.longitude),
        "<p>Address: " + result.comps.response.properties.comparables.comp[i].address.street+'<p>'

      );
      markers.push(marker1);
    } // End For

   DrawMarkers(markers, 'Images/Apartment-icon-2-map.png');
  }
 })
