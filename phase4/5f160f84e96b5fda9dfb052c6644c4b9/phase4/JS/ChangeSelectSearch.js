   //default
        $("#pInformation").html(
                            "    <i>How it works?:</i> <br> Affordable Rental Housing Developments Search Mode"
                            +" use the dataset provided by <a href=https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2>Data.gov</a> <br> " 
                            +"All prices shown are approximate per month, using as criteria the lowest rents found in the Community Area according to Zillow"
                    
                    );
        //when changes    
        $(document).ready(function(){
            $("#SelectSearchOption").change(function(){
                if(document.getElementById("SelectPlaceOption").disabled === false){
                    document.getElementById("SelectPlaceOption").options.length = 0;
                    document.getElementById("SelectPlaceOption").disabled = true;
                }
                var selectedSearchOption= document.getElementById("SelectSearchOption").selectedIndex;
                if(selectedSearchOption===0){
                    $("#pInformation").html(
                            "    <i>How it works?:</i> <br> Affordable Rental Housing Developments Search Mode"
                            +" use the dataset provided by <a href=https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2>Data.gov</a> <br> " 
                            +"All prices shown are approximate per month, using as criteria the lowest rental prices found in the Community Area according to Zillow"
                    
                    );
                    
                }
                if(selectedSearchOption===1){
                    $("#pInformation").html(
                            "    <i>How it works?:</i> <br> Community Area (Zone) Search Mode"
                            +" Use data gathered manually  based in rental prices for every Community Area In Chicago,IL <br> " 
                            +"All prices shown are approximate per month, using as criteria the average rental prices found in the Community Area according to Zillow"
                    
                    );
                    
                }

                
            });
        });
        