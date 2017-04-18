// JavaScript Document
$(document).on('click', 'a', function(event){
	event.preventDefault();
	
	$('html, body').animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
	}, 600);
	
});


$('a.xbtn').click(function(e)
{
    e.preventDefault();
});