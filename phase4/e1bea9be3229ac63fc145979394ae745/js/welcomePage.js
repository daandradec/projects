$('#textWelcome').iid = setInterval(function() {
    var letters = '56789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor((Math.random() * 10) + 1)];
    }
    $('#textWelcome').css('color', color);
}, 850);

$(document).ready(function(){
    $("#startBtn").click(function(){
        $('.chart').hide(1000);
        $("#welcome").hide(1000);
        $("#all").show(1000, function(){
            $('#textWelcome').iid && clearInterval($('#textWelcome').iid);
            initBarChart();
            $(".chart").css("display", "none");
            initMap();
        });
    });
});


$(document).ready(function(){
    $('#textWelcome').bind('mouseenter', function() {
        $(this).css('fontSize', '5.3vw');
    }).bind('mouseleave', function(){
        $(this).css('fontSize', '5vw');
    });
});