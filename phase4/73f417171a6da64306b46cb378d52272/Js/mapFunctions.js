
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */


var Interface = function (objectName, methods) {
	// Check that the right amount of arguments are provided
	if (arguments.length != 2) {
		throw new Error ("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
	}
 
	// Create the public properties
	this.name = objectName;
	this.methods = [];
 
	// Loop through provided arguments and add them to the 'methods' array
	for (var i = 0, len = methods.length; i < len; i++) {
		// Check the method name provided is written as a String
		if (typeof methods[i] !== 'string') {
			throw new Error ("Interface constructor expects method names to be " + "passed in as a string.");
		}

		// If all is as required then add the provided method name to the method array
		this.methods.push(methods[i]);
	}
};
 
/*
 * Adds a static method to the 'Interface' constructor
 * @param object | Object Literal | an object literal containing methods that should be implemented
 */
Interface.ensureImplements = function (object) {
	// Check that the right amount of arguments are provided
	if (arguments.length < 2) {
		throw new Error ("Interface.ensureImplements was called with " + arguments.length + "arguments, but expected at least 2.");
	}
 
	// Loop through provided arguments (notice the loop starts at the second argument)
	// We start with the second argument on purpose so we miss the data object (whose methods we are checking exist)
	for (var i = 1, len = arguments.length; i < len; i++) {
		// Check the object provided as an argument is an instance of the 'Interface' class
		var interface = arguments[i];
		if (interface.constructor !== Interface) {
			throw new Error ("Interface.ensureImplements expects the second argument to be an instance of the 'Interface' constructor.");
		}
 
		// Otherwise if the provided argument IS an instance of the Interface class then
		// loop through provided arguments (object) and check they implement the required methods
		for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {

			var method = interface.methods[j];
 
			// Check method name exists and that it is a function (e.g. test[getTheDate]) 

			// if false is returned from either check then throw an error
			if (!object[method] || typeof object[method] !== 'function') {
				throw new Error ("This Class does not implement the '" + interface.name + "' interface correctly. The method '" + method + "' was not found.");
			}
		}
	}
};


var HOUSES_SHOWED = 5;


/* Accesibility of the Map */

var MainMap = (function(){
	// private attributes
	var MAP_CENTER;
	var DIR_ICONS = "Resources/Icons/";
	var MAP;
	var ZOOM;
	var DRAW = "";

	return {// public methods
		wrapperInit : function(){// creation of the map
			MainMap.initMap(41.8708,-87.6505,12,'mainMap');
			MainInit();
		},
		initMap : function(lat,lon,zoom,container){
			MAP_CENTER = new google.maps.LatLng(lat,lon);
			ZOOM = zoom;
			MAP = new google.maps.Map(document.getElementById(container),{
				center: MAP_CENTER,
				zoom:ZOOM
			});
		},
		getMap : function(){
			return MAP;
		},
		getMap_center : function(){
			return MAP_CENTER;
		},
		setMap_center : function(input){
			MAP_CENTER = input;
		},
		calcDistance : function(p1,p2){
			var output = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
			//var output = output / 1000;
			return output;
		},
		// Markers Propierties
		addMarker : function(pos,iconAddress){
			var marker = new google.maps.Marker({
				position : pos,
				map : MainMap.getMap(),
				icon:iconAddress,
				visible:false
			});
			return marker;
		},

		toggleVisibleMarker : function(arrayIn,bool){

			var max = arrayIn.length;

			for(var i=0;i<max;i++){
				arrayIn[i].marker.setVisible(bool);
			}
		},

		coordinatesRentRent : function(input){
			var km_one = parseFloat(0.0089831);
			var kms = parseFloat(input);
			var km_search = parseFloat(km_one * kms);

			
			var xmin = MainMap.getMap_center().lng() - km_search;
			var xmax = MainMap.getMap_center().lng() + km_search;
			var ymin = MainMap.getMap_center().lat() - km_search;
			var ymax = MainMap.getMap_center().lat() + km_search;
	
			return{
				'xmin': xmin,
				'xmax': xmax,
				'ymin': ymin,
				'ymax': ymax	
			}
		},

		drawOverMap : function(size){

			if(DRAW != ""){
				DRAW.setMap(null);
				DRAW = null;
			}
	
        DRAW = new google.maps.Circle({
            strokeColor: '#0066ff',
            strokeOpacity: 0.3,
            strokeWeight: 1,
            fillColor: '#3399ff',
            fillOpacity: 0.2,
           // map: MainMap.getMap(),
            center: MainMap.getMap_center(),
            radius: size*1000
          });


			DRAW.setMap(MainMap.getMap());
	
		},

		showCurrentMarkers : function(size){

				var max = OrderData.getCurrentMarkers().length;
				var obj = OrderData.getCurrentMarkers();

					

				for(var i=0;i<max;i++){
					
					if(obj[i].distance <= size){
						obj[i].marker.setVisible(true);
						obj[i].marker.setIcon("../Resources/Icons/apartment.png");
						//obj[i].marker.setIcon("../Resources/Icons/apartment.png");
						obj[i].marker.setZIndex(0);
					}else{
							obj[i].marker.setVisible(false);
					}
				}
		}
	}
})();



var OrderData = (function(){// Get the order and the access for the sorter Array of indexes about Houses.

	var housesByCommunity = [];// Order the houses by community number, (latter will be used with Crime Dataset)

	var currentHouses = [];
	var currentMarkers = [];//Select the current way of sortering that the array has

	var crimeStatsByCommunity = [];
	var healthStatsByCommunity = [];
	var economicsStatsByCommunity = [];

	var communityNames = [];
	
	var sortCommunityHealth = [];
	var sortcommunityEconomics = [];
	var sortCommunityCrime = [];

	var sortHousesHealth = [];
	var sortHousesEconomics = [];
	var sortHousesCrime = [];
	var sortHousesDistance = [];
	var sortHousesPrice = [];


	// the info that will be printed on the page

	return {

		/* Order Of Criteria */
		setCrimeStatsByCommunity : function(index,value){
			crimeStatsByCommunity[index] = value;
		},
		setHealthStatsByCommunity : function(index,value){
			healthStatsByCommunity[index] = value;
		},
		setEconomicsStatsByCommunity : function(index,value){
			economicsStatsByCommunity[index] = value;
		},
		setCommunityNames : function(index,value){
			communityNames[index] = value;
		},


		getCrimeStatsByCommunity : function(){
			return crimeStatsByCommunity;
		},
		getHealthStatsByCommunity : function(){
			return healthStatsByCommunity;
		},
		getEconomicsStatsByCommunity : function(){
			return economicsStatsByCommunity;
		},
		getCommunityNames : function(){
			return communityNames;
		},
		

		/* ******************************* */

		/*   Community indexes of order */
		getCommunitySize : function(){
			return communityNames.length;
		},

		setSortCommunityHealth : function(index,value){
			sortCommunityHealth[index] = value;
		},
		setSortCommunityEconomics: function(index,value){
			sortcommunityEconomics[index] = value;
		},
		setSortCommunityCrime : function(index,value){
			sortCommunityCrime[index] = value;
		},


		getSortCommunityHealth : function(){
			return sortCommunityHealth;
		},
		getSortCommunityEconomics: function(){
			return sortcommunityEconomics;
		},
		getSortCommunityCrime : function(){
			return sortCommunityCrime;
		},


		/* ******************************* */
		
		/*  House index of Order */
		setSortHousesHealth : function(index,value){
			sortHousesHealth[index] = value;
		},
		setSortHousesEconomics: function(index,value){
			sortHousesEconomics[index] = value;
		},
		setSortHousesCrime : function(index,value){
			sortHousesCrime[index] = value;
		},
		setSortHousesDistance: function(index,value){
			sortHousesDistance[index] = value;
		},
		setSortHousesPrice : function(index,value){
			sortHousesPrice[index] = value;
		},


		getSortHousesHealth : function(){
			return sortHousesHealth;
		},
		getSortHousesEconomics: function(){
			return sortHousesEconomics;
		},
		getSortHousesCrime : function(){
			return sortHousesCrime;
		},

		getSortHousesDistance: function(){
			return sortHousesDistance;
		},
		getSortHousesPrice : function(){
			return sortHousesPrice;
		},


		/* ******************************* */

		getHousesByCommunity : function(){
			return housesByCommunity;
		},
		setHousesByCommunity : function(input){
			 housesByCommunity = input;
		},
		gethousesByDist : function(){
			return housesByDist;
		},

		addHouseByCommunity : function(index,value){
			if(housesByCommunity[index]== null){
				housesByCommunity[index] = [];
			}

			housesByCommunity[index].push(value);
		},

		getCurrentHouses : function(){
			return currentHouses;
		},
		setCurrentHouses : function(input){
			 currentHouses = input;
		},
		getCurrentMarkers : function(){
			return currentMarkers;
		},
		setCurrentMarkers : function(input){
			currentMarkers = input;
		},
		
		sortByCrime : function(){

			var max = OrderData.getCommunitySize();
			
			var temp;
			var current;
			var min;
			var auxMin;
			var counter = 0;

			for(var i=0;i<max;i++){
				temp = OrderData.getSortCommunityCrime()[i].value;
				min = i;
				for(var j=i+1;j<max;j++){
					current = OrderData.getSortCommunityCrime()[j].value;
					if(current<temp){
							temp = current;
							min = j;
					}
				}
				auxMin = OrderData.getSortCommunityCrime(min);
				OrderData.setSortCommunityCrime(min,OrderData.getSortCommunityCrime()[i]);
				OrderData.setSortCommunityCrime(i,auxMin);
				
			}

		},

		sortByHealth : function(){
			
			var max = OrderData.getCommunitySize();
			
			var temp;
			var current;
			var min;
			var auxMin;
			var counter = 0;

			for(var i=0;i<max;i++){
				temp = OrderData.getSortCommunityHealth()[i].value;
				min = i;
				for(var j=i+1;j<max;j++){
					current = OrderData.getSortCommunityHealth()[j].value;
					if(current<temp){
							temp = current;
							min = j;
					}
				}
				auxMin = OrderData.getSortCommunityHealth(min);
				OrderData.setSortCommunityHealth(min,OrderData.getSortCommunityHealth()[i]);
				OrderData.setSortCommunityHealth(i,auxMin);

				//console.log(OrderData.getSortCommunityHealth()[i].value + " : La Salud |" + counter++);
			}
			alert(counter + " el contador " + OrderData.getSortCommunityHealth()[76].value);

		},

		sortByEconomics : function(){
			
			var max = OrderData.getCommunitySize();
			
			var temp;
			var current;
			var min;
			var auxMin;
			var counter = 0;

			for(var i=0;i<max;i++){
				temp = OrderData.getSortCommunityEconomics()[i].value;
				min = i;
				for(var j=i+1;j<max;j++){
					current = OrderData.getSortCommunityEconomics()[j].value;
					if(current<temp){
							temp = current;
							min = j;
					}
				}
				auxMin = OrderData.getSortCommunityEconomics(min);
				OrderData.setSortCommunityEconomics(min,OrderData.getSortCommunityEconomics()[i]);
				OrderData.setSortCommunityEconomics(i,auxMin);

			
			}
			alert(counter + " el contador " + OrderData.getSortCommunityEconomics()[76].value);

		},

		sortHousesByCommunity : function(){
			if(sessionStorage.length !=0){

				var houses = JSON.parse(sessionStorage.array);
				var max = houses.length;
				var names;
				var auxOrder;
				var index;

				for(var i=0;i<max;i++){
					
					auxOrder = OrderData.getHousesByCommunity();
					names = OrderData.getCommunityNames();

				

					index = names.indexOf(houses[i].com_name);
					
					if(index != -1){
						if(auxOrder[index]=="undefined"){
							auxOrder[index] = [];
						}

						auxOrder[index].push({
							index:i
						});
						OrderData.setHousesByCommunity(auxOrder);
						
					}else{
							console.log("<error>: the name of the community was not found |sortHousesBycommunity|");
							//return;
					}
				}
			}else{
					console.log("<error> : the session memory is empty |Sort Houses|");
			}
		},

		sortCurrentHousesByNearness : function(){

			if(sessionStorage.length ==0){
				console.log("<error>: The houses was not loaded to session memory |sortCurrentHousesByNearness|");
				return;
			}

			var houses = JSON.parse(sessionStorage.array);
			
			var max = houses.length;
			
			var temp;
			var current;
			var min;
			var auxMin;
			var counter = 0;

			for(var i=0;i<max;i++){
				OrderData.setSortHousesDistance(i,{
					index:i,
					value:parseFloat(houses[i].distance)
				});
			}
 
			for(var i=0;i<max;i++){
				temp = parseFloat(OrderData.getSortHousesDistance()[i].value);
		
				min = i;
				for(var j=i+1;j<max;j++){

					current = parseFloat(OrderData.getSortHousesDistance()[j].value);

					if(current<temp){
							temp = current;
							min = j;
					}
				}
				auxMin = OrderData.getSortHousesDistance()[min];
				OrderData.setSortHousesDistance(min,OrderData.getSortHousesDistance()[i]);
				OrderData.setSortHousesDistance(i,auxMin);
			}
			
		},

		sortCurrentHousesByPrice : function(){
			if(sessionStorage.length ==0){
				console.log("<error>: The houses was not loaded to session memory |sortCurrentHousesByNearness|");
				return;
			}

			var houses = JSON.parse(sessionStorage.array);
			var max = houses.length;
			
			var temp;
			var current;
			var min;
			var auxMin;
			var counter = 0;

			for(var i=0;i<max;i++){
				OrderData.setSortHousesPrice(i,{
					index:i,
					value:houses[i].rent
				});
				
			}
 
			for(var i=0;i<max;i++){
				temp = OrderData.getSortHousesPrice()[i].value;
				min = i;
				for(var j=i+1;j<max;j++){
					current = OrderData.getSortHousesPrice()[j].value;
					if(current<temp && current != ""){
							temp = current;
							min = j;
					}
				}
				auxMin = OrderData.getSortHousesPrice()[min];
				OrderData.setSortHousesPrice(min,OrderData.getSortHousesPrice()[i]);
				OrderData.setSortHousesPrice(i,auxMin);

				
			}
			
		},

		sortUserSelection : function(election){

				switch(election){

					case "Nearness" :
						OrderData.sortCurrentHousesByNearness();
						OrderData.setCurrentHouses(OrderData.getSortHousesDistance());
							break;
					
					case "Health" :

						if(sessionStorage.length == 0){
							console.log('<error>: The session memory was not loaded |sortUserSelection|');
							return;
						}
						OrderData.sortByHealth();
						OrderData.sortHousesByCommunity();
						var buffer;
						var outputArray = [];
						var max = OrderData.getSortCommunityHealth().length;

						for(var i=0;i<max;i++){
							buffer = OrderData.getHousesByCommunity()[OrderData.getSortCommunityHealth()[i].index];

							if(buffer.length != 0){
								 for(var j=0;j<buffer.length;j++){
								 	outputArray.push(buffer[j]); 
								 }
							}
						}

						OrderData.setCurrentHouses(outputArray);


							break;

					case "Price" :
						OrderData.sortCurrentHousesByPrice();
						OrderData.setCurrentHouses(OrderData.getSortHousesPrice());

							break;
					case "Safety" :
							break;
				}

		},

		getHousesData : function(){
			return JSON.parse(sessionStorage.array);
		},


		setBufferInfoSize : function(size){
			bufferInfo = [];
			aux = {};
			for(var i = 0;i<size;i++){

				aux = {
					name:"",
					address:"",
					community:"",
					phone:"",
					company:"",
					picAddress:"",
					marker:""
				};
				bufferInfo.push(aux);
			}
		},
		addHouseByDist : function(value){
			housesByDist.push(value);
		},
		sortElementAsc : function(inputArray,newValue){


			var size = inputArray.length;
			var newInput = parseFloat(newValue.value);
			var ite ,aux;

			if(size==0){
				inputArray = [];
				inputArray.push(newValue);
			}else{
				
				for(var i = size-1;i>=0;i--){

				ite = parseFloat(inputArray[i].value);

				

					if(newInput>=ite){
						inputArray.splice(i+1,0,newValue);

						break;
					}

					if(i==0){inputArray.splice(i,0,newValue);}
				}
			}
				
				return inputArray;	
		},
		sortObjectsMax : function(){

		},
		
		updatePointerHouses : function(index){

				currentHouses = DataSet.getDataSet(index).getHousesOrder();
		},

		printMapHouses(){
			var arrayHouses = JSON.parse(sessionStorage.array);

			var max = arrayHouses.length;

			var outputArray = [];
		
			for(var i=0;i<max;i++){	
				//if(parseFloat(arrayHouses[i].distance) <= parseFloat(distance)){

					outputArray[i] = {

						marker: MainMap.addMarker(
							new google.maps.LatLng(parseFloat(arrayHouses[i].lat),parseFloat(arrayHouses[i].lng)),
							"../Resources/Icons/apartment.png"),

						distance : arrayHouses[i].distance,
						index : i
					}
					outputArray[i].marker.index = i;
					

					outputArray[i].marker.addListener('click',function(){
							if(this.visible){
								ComponentsAction.showClickDataHouses(this.index);
							this.setIcon("../Resources/Icons/apartmentSelected.png");
							$('#houseDataModal').modal('show');
							}
					});

					outputArray[i].marker.addListener('mouseover',function(){
							if(this.icon=="../Resources/Icons/apartmentSelected.png"){

							}
							this.setIcon("../Resources/Icons/apartmentSelected.png");
							
					});

					outputArray[i].marker.addListener('mouseout',function(){
							
							this.setIcon("../Resources/Icons/apartment.png");
					});


			}
			OrderData.setCurrentMarkers(outputArray);

		}
	}
})();


/* INTERFACES */

// the Atributes that all the datasets must implement, it gives flexibility because the code works on abstract implementations

var DataSet = (function(){
	// private Propierties
	var addressJsonFile = "Resources/datasets.json";

	var addressIcons = "Resources/Icons/";
	var currentDataSets = [];

	return{//public methods
	
		getAddressIcons : function(){
			return addressIcons;
		},
		getCurrentDataSets : function(){
			return currentDataSets;
		},
		getDataSet : function(index){
			return currentDataSets[index];
		},
		addCurrentDataSet : function(object){
			return (currentDataSets.push(object) - 1);
		},
		setCurrentDataSet : function(input){
			if(Array.isArray(input)){
				currentDataSets = input;
			}
		},
		cleanCurrentDataSets : function(){
			currentDataSets = [];
		},
		dropDataSet : function(index){
			currentDataSets.splice(index,1);
		},
		getInfoDataSet : function(callBack){
			
				var outAddress;
				
			$.ajax({
				dataType : 'json',
				url: addressJsonFile,
				//crossDomain : true,
				async:false,// **
				
				success:function(result){
					
					outAddress = callBack(result);
				}
			});
		
			return outAddress;
		},
		createHouses : function(obj){
				DataSet.setHousesInfo([]);
				obj.addRecords();
		},

		xmlDataSet : function (properties){

			Interface.ensureImplements(properties.actions,interfaceAddressReturn);
			this.methods = properties.actions;
			
			this.jsonData = DataSet.getInfoDataSet(this.methods.getInfoJson);


			this.iconAddress = this.methods.getIconAddress();
			this.dataType = this.methods.getDataType();
			this.typeCall = this.methods.getTypeCall();
			
			this.housesOrder = [];
			this.myInfo = [];
			

			this.addRecords = function(){
				this.ajaxData = this.methods.getAjaxData(this);
				this.ajaxHeaders = this.methods.getAjaxHeaders(this);

				var myself = this;

				$.ajax({
					dataType : this.DataType,
					url : this.jsonData.address,
					data : this.ajaxData,
					headers:this.ajaxHeaders,
					
			
					success:function(result,value){
						
						myself.methods.getAllInfo(result,myself);

					},
					error : function(xhr,status,error){
						
						alert("<error> "+ status + " " + error);
					}
					
				});
			}

			this.getRecord = function(){
				var myself = this;
				this.ajaxData = this.methods.getAjaxData(this);
				this.ajaxHeaders = this.methods.getAjaxHeaders(this);

			
				$.ajax({
					dataType : this.dataType,
					type : this.typeCall,
					url : this.jsonData.address,
					data : this.ajaxData,
					headers:this.ajaxHeaders,

				
					success:function(result){
						
						
						myself.methods.getOneRecordInfo(result,myself);
						

					},
					error : function(xhr,status,error){
						alert("<error> "+ status + " " + error);
					}
					
				});
			}

			this.addMyInfo = function(obj){

				this.myInfo.push(obj);
			}

			this.getMyInfo = function(){
			
				return this.myInfo;
			}

			this.getHousesOrder = function(){
				
				return this.housesOrder;
			}

			// delete all the markers from this 
			this.deleteRecords = function(){
				this.array = [];
			}

			this.toggleVisibilityMarker = function(bool){
				MainMap.toggleVisibleMarker(this.myInfo,bool);
			}

			//adds the info from the new marker
			this.sortCommunity = function(){
				return this.methods.orderCommunity();
			}

			this.sortCommunity = function(){
				return this.methods.orderHouses();
			}
		},

		HouseInfoDataSet : {
			workerAddress : "Js/Api/houseInfoWorker.js",
			zillowWorkerAddress : "Js/Api/zillowDataInfoWorker.js",
			dataSetAddress : "",

			getDataAddress : function(result){
				return result.housing.c_realStateUsa.url;
			},
			getWorkerAddress : function(){
				return DataSet.HouseInfoDataSet.workerAddress;
			},
			getZillowWorkerAddress : function(){
				return DataSet.HouseInfoDataSet.zillowWorkerAddress;
			},

			playWorker : function(dataZillow){
				
				 $('#footerButton').append('<i class="fa fa-spinner faa-spin animated faa-slow" aria-hidden="true" style = "font-size:40px"></i>');

				if(sessionStorage.length==0){// if the page is loaded by the first time
					if(typeof(Worker)!== "undefined"){
						

						var myWorker = new Worker(DataSet.HouseInfoDataSet.getWorkerAddress());
				
						var support;
						

						if (window.XMLHttpRequest) {
    							support = "xmlhttp";
  							} else {
    						// code for older browsers
    							support = "active";
  								}

  						var address = DataSet.getInfoDataSet(DataSet.HouseInfoDataSet.getDataAddress);
  						myWorker.postMessage({
  							sup : support,
  							addr : address
  						});

  						myWorker.onmessage = function(event){

  					
  				
  							if(dataZillow != null){
  				
  								var rcv = DataSet.getInfoDataSet(dataZillow.methods.getInfoJson);
  								
  								var message = {
  									"sup" : support,
  									"addr" : rcv.linkAddress,
  									"houses" : event.data,
  									"id" : rcv.id,
  									"city" : dataZillow.methods.getCityCode(),
  								}
  									var zillowWorker = new Worker(DataSet.HouseInfoDataSet.getZillowWorkerAddress());

  									zillowWorker.postMessage(message);

  									zillowWorker.onmessage = function(dataResponse){
  									

  										var arrayResponse = dataResponse.data;
  										var max = arrayResponse.length;
  										var result;
  										var data = [];
  										var parser = new DOMParser();
  										var size;
  										var buffer;

  										for(var i=0;i<max;i++){
  											

  												result = parser.parseFromString(arrayResponse[i].xmlData,"text/xml");
  												
												if(result.getElementsByTagName('code')[0].firstChild.nodeValue =='0'){ // The result address exists in the dataBase
													data.push({
														address:arrayResponse[i].address,
														lat:"",
														lng:"",
														rent:"",
														com_name:"",
														distance:""
													});
													size = data.length-1;

													var lat = result.getElementsByTagName('latitude')[0].firstChild.nodeValue;
													var lng = result.getElementsByTagName('longitude')[0].firstChild.nodeValue;

													data[size].lat = lat;
													data[size].lng = lng;


													if(parseInt(result.getElementsByTagName('rentzestimate').length) > 0){
														data[size].rent = result.getElementsByTagName('rentzestimate')[0].firstChild.innerHTML;
													}else{
															data[size].rent = "";
													}

													if(parseInt(result.getElementsByTagName('localRealEstate').length) > 0){
														data[size].com_name = result.getElementsByTagName('localRealEstate')[0].firstChild.getAttribute('name');
													}else{
															data[size].com_name = "";
													}
													/* add distance to university info */
													data[size].distance = MainMap.calcDistance(MainMap.getMap_center(),new google.maps.LatLng(lat,lng));
													
												}	
  										}
  										sessionStorage.setItem("array",JSON.stringify(data));
  										
  										//OrderData.printMapHouses(2);
  										OrderData.printMapHouses();
  										$('#footerButton').empty();
       									$('#footerButton').append('<button class = "btn btn-default btn-block" onclick = "ComponentsAction.updateNavigator()"> Get Houses</button>');
  										zillowWorker.terminate();
  									}

  							}else{
  								sessionStorage.clear();		
  							}
  							
  							myWorker.terminate();
  						}
					}else{
						console.log("This browser does not support Web Workers ...");
					}
				}else{// if the page was loaded before
						
						OrderData.printMapHouses();
						$('#footerButton').empty();
       					$('#footerButton').append('<button class = "btn btn-default btn-block" onclick = "ComponentsAction.updateNavigator()"> Get Houses</button>');
						//OrderData.printMapHouses(10);
						//sessionStorage.clear();
				}
			}
		}
	}
})();


	/* ************************************************************************************************************************************	




/* INTERFACES */

//var interface_externalRecieve = new Interface('interface_externalRecieve',['']);
var interfaceAddressReturn = new Interface('interfaceAddressReturn',['getInfoJson','getAllInfo','getValue','getAjaxData','getAllInfo','getOneRecordInfo','getTypeCall']);

// the Atributes that all the datasets must implement, it gives flexibility because the code works on abstract implementations

/* Implementation of the interface  */
// The dataSet's objects recieve Xml and json files, the addresses of the datasets are in a Json file too.  


/// Police DataSet ****************************************

var prop_policeDataSet = {


	actions : {
		getIconAddress : function(){
			return DataSet.getAddressIcons() + 'police.png';
		},
		getDataType : function(){
			return "xml";
		},
		getTypeCall : function(){
			return "get";
		},
		getInfoJson : function(result){//revisar ya que necesita retornar direccion del dataset
				 
			return  {
				address : result.security.x_policeStations.url
			}; 
		
		},
		getValue : function(obj){

			
		},
		getAjaxData : function(){
			return {

			}
		},
		getAjaxHeaders : function(){
			return {
				
			}
		},
		getAllInfo : function(result,obj){	
				
			var max = result.getElementsByTagName('latitude').length;
					var pos;
					var icon;
						for(var i=0;i<max;i++){
							pos =
							{
								lat:parseFloat(result.getElementsByTagName('latitude')[i].firstChild.nodeValue),
								lng:parseFloat(result.getElementsByTagName('longitude')[i].firstChild.nodeValue)
							}
						

							icon = MainMap.addMarker(pos,this.getIconAddress());
							obj.addMyInfo({
								marker : icon}
								);
						}
		},
		getOneRecordInfo : function(result,obj){

				var objOut = OrderData.getBufferInfo();
		}
	}
};

var prop_libraries = {
	actions : {
		getIconAddress : function(){
			return DataSet.getAddressIcons() + 'library.png';
		},
		getDataType : function(){
			return "xml";
		},
		getTypeCall : function(){
			return "get";
		},
		getInfoJson : function(result){
				 
			return  {
				address : result.places.x_libraries.url
			}; 
		
		},
		getValue : function(obj){

			
		},
		getAjaxData : function(){
			return {

			}
		},
		getAjaxHeaders : function(){
			return {
				
			}
		},
		getAllInfo : function(result,obj){	
				
			var max = result.getElementsByTagName('name_').length;
					var pos;
					var icon;
							
						for(var i=0;i<max;i++){
							pos =
							{

								lat:parseFloat(result.getElementsByTagName('location')[i].getAttribute('latitude')),
								lng:parseFloat(result.getElementsByTagName('location')[i].getAttribute('longitude'))

							}
							
							
							icon = MainMap.addMarker(pos,this.getIconAddress());
							obj.addMyInfo({
								marker : icon}
								);
							
						}
		},
		getOneRecordInfo : function(result,obj){

				var objOut = OrderData.getBufferInfo();
		}
	}
};

var prop_groceryStores = {
	actions : {
		getIconAddress : function(){
			return DataSet.getAddressIcons() + 'grocery.png';
		},
		getDataType : function(){
			return "xml";
		},
		getTypeCall : function(){
			return "get";
		},
		getInfoJson : function(result){
				 
			return  {
				address : result.places.x_groceryStores.url
			}; 
		
		},
		getValue : function(obj){

			
		},
		getAjaxData : function(){
			return {

			}
		},
		getAjaxHeaders : function(){
			return {
				
			}
		},
		getAllInfo : function(result,obj){	
				
			var max = result.getElementsByTagName('company').length;
					var pos;
					var icon;
							
						for(var i=0;i<max;i++){
							pos =
							{

								lat:parseFloat(result.getElementsByTagName('location')[i].getAttribute('latitude')),
								lng:parseFloat(result.getElementsByTagName('location')[i].getAttribute('longitude'))

							}
							
							
							icon = MainMap.addMarker(pos,this.getIconAddress());
							obj.addMyInfo({
								marker : icon}
								);
							
						}
		},
		getOneRecordInfo : function(result,obj){

				var objOut = OrderData.getBufferInfo();
	}
}
};


var prop_houseOfficialDataSet = {
	

	actions : {
		getIconAddress : function(){
			return DataSet.getAddressIcons() + 'apartment.png';
		},
		getDataType : function(){
			return "xml";
		},
		getTypeCall : function(){
			return "get";
		},
		getInfoJson : function(result){/* ** */

			return  {
				address : result.housing.x_chicagoOfficial.url
			}; 
		},
		getValue : function(obj){


			var output = MainMap.calcDistance(
				MainMap.getMap_center(),
				obj.getMyInfo()[obj.getMyInfo().length-1].marker.getPosition()
								);

		
			return parseFloat(output);

		},
		getAjaxData : function(){
			return {

			}
		},
		getAjaxHeaders : function(){
			return {
				
			}
		},
		getAllInfo : function(result,obj,callBack){
			var max = result.getElementsByTagName('latitude').length;
			var pos,icon,community;
					for(var i=0;i<max;i++){

					pos = {
						lat:parseFloat(result.getElementsByTagName('latitude')[i].firstChild.nodeValue),
						lng:parseFloat(result.getElementsByTagName('longitude')[i].firstChild.nodeValue)
						  }
						community = result.getElementsByTagName('community_area_number')[i].firstChild.nodeValue;
						community = parseInt(community);

						  obj.addMyInfo({
						  	marker : MainMap.addMarker(pos,this.getIconAddress())
						  	});

						  obj.addSortHouse(i,OrderData.sortElementAsc);
						
					}	
		},
			getOneRecordInfo : function(result,obj){

				var objOut = OrderData.getBufferInfo();

				var ite;

				var auxObj = {
					name:"",
					address:"",
					community:"",
					phone:"",
					company:"",
					picAddress:"",
					marker:""
				};// objeto

				var max = parseInt(objOut.length);
				
				OrderData.updatePointerHouses(0);
				
				for(var i =0;i<max;i++){

					ite = parseInt(OrderData.getcurrentHouses()[i].index);
					
					auxObj.name = result.getElementsByTagName('property_name')[ite].firstChild.nodeValue;
					auxObj.address = result.getElementsByTagName('address')[ite].firstChild.nodeValue;
					auxObj.community = result.getElementsByTagName('community_area')[ite].firstChild.nodeValue;;
					auxObj.phone =result.getElementsByTagName('phone_number')[ite].firstChild.nodeValue;
					auxObj.company =result.getElementsByTagName('management_company')[ite].firstChild.nodeValue;

					auxObj.picAddress = "Resources/Icons/filledHouse.png";
					auxObj.marker = obj.getMyInfo()[ite].marker;

					OrderData.addBufferInfo(i,auxObj);
					}		
			}
		}
	};


var prop_zillowData = {// needs to uses the proxy call
	
	cityCode : "Chicago%2C+IL",

	actions : {/* inherit methods */

		houseAddress : "",
		houseIndex : "0",

		getIconAddress : function(){
			return DataSet.getAddressIcons() + 'apartment.png';
		},
		getDataType : function(){
			return "xml";
		},
		getTypeCall : function(){
			return "POST";
		},
		getInfoJson : function(result){/* ** */

			return  {
				address : "proxy.php",
				linkAddress: result.housing.x_zillowData.url,
				id : result.housing.x_zillowData.id
			}; 
		},
		getValue : function(obj){

			var output = MainMap.calcDistance(
				MainMap.getMap_center(),
				obj.getMyInfo()[obj.getMyInfo().length-1].marker.getPosition()
								);

			return parseFloat(output);

		},
		getAjaxData : function(obj){

			if(prop_zillowData.actions.getHouseAddress() == ""){
				console.log('The address is missing');
				return;
			}
				
			return {
				'id': obj.jsonData.id,
				'linkAddress' : obj.jsonData.linkAddress,
				'type' : "zillowData",
				'cityCode' : prop_zillowData.actions.getCityCode(),
				'houseAddress' : this.getHouseAddress()
			}
		},
		getAjaxHeaders : function(){
			return {
				
			}
		},
		getAllInfo : function(result,obj,callBack){
			var max = result.getElementsByTagName('latitude').length;
			var pos,icon,community;
					for(var i=0;i<max;i++){

					pos = {
						lat:parseFloat(result.getElementsByTagName('latitude')[i].firstChild.nodeValue),
						lng:parseFloat(result.getElementsByTagName('longitude')[i].firstChild.nodeValue)
						  }
						community = result.getElementsByTagName('community_area_number')[i].firstChild.nodeValue;
						community = parseInt(community);

						  obj.addMyInfo({
						  	marker : MainMap.addMarker(pos,this.getIconAddress())
						  	});

						  obj.addSortHouse(i,OrderData.sortElementAsc);
						
					}	
		},
			getOneRecordInfo : function(result,obj){
				
				var exis = result.getElementsByTagName('code')[0].firstChild.nodeValue;
				
				if(exis =='0'){ // The result address exists in the dataBase
					var data = JSON.parse(sessionStorage.array);


					var lat = result.getElementsByTagName('latitude')[0].firstChild.nodeValue;
					var lng = result.getElementsByTagName('longitude')[0].firstChild.nodeValue;

					data[obj.methods.getHouseIndex()].lat = lat;
					data[obj.methods.getHouseIndex()].lng = lng;


					if(parseInt(result.getElementsByTagName('rentzestimate').length) > 0){
						data[obj.methods.getHouseIndex()].rent = result.getElementsByTagName('rentzestimate')[0].firstChild.innerHTML;
					}else{
							data[obj.methods.getHouseIndex()].rent = "";
					}

					if(parseInt(result.getElementsByTagName('localRealEstate').length) > 0){
						data[obj.methods.getHouseIndex()].com_name = result.getElementsByTagName('localRealEstate')[0].firstChild.getAttribute('name');
					}else{
							data[obj.methods.getHouseIndex()].com_name = "";
					}

					/* add distance to university info */
					data[obj.methods.getHouseIndex()].distance = MainMap.calcDistance(MainMap.getMap_center(),new google.maps.LatLng(lat,lon));
					

					sessionStorage.setItem("array",JSON.stringify(data));

				}else{
					
				}				
			},
			/* proper methods */

			getHouseAddress : function(){
				
				return this.houseAddress;
			},
			setHouseAddress : function(input,index){
				this.houseAddress = input;
				this.houseIndex = index;
			},
			getHouseIndex : function(){
				return  parseInt(this.houseIndex);
			},
			getCityCode : function(){
				return prop_zillowData.cityCode;
			}
		}
	};

var prop_climaDataSet = {

	actions : {
		getIconAddress : function(){
			
		},
		getDataType : function(){
			return "json";
		},
		getTypeCall : function(){
			return "get";
		},
		getInfoJson : function(result){
			
				
			return  {
				address : result.climate.url,
				token :  result.climate.token,
				stationid : result.climate.stationid,
				datasetid : result.climate.datasetid
			} 
		},
		getValue : function(){

			
			return Math.random();
		},
		getAjaxData : function(obj){
			
			return {
				
				stationid : obj.jsonData.stationid,
				datasetid : obj.jsonData.datasetid,
				startdate:"2017-01-12",
				enddate:"2017-01-13",
				units:"metric"

			}
		},
		getAjaxHeaders : function(obj){
			
			return {
				token: obj.jsonData.token
			}

		},

		getAllInfo : function(result){
				

		}
	}
};

var prop_healthStatDataSet = {
	actions : {
		getIconAddress : function(){
			
		},
		getDataType : function(){
			return "xml";
		},
		getTypeCall : function(){
			return "get";
		},
		getInfoJson : function(result){
				
			return  {
				address : result.health.x_healthStatistics.url
			}; 
		
		},
		getValue : function(obj){

		
			return Math.random();
		},
		getAjaxData : function(){
			return {

			}
		},
		getAjaxHeaders : function(){
			return {
				
			}
		},
		getAllInfo : function(result,obj){
			
			var max = result.getElementsByTagName('community_area').length;
					var pos;
					var icon;
					var community;
					var houses = JSON.parse(sessionStorage.array);
						
						for(var i=0;i<max;i++){
							community = result.getElementsByTagName('community_area_name')[i].firstChild.nodeValue;

							OrderData.setCommunityNames(i,community);

						
							OrderData.setHealthStatsByCommunity(i,{
								cancer: result.getElementsByTagName('cancer_all_sites')[i].firstChild.nodeValue,
								diabetes: result.getElementsByTagName('diabetes_related')[i].firstChild.nodeValue,
								cerebrovascular: result.getElementsByTagName('stroke_cerebrovascular_disease')[i].firstChild.nodeValue,
								tuberculosis : result.getElementsByTagName('tuberculosis')[i].firstChild.nodeValue
							
							});

							OrderData.setCrimeStatsByCommunity(i,{
								assault: result.getElementsByTagName('assault_homicide')[i].firstChild.nodeValue,
								dependency: result.getElementsByTagName('dependency')[i].firstChild.nodeValue,
								firearm : result.getElementsByTagName('firearm_related')[i].firstChild.nodeValue

							}); 

							OrderData.setEconomicsStatsByCommunity(i,{
								perCapita : result.getElementsByTagName('per_capita_income')[i].firstChild.nodeValue,
								unemployment: result.getElementsByTagName('unemployment')[i].firstChild.nodeValue,
								poverty: result.getElementsByTagName('below_poverty_level')[i].firstChild.nodeValue
							});

							OrderData.setSortCommunityHealth(i,{
								index:i,
								value: this.valueHealth(OrderData.getHealthStatsByCommunity(i))
							});

							OrderData.setSortCommunityCrime(i,{
								index:i,
								value: this.valueCrime(OrderData.getCrimeStatsByCommunity(i))
							});

							OrderData.setSortCommunityEconomics(i,{
								index:i,
								value: this.valueEconomics(OrderData.getEconomicsStatsByCommunity(i))
							});
							
						}

						

		},
		/* Self Functions */
		valueCrime : function(obj){ 
					return ((parseFloat(obj.assault) + parseFloat(obj.firearm))/2);
		},
		valueHealth : function(obj){
					return ((parseFloat(obj.cancer) + parseFloat(obj.diabetes) + parseFloat(obj.tuberculosis) + parseFloat(obj.cerebrovascular))/4);
		},
		valueEconomics : function(obj){
					return ((parseFloat(obj.unemployment)+parseFloat(obj.poverty))/2);
		},


		/* used when the user select the criteria */
				/* Order By Selection algorithm */
		

		getOneRecordInfo : function(result, obj){

		},
		orderCommunity : function(){

		}
	}
};


// Main function and view conections  *****************************************************************************************
function MainInit(){ // Instanciation of the datasets and events

	// Grafica de visualizacion */
	var policeData = new DataSet.xmlDataSet(prop_policeDataSet);
	var groceriesData = new DataSet.xmlDataSet(prop_groceryStores);
	var librariesData = new DataSet.xmlDataSet(prop_libraries);

	policeData.addRecords();
	groceriesData.addRecords();
	librariesData.addRecords();



	$(document).ajaxComplete(function(){
		ComponentsAction.viewCheckboxIniState('checkPolice',policeData);
		ComponentsAction.viewCheckboxIniState('checkLibrary',librariesData);
		ComponentsAction.viewCheckboxIniState('checkGrocery',groceriesData);	
	});
		

	ComponentsAction.viewCheckboxToggle('checkGrocery',groceriesData);

	ComponentsAction.viewCheckboxToggle('checkPolice',policeData);

	ComponentsAction.viewCheckboxToggle('checkLibrary',librariesData);

	ComponentsAction.radioMapDraw(MainMap);

	var marker = MainMap.addMarker(MainMap.getMap_center(),"../Resources/Icons/default.png");
	marker.setVisible(true);

	var zillow = new DataSet.xmlDataSet(prop_zillowData);
	DataSet.HouseInfoDataSet.playWorker(zillow);



}