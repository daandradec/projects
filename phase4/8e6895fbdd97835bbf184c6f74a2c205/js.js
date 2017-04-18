/*jslint vars: true */
/*jslint devel: true */
/*jslint white: true */
/*global $ */
/*global document */
/*global google */
/*global remover */
/*global initHouse, rentaldata,addHouseMark, cleanMap, addMarkers, initCrimes,initClime, c3*/

var chartn=0;
$(document).ready(function (){
"use strict";
    initClime();
    initCrimes();
    $('#see').click(function(){
        appendResult();
        chart1();
    });
     $("#go").click (function(){
         cleanMap();
         $('#rsth').removeClass('hidden');
         var d=1;
         var value = 1000000;
         if ($('#DisFromCollege').is(":checked")){
             d=$('#input2').val();
         }
         if ($('#maxprice').is(":checked")){
             d=$('#maxprice').val();
         }
         initHouse(d,value);
        
	});

    $('.check').on('change', function() {
    $(this).closest(".list-group-item").find('.form-control').toggleClass("hidden"); 
    });
    
    $(document.body).on('click', '.result', function(){
        cleanMap();
        addMarkers($(this).attr('id'));
    });
    
    $(document.body).on('click', '#chart', function(){
       if(chartn===0){
           chart2();
           chartn=1;
       }
        else{
            chart1();
            chartn=0;
        }
    });
    
    $('#test').click(function(){
        console.log('tal vez');
    });
    
});

// end of ready function;

function jQ_append(id_of_input, text){
    var input_id = '#'+id_of_input;
    $(input_id).val($(input_id).val() + text);
}

function open_alert(){
    alert("The text boxes has to be filled ONLY with decimal numbers");
}

function appendResult(){
    $('.results').remove();
    $('.result').remove();
    $('#see').toggleClass('hidden');
    for (var i in rentaldata){
        var div = $('<div></div>');
        div.addClass('result jumbotron');
        var id='rst'+String(i);
        div.attr("id",id);
        var addres = $('<h3>'+ rentaldata[i][4].address+'</h3>');
        addres.appendTo(div);
        var cost = $('<div>Cost: $ '+rentaldata[i][5]+'</div>');
        cost.appendTo(div);
        var tel = $('<div>Tel: '+rentaldata[i][4].phone_number+'</div>');
        tel.appendTo(div);
        var nparks = $('<div>Near parks: '+rentaldata[i][0].length+'</div>');
        if ($('#parkDistance').is(":checked"))
        nparks.appendTo(div);
        var npoli = $('<div>Near police stations: '+rentaldata[i][1].length+'</div>');
        if ($('#policeDistance').is(":checked"))
        npoli.appendTo(div);
        var nbikes = $('<div>Near Divvy Bicycle Stations: '+rentaldata[i][2].length+'</div>');
        if ($(' #BicycleDistance').is(":checked"))
        nbikes.appendTo(div);
        var ncondoms = $('<div>Near Condom Distribution Sites: '+rentaldata[i][3].length+'</div>');
        if ($('#CondomDistance').is(":checked"))
        ncondoms.appendTo(div);
        $('#addResults').before(div);
        }
}

function appendClime(lastClime){
    var clima='';
    if (lastClime <15)
        clima='It seems that today it is not raining, you could look for a nearby park to exercise ;) ';
    else
        clima='It seems that today it is raining, you should look for a nearby Condom Distribution Site, just in case ( ͡° ͜ʖ ͡°) ';
    var panel= $('<div class=\"panel panel-info\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Weather today</h3></div><div class="panel-body">'+clima+'</div></div>');
    
    $('#map').after(panel);
    
}
