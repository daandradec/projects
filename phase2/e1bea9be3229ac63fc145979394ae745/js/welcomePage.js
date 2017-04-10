$(document).ready(function(){
    $("#startBtn").click(function(){
        $("#welcome").hide(1000);
        $("#all").show(1000, function(){
			initMap();
        });
    });
});

$(document).ready(function(){
    $("#textWelcome").mouseenter(function(){
        $(this).css('fontSize', '5.3vw');
    });

    $("#textWelcome").mouseleave(function(){
        $(this).css('fontSize', '5vw');
    });
});