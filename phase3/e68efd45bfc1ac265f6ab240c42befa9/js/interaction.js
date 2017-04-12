$(".main-menu > ul > li > a").click(function() {
   $(this).parent().children("div.menu").animate({
      height: "toggle"
   }, 500)
});

$(".main-menu > ul > li > a").click();

$(".click-me").click(function() {
   s = this.getAttribute("data-chart");
   $(this).parent().parent().children("form." + s).animate({
      height: "toggle"
   }, 500)
});

$(".click-me").click();

$(".community_area").change(function() {

   var visibility = map.getLayoutProperty("community_areas", 'visibility');

   if (visibility === 'visible') {
      map.setLayoutProperty("community_areas", 'visibility', 'none');
      this.className = '';
   } else {
      this.className = 'active';
      map.setLayoutProperty("community_areas", 'visibility', 'visible');
   }
});


$("select.ui").change(function() {
   var d = this.getAttribute("data-chart");
   switch (d) {
      case "tmp":
         tmpChart.transform(this.value.split(" ")[0].toLowerCase(), ["Minimum temperature", "Maximum temperature", "Average temperature"])
         break;
      case "wind":
         tmpChart.transform(this.value.split(" ")[0].toLowerCase(), "Average wind speed")
         break;
      case "prcp":
         prcpChart.update({
            chart: {
               type: this.value.split(" ")[0].toLowerCase()
            }
         })
         break;
      default:

   }

});

$("input.layer-menu").change(function() {
   var s = this.getAttribute("data-layer");
   $("." + s).toggleClass("none");
})

$("input.layer-menu2").change(function() {
   var s = this.getAttribute("data-layer");
   s.split(",").map(function (v) {
     var visibility = map.getLayoutProperty(v, 'visibility');
     map.setLayoutProperty(v, 'visibility', (visibility === 'visible' ? "none" : "visible" ));
   })

})

var changeLayer = function(year) {
   map.setPaintProperty("community_areas", "fill-color", {
      "property": "area_numbe",
      "type": "categorical",
      "stops": crimeStops[year]
   })
}
$("input[type=\"range\"]").on('input', function() {
   $(this).parent().find("span").text(this.value);
   changeLayer(this.value);
})

$(".community_area_crime").change(function(){
  var slider = $("#range-crime")
  if(slider[0].disabled){
    slider[0].disabled = false;
    map.setPaintProperty("community_areas", "fill-color", {
       "property": "area_numbe",
       "type": "categorical",
       "stops": crimeStops[slider[0].value]
    })

  }else{
    slider[0].disabled = true;
    map.setPaintProperty("community_areas", "fill-color","rgba(0,0,0,0.1)")

  }

})

$('input[name=community1]').change(function() {
      charts["crimeRatePie"].load({
        
      })

})
