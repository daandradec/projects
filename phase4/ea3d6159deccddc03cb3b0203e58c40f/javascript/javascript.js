//document ready
$(function(){ 


    $("#distance").hide();
    $(".end").hide();
    $("#Capa_4").hide();
    reDraw();


//Next functions controlls the effects of the DOM
    
    //help button
    $(".help").click(function(){
        $(".dialog").dialog();

    })

    //weather button
    $(".weather").click(function(){
        $(".dialog").dialog();
    })
    

    //Click on arrow
    $("a.arrow").click(function(e){              
        e.preventDefault();     //evitar el eventos del enlace normal
        var strAncla=$(this).attr('href'); //id del ancla
            $('body,html').stop(true,true).animate({                
                scrollTop: $(strAncla).offset().top
            },1000);
    });


     //Click on "Click here"
    $("a.next").click(function(e){
        e.preventDefault();     //evitar el eventos del enlace normal
        var strAncla=$(this).attr('href'); //id del ancla
            $('body,html').stop(true,true).animate({                
                scrollTop: $(strAncla).offset().top
            },1000);
    });


    //green arrow hover
    $("#Capa_2").hover(
        function(){
            $("a.arrow").addClass("hvr-wobble-vertical");
            $("a.arrow").css("box-shadow", "-2px 5px 8px #9b9b9b");
            $(".cls-2").css("fill","#00703d");
        }, function(){
            $(".cls-2").css("fill","#00AB5D");
    });


    //click here hover
     $("#Capa_3").hover(
        function(){
            $(".cls-4").css("fill","#00703d");
        }, function(){
            $(".cls-4").css("fill","#00AB5D");
    });


    //scroll top
    var bool = true;
    $(window).scroll(function(){

        if($(window).scrollTop() == 0){
            $('.end').animate({
                height: 'toggle'
            });
            window.setTimeout(function(){
                $('.universities').hide();
            }, 100);
            $('#Capa_4').fadeOut();
            $('#Capa_1').fadeIn();
            $('#distance').fadeOut();
            bool = true;
        }else if($(window).scrollTop() > 0 && bool){
            $('.end').animate({
                height: 'toggle'
            });
            window.setTimeout(function(){
                $('.universities').show();
            }, 300);
            $('#Capa_4').fadeIn();
            $('#Capa_1').fadeOut();
            $('#distance').fadeIn();
            bool = false;
        }
    });


    //buttons of distance
    
    $("#near").click(function(){
        near();
    });

    $("#medium").click(function(){
        medium();
    });

    $("#medium2").click(function(){
        medium2();
    })

    $("#far").click(function(){
        far();
    }); 

    $("#all").click(function(){
        showAll();
    });
     

    //Loading content map

    var flag1 = false;
    $(".policeIcon").click(function(){
        if(!flag1){
            $(".policeIcon img").css("box-shadow", "-3px -3px");
            for (var i = 0; i < policeCoords.length; i++) {
                policeCoords[i].setMap(map);
            }
            flag1 = true;
        }else{
            $(".policeIcon img").css("box-shadow", "");
            setMapOnAll(policeCoords, null);
            flag1 = false;
        }
    })

     var flag2 = false;
    $(".libIcon").click(function(){
        if(!flag1){
            $(".libIcon img").css("box-shadow", "-3px -3px");
            for (var i = 0; i < librariesCoords.length; i++) {
                librariesCoords[i].setMap(map);
            }
            flag1 = true;
        }else{
             $(".libIcon img").css("box-shadow", "");
            setMapOnAll(librariesCoords, null);
            flag1 = false;
        }
    })

    var flag3 = false;
    $(".trafficIcon").click(function(){
        if(!flag3){
            $(".trafficIcon img").css("box-shadow", "-3px -3px");
            for (var i = 0; i < traficCoords.length; i++) {
                traficCoords[i].setMap(map);
            }
            flag3 = true;
        }else{
             $(".trafficIcon img").css("box-shadow", "");
            setMapOnAll(traficCoords, null);
            flag3 = false;
        }
    })

    var flag4 = false;
    $(".parkIcon").click(function(){
        if(!flag4){
            $(".parkIcon img").css("box-shadow", "-3px -3px");
            for (var i = 0; i < parksCoords.length; i++) {
                parksCoords[i].setMap(map);
            }
            flag4 = true;
        }else{
             $(".parkIcon img").css("box-shadow", "");
            setMapOnAll(parksCoords, null);
            flag4 = false;
        }
    })

    var flag5 = false;
    $(".bikeIcon").click(function(){
        if(!flag5){
            $(".bikeIcon img").css("box-shadow", "-3px -3px");
            for (var i = 0; i < cicleCoords.length; i++) {
                cicleCoords[i].setMap(map);
            }
            flag5 = true;
        }else{
             $(".bikeIcon img").css("box-shadow", "");
            setMapOnAll(cicleCoords, null);
            flag5 = false;
        }
    })


    loadWeather();
});
