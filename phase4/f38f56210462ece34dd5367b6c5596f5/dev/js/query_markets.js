$(document).ready(function(){
    $("#market-button").one("click",function(){
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            // submit a get request to the restful service zipSearch or locSearch.
            url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=47906",
            // or
            // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
            dataType: 'jsonp',
            jsonpCallback: 'searchResultsHandler'
        });
     });
    $(function(){
    var $select = $(".1-100");
    for (i=1;i<=100;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});
});
//iterate through the JSON result object.
  var mytable = $("<table></table>");
  mytable.append("<tr><th>Marketname</th><th>Address</th><th>Schedule</th></tr>");
  var array_index =[];
  var market_name = []
  var link = [];
  var count = 0;
  var map;
    var elevator;
    var myOptions = {
        zoom: 8,
        center: {lat: 40.2672, lng: -86.1349},
        mapTypeId: 'terrain'
    };
    map = new google.maps.Map($('#map')[0], myOptions);
    

function searchResultsHandler(result) {
 
   for(var i=0;i<result.results.length; ++i)
   {
    array_index[i] = result.results[i].id;
    market_name[i] = result.results[i].marketname;
   }
  $.each(array_index,function(index, value){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service mktDetail.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + value,
        dataType: 'jsonp',
      //  jsonpCallback: 'detailResultHandler',
      success: function (detailresults)
       {
        for (var key in detailresults) 
         {
        var results = detailresults[key];
        link[count] = results['Address'];
       console.log(results['Address']);
        mytable.append("<tr><td>" + market_name[count] +"</td><td>" + results['Address'] +"</td><td>"+results['Schedule']+"</td></tr>");
       
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+results['Address']+'&sensor=false', null, function (data) {
            var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
        var content = '<a href="'+results['GoogleLink']+'">'+market_name[count]+'</a>';
             var infowindow = new google.maps.InfoWindow();
 count = count+1;
google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
           infowindow.setContent(content);
           infowindow.open(map,marker);
        };
    })(marker,content,infowindow)); 
});

    }
       $("#m").append(mytable);
      }

    });
  });    

//iterate through the JSON result object.


}




//console.log(array_index);