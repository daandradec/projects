
//SelectCrimeRadius
$(document).ready(function(){
    $("#checkboxCrimeRadius").click(function(){
        var Checked =  document.getElementById("checkboxCrimeRadius").checked; 
        if(Checked === true){
            document.getElementById("SelectCrimeRadius").disabled= false;
        }else{
            document.getElementById("SelectCrimeRadius").disabled= true;
            document.getElementById("SelectCrimeRadius").selectedIndex = 0;
        }
    });
    
});