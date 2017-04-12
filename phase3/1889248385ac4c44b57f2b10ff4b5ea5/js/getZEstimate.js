function getZestimate(address,csz,citystatezip){
var xmlhttp = new XMLHttpRequest();

    var userdata = "address="+address+"&csz="+csz;

    xmlhttp.open("POST","http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=$csz&address=$address&citystatezip=$citystatezip",true);

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            retrieve = JSON.parse(xmlhttp.responseText);
            document.getElementById("zillowP").innerHTML = retrieve[0]               
        }
        else{
            document.getElementById("zillowP").innerHTML = "Error!"
        }
    }

    xmlhttp.send(userdata);
    document.getElementById("zillowP").innerHTML = "Generating...";

    return false;
}