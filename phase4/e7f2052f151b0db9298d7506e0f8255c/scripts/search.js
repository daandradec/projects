var min_lib=[,9999999]



function search(){
  if (document.getElementById("budget").value!=""){
    var options=[];
    var distance=document.getElementById("max_dist_home").value;
      if(distance!=""){
        document.getElementById("house_check").checked = false;
        houseHandler();
        var options=[];
        for(var key in houses){
          if(houses[key][0]<=distance){
            options.push([key,houses[key][0],houses[key][1]]);
            houses[key][2].setMap(map);
          }
        }
        options=options.sort(function(a, b) {
            return a[1] > b[1] ? 1 : -1;
        });
        if(options.length==0){
          var text="<h2>we could not find any renting house matching with your minimum distance to the university, this is the nearest option:</h2>"
                      +"<strong>Address: </strong>"+ min_dist[0].split('+').join(' ')+"<br>"
                      +"<strong>Property Name: </strong>"+ houses[min_dist[0]][3] +"<br>"
                      +"<strong>Phone: </strong>"+houses[min_dist[0]][4]+"<br>"
                      +"<strong>Price: </strong><div id="+'"'+"price"+'"'+">"+houses[min_dist[0]][1]+"</div><br>"
                      +"<strong>Distance to the university: </strong>"+min_dist[1]+" mi"+"<br>"
                      +"<h2>All your other options are marked on the map, feel free to click on them and see the information!</h2>";
        }
        else if (options.length==1) {
          var text="<h2>Your best option based on distancy to the university:</h2>"
                      +"<strong>Address: </strong>"+ options[0][0].split('+').join(' ')+"<br>"
                      +"<strong>Property Name: </strong>"+ houses[options[0][0]][3] +"<br>"
                      +"<strong>Phone: </strong>"+houses[options[0][0]][4]+"<br>"
                      +"<strong>Price: </strong><div id="+'"'+"price"+'"'+">"+options[0][2]+"</div><br>"
                      +"<strong>Distance to the university: </strong>"+options[0][1]+" mi"+"<br>"
                      +"<h2>All your other options are marked on the map, feel free to click on them and see the information!</h2>";
        }
        else{
          var text="<h2>Your best options based on distancy to the university:</h2>"
                      +"<h3>Option 1:</h3>"
                      +"<strong>Address: </strong>"+ options[0][0].split('+').join(' ')+"<br>"
                      +"<strong>Property Name: </strong>"+ houses[options[0][0]][3] +"<br>"
                      +"<strong>Phone: </strong>"+houses[options[0][0]][4]+"<br>"
                      +"<strong>Price: </strong><div id="+'"'+"price"+'"'+">"+options[0][2]+"</div><br>"
                      +"<strong>Distance to the university: </strong>"+options[0][1]+"mi"+"<br>"
                      +"<strong>Address: </strong>"+ options[1][0].split('+').join(' ')+"<br>"
                      +"<h3>Option 2:</h3>"
                      +"<strong>Property Name: </strong>"+ houses[options[1][0]][3] +"<br>"
                      +"<strong>Phone: </strong>"+houses[options[1][0]][4]+"<br>"
                      +"<strong>Price: </strong><div id="+'"'+"price"+'"'+">"+options[1][2]+"</div><br>"
                      +"<strong>Distance to the university: </strong>"+options[1][1]+" mi"+"<br>"
                      +"<h2>All your other options are marked on the map, feel free to click on them and see the information!</h2>";
        }
        document.getElementById("options_div").innerHTML=text;
    }
  }
}
