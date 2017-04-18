function mapRoute(lat,lng) {
  var start = new google.maps.LatLng(mainMarker.getPosition().lat() ,mainMarker.getPosition().lng());
  var end = new google.maps.LatLng(lat ,lng);
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setMap(map);
        directionsDisplay.setDirections(result);
    } else {
      console.log("couldn't get directions:" + status);
    }
  });
}
function updateMap(data,size,index){
    for(var i = 0;i < size;++i)
        addMarker(data,new google.maps.LatLng(parseFloat(data[i][0]),parseFloat(data[i][1])),index,i);
}
function hideMarkers(index){
    updateMarkers(null,markers[index]);
}
function showMarkers(index){
    updateMarkers(map,markers[index]);
}
function updateMarkers(map,markers){
    for(var i = 0;i < markers.length;++i)
        markers[i].setMap(map);
}
function hideMarker(marker){
    marker.setMap(null);
}
function showMarker(marker){
    marker.setMap(map);
}
function addMarker(data,location,index,indexFor) {
    var information;
    if(data[indexFor][2] !== null)
        information = '<div><p>Address: '+data[indexFor][2]+'</p></div>';
    else
        information = '<div><p>Address: '+data[indexFor][3]+'</p></div>';
    var image_icon = '../img/blue-dot.png';
    switch(index){
        case 0:
            image_icon = '../img/group.png';
            break;
        case 1:
            image_icon = '../img/tennis.png';
            break;
        case 2:
            image_icon = '../img/market.png';
            break;
        case 3:
            image_icon = '../img/food.png';
            break;
        case 4:
            image_icon = '../img/station.png';
            break;
        case 5:
            image_icon = '../img/van.png';
            break;
    }
    var infowindow = new google.maps.InfoWindow({
        content: information,
        position:location
    });
    marker = createMarker(location,image_icon);
    marker.addListener('click',function(){
        mapRoute(this.getPosition().lat(),this.getPosition().lng());
        if(currentInfoWindow === undefined){
            currentInfoWindow = infowindow;
            currentInfoWindow.open(map, this);
        }else{
            currentInfoWindow.close();
            currentInfoWindow = infowindow;
            currentInfoWindow.open(map, this);
        }
    });
    markers[index].push(marker);
}
function createMarker(location,image_icon){
    marker = new google.maps.Marker({
        position: location,
        icon: image_icon,
        title: 'Location',
        map: map
    });
    return marker;
}
function createLocation(lat,lng){
    return new google.maps.LatLng(lat,lng);
}
function addCrimeMarker(location,date,type,address){
    var image_icon = '../img/crime.png';
    var information = '<div><p>Address: '+address+'</p><p>Date: '+date+'</p><p>Type: '+type+'</p></div>';
    var infowindow = new google.maps.InfoWindow({
        content: information,
        position:location
    });
    marker = createMarker(location,image_icon);
    marker.addListener('click',function(){
        if(currentInfoWindow === undefined){
            currentInfoWindow = infowindow;
            currentInfoWindow.open(map, this);
        }else{
            currentInfoWindow.close();
            currentInfoWindow = infowindow;
            currentInfoWindow.open(map, this);
        }
    });
    crimes.push(marker);
}
function addMarkerHouse(location,index,distance){
    var information =  '<div><p>Distance: '+distance+' Meters</p></div>';
    var image_icon = '../img/house.png';
    var infowindow = new google.maps.InfoWindow({
        content: information,
        position:location
    });
    marker = new google.maps.Marker({
        position: location,
        icon: image_icon,
        draggable: true,
        animation: null,//google.maps.Animation.DROP,
        map: map
    });
    marker.addListener('click',function(){
        mapRoute(this.getPosition().lat(),this.getPosition().lng());
    });
    marker.addListener('click', function(){
        if (this.getAnimation() !== null) {
            this.setAnimation(null);
        } else {
            if(currentAnimation === undefined){
                this.setAnimation(google.maps.Animation.BOUNCE);
                currentAnimation = this;
            }else{
                currentAnimation.setAnimation(null);
                this.setAnimation(google.maps.Animation.BOUNCE);
                currentAnimation = this;
            }
        }
        showMarkerData(index);
        if(currentInfoWindow === undefined){
            currentInfoWindow = infowindow;
            currentInfoWindow.open(map, this);
        }else{
            currentInfoWindow.close();
            currentInfoWindow = infowindow;
            currentInfoWindow.open(map, this);
        }
    });
    houses.push(marker);
}
function showMarkerData(index){
    $("#houseInformation").fadeIn("slow");
    console.log(zillowObject.jsonZillow[index]);
    var response = zillowObject.jsonZillow[index].response;
    setImage(response);
    setLink(response);
    setFirstLine(response);
    setSecondLine(response,zillowObject.jsonZestimate[index].response);
    setThridLine(response);
    homeDetails(response);
}
function setImage(response){
    var images = response.images;
    if(images !== undefined){
        var url = images.image.url;
        if(parseInt(images.count) == 1){
            document.getElementById("img").setAttribute('src',url);
            if(idInterval !== undefined)
                clearInterval(idInterval);
        }else{
            imageEvent(url,response);
        }
    }else{
        document.getElementById("img").setAttribute('src','../img/imgNoAvailable.jpg');
        if(idInterval !== undefined)
            clearInterval(idInterval);
    } 
}
function setLink(response){
    var link = response.links;
    if(link !== undefined){
        document.getElementById("link").href = link.homeDetails;
        document.getElementById("link").innerHTML = link.homeDetails;
    }else{
        document.getElementById("link").src = "#";
        document.getElementById("link").innerHTML = "null";
    }
}
function setFirstLine(response){
    var address = response.address;
    var street = address.street;
    var zipCode = address.zipcode;
    var editedFacts = response.editedFacts;
    var useCode = editedFacts.useCode;
    var bedrooms = editedFacts.bedrooms;
    var bathrooms = editedFacts.bathrooms;
    var yearBuilt = editedFacts.yearBuilt;
    var numFloors = editedFacts.numFloors;
    var data = [street,zipCode,useCode,bedrooms,bathrooms,yearBuilt,numFloors];
    document.getElementById("paragraph1").innerHTML = "";
    for(var i = 0;i < 7;++i)
        document.getElementById("paragraph1").innerHTML = document.getElementById("paragraph1").innerHTML +getDataForParagraph1(i) + setElement(data[i])
}
function setSecondLine(response,responseTwo){
    var editedFacts = response.editedFacts;
    var finishedSqFt = editedFacts.finishedSqFt;
    var view = editedFacts.view;
    var heatingSources = editedFacts.heatingSources;
    var heatingSystem = editedFacts.heatingSystem;
    var appliances = editedFacts.appliances;
    var zestimate = responseTwo.zestimate.amount;
    var data = [finishedSqFt,view,heatingSources,heatingSystem,appliances,zestimate];
    document.getElementById("paragraph2").innerHTML = "";
    for(var i = 0;i < 6;++i)
        document.getElementById("paragraph2").innerHTML = document.getElementById("paragraph2").innerHTML +getDataForParagraph2(i) + setElement(data[i]);
}
function setThridLine(response){
    var editedFacts = response.editedFacts;
    var rooms = editedFacts.rooms;
    var floorCovering = editedFacts.floorCovering;
    var parkingType = editedFacts.parkingType;
    var neighborhood = response.neighborhood;
    var schoolDistrict = response.schoolDistrict;
    var elementarySchool = response.elementarySchool;
    var data = [rooms,floorCovering,parkingType,neighborhood,schoolDistrict,elementarySchool];
    document.getElementById("paragraph3").innerHTML = "";
    for(var i = 0;i < 5;++i)
        document.getElementById("paragraph3").innerHTML = document.getElementById("paragraph3").innerHTML +getDataForParagraph3(i) + setElement(data[i])
}
function homeDetails(response){
    var homeDescription = response.homeDescription;
    if(homeDescription !== undefined){
       document.getElementById('homeDescription').innerHTML = "HomeDescription: "+homeDescription; 
    }else{
        document.getElementById('homeDescription').innerHTML = "HomeDescription: Nan";
    }
}
function setElement(object){
    if(object !== undefined){
        return object;
    }else{
        return "Nan";
    }
}
function getDataForParagraph1(index){
    switch(index){
        case 0:
            return "Street: ";
            break;
        case 1:
            return " -- ZipCode: ";
            break;
        case 2:
            return " --  UseCode: ";
            break;
        case 3:
            return " --  Bedrooms: ";
            break;
        case 4:
            return " --  Bathrooms: ";
            break;
        case 5:
            return " --  YearBuilt: ";
            break;
        case 6:
            return " --  numFloor: ";
            break;
    }
}
function getDataForParagraph2(index){
    switch(index){
        case 0:
            return "LotSize in feet: ";
            break;
        case 1:
            return " -- Views: ";
            break;
        case 2:
            return " -- Heating: ";
            break;
        case 3:
            return " -- HeatingSystem: ";
            break;
        case 4:
            return " -- Appliances: ";
            break;
        case 5:
            return " -- Zestimate(price Avg) USD: "
            break;
    }
}
function getDataForParagraph3(index){
    switch(index){
        case 0:
            return "Rooms: ";
            break;
        case 1:
            return " -- FloorCovering: ";
            break;
        case 2:
            return " --  ParkingType: ";
            break;
        case 3:
            return " -- Neighborhood: ";
            break;
        case 4:
            return " -- schoolDistrict: ";
            break;
        case 5:
            return " --  ElementarySchool: "
            break;
    }
}
function imageEvent(url,response){
    if(response.address.street === "253 W 108TH Pl")
        url.pop();
    document.getElementById("img").setAttribute('src',url[0]);
    limit = url.length;
    images = url;
    cnt = 1;
    if(idInterval !== undefined)
        clearInterval(idInterval);
    idInterval = setInterval(changeImage,2000);
}
function changeImage(){
    document.getElementById("img").setAttribute('src',images[cnt++]);
    if(cnt === limit)
        cnt = 0;
}
function createHeatMap(){
    var length = crimeObject.length;
    var heatMapData = [];
    for(var i = 0;i < length;++i){
        var location = createLocation(crimeObject[i][27],crimeObject[i][28]);
        heatMapData.push(location);
    }
    heatMap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
    });
    var gradient = [
        'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 0, 1)',
        'rgba(51, 47, 47, 1)',
        'rgba(32, 32, 32, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(223, 0, 0, 1)',
        'rgba(191, 0, 0, 1)',
        'rgba(159, 0, 0, 1)',
        'rgba(127, 0, 0, 1)',
        'rgba(92, 0, 0, 1)',
        'rgba(127, 3, 3, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatMap.set('gradient', heatMap.get('gradient') ? null : gradient);
    heatMap.setMap(null);
}
function hideHeatMap(){
    heatMap.setMap(null);
}
function hideCrimeMarkers(){
    var length = crimes.length;
    for(var i = 0;i < length;++i)
        hideMarker(crimes[i]);
}
function showCrimeMarkers(){
   var length = crimes.length;
    for(var i = 0;i < length;++i)
        showMarker(crimes[i]); 
}
function showHeatMap(){
    heatMap.setMap(map);
}
