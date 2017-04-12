
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*

/* Accesibility of the Map */

var MainMap = (function(){
	// private attributes
	var MAP_CENTER;
	var DIR_ICONS = "Resources/Icons/";
	var MAP;
	var ZOOM;



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
		}
	}
})();



var OrderData = (function(){// Get the order and the access for the sorter Array of indexes about Houses.

	var housesByCommunity = [];// Order the houses by community number, (latter will be used with Crime Dataset)
	var housesByDist = [];
	var pointerCurrentOrder = [];//Select the current way of sortering that the array has
	var bufferInfo = [];// the info that will be printed on the page

	return {
		gethousesByCommunity : function(){
			return housesByCommunity;
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
		getPointerCurrentOrder : function(){
			return pointerCurrentOrder;
		},
		getBufferInfo : function(){
			return bufferInfo;
		},
		addBufferInfo : function(index,value){
			bufferInfo[index] = value;
		},
		setBufferInfo(input){
			bufferInfo = input;
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
				};// objeto
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

		updatePointerHouses : function(index){

				pointerCurrentOrder = DataSet.getDataSet(index).getHousesOrder();

		}
	}
})();

/* INTERFACES */
var interfaceAddressReturn = new Interface('interfaceAddressReturn',['getInfoJson','getAllInfo']);
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
		setCurrentDataSet(input){
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
				crossDomain : true,
				async:false,// revisar detenidamente para quitar esta propiedad
				
				success:function(result){
					
					outAddress = callBack(result);
				}
			});
		
			return outAddress;
		},
		createCORSRequest : function(method,url){
			var xhr = new XMLHttpRequest();
		    if ("withCredentials" in xhr){
		        // XHR has 'withCredentials' property only if it supports CORS
		        xhr.open(method, url, true);
		    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
		        xhr = new XDomainRequest();
		        xhr.open(method, url);
		    } else {
		        xhr = null;
		    }
		    return xhr;
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
			this.typeCall = this.methods.getTypeCall();
			
			//this.value = this.methods.getValue();
			this.housesOrder = [];
			this.myInfo = [];
			this.ajaxData = this.methods.getAjaxData(this);
			this.ajaxHeaders = this.methods.getAjaxHeaders(this);
			
			this.addRecords = function(){

				var myself = this;

				$.ajax({
					dataType : this.typeCall,
					url : this.jsonData.address,
					data : this.ajaxData,
					headers:this.ajaxHeaders,
					
					//crossDomain: true,
					success:function(result){
						
						myself.methods.getAllInfo(result,myself);

					},
					error : function(xhr,status,error){
						alert("<error> "+ status + " " + error);
					}
					
				});
			}

			this.getRecord = function(){
				var myself = this;
				$.ajax({
					dataType : this.typeCall,
					url : this.jsonData.address,
					data : this.ajaxData,
					headers:this.ajaxHeaders,
					async:false,
					
					//crossDomain: true,
					success:function(result){
						
						//myself.methods.getAllInfo(result,myself);
					
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
			this.addSortHouse = function(indexo,orderDataFunction){

				var aux = {
					value:this.methods.getValue(this),
					index:indexo
				};

					
				var temp = orderDataFunction(this.housesOrder,aux);
				
				this.housesOrder = temp;
			
				

			}
		}
	}
})();


/* INTERFACES */
var interfaceAddressReturn = new Interface('interfaceAddressReturn',['getInfoJson','getAllInfo','getValue','getAjaxData','getAllInfo','getOneRecordInfo']);
// the Atributes that all the datasets must implement, it gives flexibility because the code works on abstract implementations



/* Implementation of the interface  */
// The dataSet's objects recieve Xml and json files, the addresses of the datasets are in a Json file too.  



/// Police DataSet ****************************************

var prop_policeDataSet = {


	actions : {
		getIconAddress : function(){
			return DataSet.getAddressIcons() + 'police.png';
		},
		getTypeCall : function(){
			return "xml";
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

				var objOut = OrderData.getBufferInfo();// objeto
		}
	}
};



var prop_houseOfficialDataSet = {
	

	actions : {
		getIconAddress : function(){
			return DataSet.getAddressIcons() + 'apartment.png';
		},
		getTypeCall : function(){
			return "xml";
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

					ite = parseInt(OrderData.getPointerCurrentOrder()[i].index);
					console.log(OrderData);
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


var prop_climaDataSet = {
	

	actions : {
		getIconAddress : function(){
			
		},
		getTypeCall : function(){
			return "json";
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
		getTypeCall : function(){
			return "xml";
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
						

						for(var i=0;i<max;i++){
							pos =
							{
								lat:parseFloat(result.getElementsByTagName('latitude')[i].firstChild.nodeValue),
								lng:parseFloat(result.getElementsByTagName('longitude')[i].firstChild.nodeValue)
							}
							
				
						}
		}
	}
};



// Main function and view conections  *****************************************************************************************

var CreatorVar = (function(){

	var policeRef;
	var houseRef;

	return{
		getPoliceRef : function(){
			return policeRef;
		},
		setPoliceRef : function(index){
			policeRef = index;
		},
		getHouseRef : function(){
			return houseRef;
		},
		setHouseRef : function(index){
			houseRef = index;
		}
	}
})();


function MainInit (){



	CreatorVar.setHouseRef(DataSet.addCurrentDataSet(new DataSet.xmlDataSet(prop_houseOfficialDataSet)));
	DataSet.getDataSet(CreatorVar.getHouseRef()).addRecords();

	CreatorVar.setPoliceRef(DataSet.addCurrentDataSet(new DataSet.xmlDataSet(prop_policeDataSet)));
	DataSet.getDataSet(CreatorVar.getPoliceRef()).addRecords();


var WindowDrawer  = (function(){

	var viewsSelection = [];
	var orderSelection = -1;

	return{
		visibilityDataSet: function(obj,index){
			if(obj.checked){
				DataSet.getDataSet(index).toggleVisibilityMarker(true);

			}else{
				DataSet.getDataSet(index).toggleVisibilityMarker(false);
			}

		},

		chargeEvents : function(){

			var houseCheck = document.getElementById("apt-selec");
			var policeCheck = document.getElementById("pol-selec");

			WindowDrawer.visibilityDataSet(houseCheck,CreatorVar.getHouseRef());

			WindowDrawer.visibilityDataSet(policeCheck,CreatorVar.getPoliceRef());


			houseCheck.addEventListener("change",function(){
				
				if(this.checked){

					DataSet.getDataSet(CreatorVar.getHouseRef()).toggleVisibilityMarker(true);
				}else{
					DataSet.getDataSet(CreatorVar.getHouseRef()).toggleVisibilityMarker(false);
				}
			});

			policeCheck.addEventListener("change",function(){
				
				if(this.checked){
					DataSet.getDataSet(CreatorVar.getPoliceRef()).toggleVisibilityMarker(true);
				}else{
					DataSet.getDataSet(CreatorVar.getPoliceRef()).toggleVisibilityMarker(false);

				}
			});
		},

		loadSortedHouses : function(){
			// The function wants to load on le right side of the page
			// the closest Aptos to the University
				var heading = $("#listHousesContainer .media-heading");
				var text = $("#listHousesContainer p");
				var image = $("#listHousesContainer img");


				var size = heading.length;	

					OrderData.setBufferInfoSize(size);
					OrderData.updatePointerHouses(CreatorVar.getHouseRef());
					DataSet.getDataSet(CreatorVar.getHouseRef()).getRecord();
			

				var message = OrderData.getBufferInfo();

				

				for(var i=0;i<size;i++){
					heading[i].innerHTML = message[i].name;
					text[i].innerHTML = message[i].address;
					image[i].src = "Resources/Icons/filledHouse.jpg";
				}

				
		}
	}
})();


	WindowDrawer.chargeEvents();


$(document).one("ajaxComplete",function(){

var radio = document.getElementById("unv_rad");

radio.addEventListener("change",function(){
				
				if(this.checked){
					WindowDrawer.loadSortedHouses();
				}
			});
if(radio.checked){
	WindowDrawer.loadSortedHouses();
}


	WindowDrawer.chargeEvents();

});


	

}

