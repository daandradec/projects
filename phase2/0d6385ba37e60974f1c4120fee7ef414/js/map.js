
var elevator;

var numberOfMarkets;
var washedData = [];
var washedDataDetail = [];
var map;


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

      for (var i = 0; i < results.length; i++) {

      	var dataLine = [];
      	var result = results[i];

      	for(var key in result){

      		dataLine.push(result[key]);

      	}

      	washedData.push(dataLine);        

      }     	
   	}   


   	numberOfMarkets = results.length;
    

    // Shows the list of Markets
    for(var i=0; i<washedData.length; i++){

      var node = document.createElement("li");
      var textnode = document.createTextNode(washedData[i][1]);

      node.appendChild(textnode);

      document.getElementById("Marketlists").appendChild(node);      

    }

    
    $.each(washedData, function(key, value){

      //key : 1 , value : id, market name
      //alert(key +" : "+value);
      
      $.ajax({

        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + value[0],
        dataType: 'jsonp',
        async : false,

        success: function(detailresults){

          var result = detailresults['marketdetails'];
          var dataLine = [];

          for(var key in result){
            dataLine.push(result[key]);
          }

          washedDataDetail.push(dataLine);
          
          // End getting the detail data
          if(washedDataDetail.length == washedData.length){

            /*
              washedDataDetail[i][0] = address
              washedDataDetail[i][1] = googlelink
              washedDataDetail[i][2] = products
              washedDataDetail[i][3] = schedule
            */

            var geocoder = new google.maps.Geocoder();

            for(var i=0; i<washedDataDetail.length; i++){

              geocoder.geocode({'address':washedDataDetail[i][0]}, function(results,status){

                if(status == google.maps.GeocoderStatus.OK){

                  var marker = new google.maps.Marker({

                    map: map,
                    position : results[0].geometry.location,
                    //title : washedData[i][1]

                  })


                }

              });

            }
            
          }

        }     
       
      });      

    });

    
    
}





function initMap(){

	var mapDiv = document.getElementById('map');	//save reference to the div element where the map will be displayed

	
	//create the Map object provided by Google Maps API
	map = new google.maps.Map(
		mapDiv, 			
		{ center: {lat: 40.4237, lng: -86.9212}, zoom: 12});


  getResults(47906);
  

}

