/*jslint devel: true */
/*jslint white: true */
/*jslint JSON: true */
/*global $ */
/*global document */
/*global google */
/*global $ */
/*global JSON: true */
/*global getDistanceInMeters,addHouseMark,map,appendClime */


function initClime(){
    var data={};
    var timef=new Date();
    var timei=new Date();
    timei.setDate(timei.getDate() - 5);
    $.ajax({ url:'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&sortfield=date&sortorder=desc&units=metric&locationid=ZIP:28801&startdate='+timei.toISOString().substr(0,10)+'&enddate='+timef.toISOString().substr(0,10), 
            dataType: "Json",
            data: data,
            type: 'GET',
            headers:{ 
                token:'kBLAhdHltOntgaqLMbGoVeNkyLVVhZvK',
                     
                    
                    },
            success: function(data) {
                appendClime(data.results[0].value);
                    } 
           
           });
    
}
var crimecounter=0;
var testvariable=[];
function selHouse(i,price){
    var data = {};
    $.ajax({
        url: 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fr0ox2to23_6v82r&address='+encodeURIComponent(i.address)+'&citystatezip=Chicago%2BIL',
        data: data,
        type: 'GET',
        dataType: 'XML',
        success: function(data) {
            if (data.getElementsByTagName('code')[0].childNodes[0].textContent=='7'){
                alert('Zillow call limit exceeded, try tomorrow');
                
            }
            if (data.getElementsByTagName('code')[0].childNodes[0].textContent=='0'){
              /*  console.log('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fr0ox2to23_6v82r&address='+encodeURIComponent(i.address)+'&citystatezip=Chicago%2BIL');*/
                if (data.getElementsByTagName('valueChange')[0].childNodes[0].textContent<=price){
                    var lat=parseFloat(data.getElementsByTagName('latitude')[0].childNodes[0].textContent);
                    var lng=parseFloat(data.getElementsByTagName('longitude')[0].childNodes[0].textContent); 
                    crimecounter+= countCrimes([lat,lng]);  rentaldata.push([initParks([lat,lng]),initPoliceStations([lat,lng]),initBikes([lat,lng]),initcondoms([lat,lng]),i,data.getElementsByTagName('valueChange')[0].childNodes[0].textContent,countCrimes([lat,lng])]);                    addHouseMark([initParks([lat,lng]),initPoliceStations([lat,lng]),initBikes([lat,lng]),initcondoms([lat,lng]),i,data.getElementsByTagName('valueChange')[0].childNodes[0].textContent],1);
                    testvariable=[lat,lng];
                    rentaldata.sort(function(a, b){
                        var aa=0;
                        var bb=0;
                        for(var ii =0;ii<4;ii++){
                        if (a[ii].length>0)
                            aa++;
                        if (b[ii].length>0)
                            bb++;
                        }
                        
                        return bb-aa;
                    });
                    $('#see').removeClass('hidden');
                    }
            }else{
            }
        }
    });   
}

var rentaldata =[];


function initHouse(d,value){
    
    map.setCenter({ lat: 41.790172, lng: -87.599170});
    var counter=0;
    rentaldata=[]; // this in order to make more than one query without reloading the page =D
    var data = {};
    $.ajax({
        url: 'https://data.cityofchicago.org/resource/uahe-iimk.json',
        data: data,
        dataType: 'json',
        success: function(data) {
            for(var i=10;i< data.length ; i++){
                if(getDistanceInMeters(41.790172,-87.599170,data[i].latitude,data[i].longitude)<d){
                    selHouse(data[i],value);
                    }
                
            }
            
        }

    });
}

var CrimesData= [];
function initCrimes(){
    var ad=new Date();  
    ad.setMonth(ad.getMonth() - 1);
    var filters= '$where Date < '+ad.toISOString();
    var data = {};
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?$order=date DESC&$select=longitude, latitude",
        type: "GET",
        data: {
            "$limit" : 2000,
            "$$app_token" : "req5uvuthio9mWQpbEf4DNkMc"
        }
    }).done(function(data) {
        for(var i in data){
            
            CrimesData.push([data[i].latitude,data[i].longitude]);
            
        }
    });
}

function countCrimes(coor){
    var ans=0;
    for (var i in CrimesData){
        if(getDistanceInMeters(parseFloat(CrimesData[i][0]),parseFloat(CrimesData[i][1]),coor[0],coor[1])<1){
            ans++;
        }
        
    }
    return ans;
}

function initPoliceStations(coor){
    var d=0;
    if ($('#policeDistance').is(":checked")){
        d=$('#input4').val();
    }
    var dataPoliceStation =[];
    var data = {};
    $.ajax({
        url: 'https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json',
        data: data,
        dataType: 'json',
        success: function(data) {
            for(var i=0;i<23;i++){
                if(getDistanceInMeters(parseFloat(data.data[i][22][1]),parseFloat(data.data[i][22][2]),coor[0],coor[1])<d)
                dataPoliceStation.push([parseFloat(data.data[i][22][1]),parseFloat(data.data[i][22][2]), data.data[i][15][0]], data.data[i][10]); //lng lat, tel, address
            }
        }
    });    
    return dataPoliceStation;
}
function initParks(coor){
    var d=0;
    if ($('#parkDistance').is(":checked")){
        d=$('#input3').val();
    }
    var dataParcks =[];
    var data = {};
    $.ajax({
        url: 'https://data.cityofchicago.org/api/views/eix4-gf83/rows.json',
        data: data,
        dataType: 'json',
        success: function(data) {
            for(var i in data.data){
                if(getDistanceInMeters(parseFloat(data.data[i][15]),parseFloat(data.data[i][14]),coor[0],coor[1])<d)
                dataParcks.push([parseFloat(data.data[i][15]),parseFloat(data.data[i][14]),data.data[i][12]]);
            }

        }
    });    
    return dataParcks;
}






function initcondoms(coor){
    var d=0;
    if ($('#CondomDistance').is(":checked")){
        d=$('#input6').val();
    }
    var dataCondoms=[];
    var data = {};
    $.ajax({
        url: 'https://data.cityofchicago.org/api/views/azpf-uc4s/rows.json',
        data: data,
        dataType: 'json',
        success: function(data) {
            for(var i in data.data){
                if(getDistanceInMeters(parseFloat(data.data[i][14][1]),parseFloat(data.data[i][14][2]),coor[0],coor[1])<d)
                dataCondoms.push([parseFloat(data.data[i][14][1]),parseFloat(data.data[i][14][2]),data.data[i][9]]);

            }
            
        }
    });
    return dataCondoms;
}

function initBikes(coor){
    var d=0;
    
    if ($(' #BicycleDistance').is(":checked")){
        d=$('#input5').val();
    }
    
    
    var dataBikes=[];
    var data = {};
    $.ajax({
        url: 'https://data.cityofchicago.org/api/views/bbyy-e7gq/rows.json',
        data: data,
        dataType: 'json',
        success: function(data) {    
            for(var i in data.data){
                if(getDistanceInMeters(parseFloat(data.data[i][14]),parseFloat(data.data[i][15]),coor[0],coor[1])<d)
                dataBikes.push([parseFloat(data.data[i][14]),parseFloat(data.data[i][15]),data.data[i][9]]);
            }

        }
    });
    return dataBikes;
}

function getDistanceInMeters(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}


function deg2rad(deg) {
    return deg * (Math.PI/180);
}