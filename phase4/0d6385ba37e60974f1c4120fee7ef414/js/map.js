
var elevator;

var numberOfMarkets;
var washedData = [];
var washedDataDetail = [];

var map;


function show_contents_of_market(market_name, detail_result){

  // 마켓 네임이랑 li에 있는거랑 찾아서 해당 li 확대시키기 
  //document.getElementById("Marketlists")
  $.each($('.markets_class'), function(index, value){
    
    

    if($(value).text() == market_name){

      //var pos =  $('#Marketlists li:nth-child(1)').position().top;
      //alert(pos);
      
      if(index >= 9){
          
          $('#Marketlists').animate({

            scrollTop : $('#Marketlists li:nth-child(9)').position().top
        
          }, 'slow');

      }else{

          $('#Marketlists').animate({

            scrollTop : 0
        
          }, 'slow');

      }

      
      //1 -> pos : 100
      //19 -> pos : 604
      // 10 -> 352
      //alert(pos);
      //alert(index);
      //var pos = $(value).scrollTop();
      //var pos = $('.markets_class')[index].scrollTop;
      //alert(pos);
      //alert(pos);
      //$(Marketlists).scrollTop(pos.scrollTop);
      //alert(index);
      
      //var x = $('#Marketlists li:nth-child('+index+')').position();
      //alert( x.top);

      //$('#Marketlists').animate({

      //  scrollTop : $('#Marketlists li:nth-child(10)').offset().top
        
      //}, 'slow');

      
      
      

      $(value).css({
        "color" : "black",
        "font-size" : "180%",
        "padding-bottom" : "2%"
      });   

      $(value).after(
        '<div id = "temp">'+
          '<span id="temp_Address"> Address : ' + detail_result["Address"] + '</span><br>' +
          '<span id="temp_products"> Products : ' + detail_result["Products"] + '</span></div>')
      
    }else{

      $(value).css({
        color : "grey"
      });  

      

    }

  });  


  //alert(detail_result['Address']);
  //detail_result['Address']
  //detail_result['GoogleLink']
  //detail_result['Products']
  //detail_result['Schedule']

}

function back_to_origianl(market_name){

  

  $.each($('.markets_class'), function(index, value){
    
    if($(value).text() == market_name){

      $(value).css({
        "color": "black",
        "font-size": "100%",
        "padding-bottom" : "0%"
      });

      $(temp).remove();      

      
      
    }else{
      $(value).css({
        color : "black"
      });  
    }
  });  

}


function getResults(zip) {   
		
    $.ajax({
        type: "GET",
       	contentType: "application/json; charset=utf-8",        
       	url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,        
       	dataType: 'jsonp',
       	jsonpCallback: 'searchResultsHandler'

  	});
 
} 

//iterate through the JSON result object.
function searchResultsHandler(searchresults) {

	
   	for (var key in searchresults) {
       
   		results = searchresults[key];

      for (var i = 0; i < 4; i++) {

      	var dataLine = [];
      	var result = results[i];

      	for(var key in result){

      		dataLine.push(result[key]);

      	}

      	washedData.push(dataLine);                

      }     	
   	}   

    results.length = 4;
   	numberOfMarkets = results.length;    

    // Shows the list of Markets
    for(var i=0; i<numberOfMarkets; i++){

      var li = document.createElement("li");
      var textnode = document.createTextNode(washedData[i][1]);

      li.appendChild(textnode);
      li.setAttribute("id", textnode);
      li.setAttribute("class", "markets_class");

      document.getElementById("Marketlists").appendChild(li);      

    }

    //add markers on the map
    var markers = [];
    $.each(markers, function(key, value){
      value.setMap(null);
    })

    // getting the detail data of markets
    $.each(washedData, function(key, value){

      //key : 1 , value : id, market name
      //alert(key +" : "+value[1]);
      //1011203

      $.ajax({

        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + value[0],
        dataType: 'jsonp',
        async : false,

        success: function(detailresults){

          var detail_result = detailresults['marketdetails'];

          
          //geocoding
          var geocoder = new google.maps.Geocoder();

          geocoder.geocode({'address':detail_result['Address']}, function(results,status){

                if(status == google.maps.GeocoderStatus.OK){                  

                  //alert(results[0].formatted_address);
                  markers[results] = new google.maps.Marker({

                    map: map,
                    position : results[0].geometry.location,
                    title : value[1] //Market name

                  });

                  var listener1 = google.maps.event.addListener(markers[results], 'mouseover', function(){

                    //alert(value[1]);

                    show_contents_of_market(value[1], detail_result);


                  });

                  var listener2 = google.maps.event.addListener(markers[results], 'mouseout', function(){

                    //alert(value[1]);

                    back_to_origianl(value[1]);


                  });


                }

          });


        }     
       
      });      

    });

    
    
}




//---------------------------------------



function initMap(){

	var mapDiv = document.getElementById('map');	//save reference to the div element where the map will be displayed

	
	//create the Map object provided by Google Maps API
	map = new google.maps.Map(
		mapDiv, 			
		{ center: {lat: 40.4237, lng: -86.9212}, zoom: 12});


  getResults(47906);

}




