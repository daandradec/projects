$(document).ready(function(){
  // Variable initialization
  var pmu = {lat:40.424791, lng: -86.911548};
  var  mapsprevMarker = null;
  var localMarkets = [];
  var localMarketDetails = [];
  // View initialization
  $(".card-content").hide();


  // Initializing Map area
  var map;
  var lafArea = {lat:40.411313, lng:-86.901334};
  var mapOptions = {
    center: lafArea,
    clickableIcons: false,
    zoom: 13
  };
  map = new google.maps.Map(document.getElementById('main-map'),mapOptions);

  // Making a map marker
  var PMUMarker = new google.maps.Marker({
    position: pmu,
    map: map
  });

  // Defining some map event listeners
  PMUMarker.addListener('click',function(){
    $(".card-content").show(400);
    mapsprevMarker = PMUMarker;
  });

  map.addListener('click', function(e){
    if(mapsprevMarker != null){
      if(!e.latLng.equals(mapsprevMarker.getPosition())){
        $(".card-content").slideUp();
        mapsprevMarker = null;
      }
    }
  });


  //Materialize events

  $('.sidebar-collapse').sideNav({
    edge: 'left',
  });



  $(".menu-sidebar-collapse").sideNav({
    edge: 'left',
    //menuWidth: 300,
    draggable: true
  });


  // Working with data:
  // First of all, let's get the list of local markets from USDA
  // This data will be based on the current location of the user
  // TODO: provide an option for the user to get the list based on zip code

  var marketsData =  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url:"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + pmu.lat+ "&lng=" + pmu.lng,
    dataType: 'jsonp',
    success: function(data){
      extractMarkets(data).then(function(){
        console.log(localMarkets);
        for (var i = 0; i < localMarkets.length; i++){
          var currentMarket = localMarkets[i];
          var detailedInfo = $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url:"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + currentMarket["id"],
            dataType: 'jsonp',
            success: function(dd){
              extractMarketDetails(dd,currentMarket["id"]);
            },
            fail: function(){
              console.log("Failed to get detailed data");
            }
          });

        }
      });
    }

  });

  //marketsData.done(handleMarkets(markets));

  /*
  */

});
