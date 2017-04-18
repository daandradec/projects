$(document).ready(main);

var menu = 1;
var weather = 1;

function main(){
    $('.menu_bar').click(function(){
        if(menu == 1){
            $('nav').animate({
               left: '0'
            });
            menu = 0;
        } else {
            menu = 1;
            $('nav').animate({
                left: '-100%'
            });
        }
    });
    
    $('#img-weather').click(function(){
        if(weather == 1){
            $('.box').animate({
                width: '400px'
            });
            $('.weather').animate({
                width: '300px',
                padding: '50px'
            });
            weather = 0;
        } else {
            weather = 1;
            $('.box').animate({
                width: '0px'
            });
            $('.weather').animate({
                width: '0px',
                padding: '0px'
            });
        }
    });
};
