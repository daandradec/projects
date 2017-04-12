

function policeHandler(){
  if(police_check.checked){
    for (var i = 0; i<markers[0].length; i++) {
      markers[0][i].setMap(map);
    }
   }
   else{
        for (var i = 0; i<markers[0].length; i++) {
          markers[0][i].setMap(null);
        }
   }
}
function clinicHandler(){
  if(clinic_check.checked){
    for (var i = 0; i<markers[3].length; i++) {
      markers[3][i].setMap(map);
    }
   }
   else{
        for (var i = 0; i<markers[3].length; i++) {
          markers[3][i].setMap(null);
        }
   }
}
function librarieHandler(){
  if(librarie_check.checked){
    for (var i = 0; i<markers[2].length; i++) {
      markers[2][i].setMap(map);
    }
   }
   else{
        for (var i = 0; i<markers[2].length; i++) {
          markers[2][i].setMap(null);
        }
   }
}
function fireHandler(){
  if(fire_check.checked){
    for (var i = 0; i<markers[1].length; i++) {
      markers[1][i].setMap(map);
    }
   }
   else{
     for (var i = 0; i<markers[1].length; i++) {
       markers[1][i].setMap(null);
     }
   }
}
function houseHandler(){
  if(house_check.checked){
    for (var i = 0; i<markers[4].length; i++) {
      markers[4][i].setMap(map);
    }
   }
   else{
     for (var i = 0; i<markers[4].length; i++) {
       markers[4][i].setMap(null);
     }
   }
}
