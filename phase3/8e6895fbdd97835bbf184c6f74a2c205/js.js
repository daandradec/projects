/*jslint vars: true */
/*jslint devel: true */
/*jslint white: true */
/*global $ */
/*global document */
/*global google */

$(document).ready(function (){
"use strict";
     $("#go").click (function(){
		alert("have not implemented yet");
	});
    
    
    $('.mcheck').on('change', function() {
    $(this).closest(".list-group-item").find('.form-control').toggleClass("hidden");
    });
    
    

});

// end of ready function;

function jQ_append(id_of_input, text){
    var input_id = '#'+id_of_input;
    $(input_id).val($(input_id).val() + text);
}

function open_alert(){
    alert("second jquery fucntion! (By type)");
}




