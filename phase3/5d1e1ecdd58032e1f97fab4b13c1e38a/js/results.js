//behavior for some elements

var fieldContent;

function showResults() {

    fieldContent = document.getElementById("Ultra").value;



    if (fieldContent == 1) {

        location.href = "safety_query.html#map";




    } else if (fieldContent == 2) {


        location.href = "price_query.html#map";

    }


}