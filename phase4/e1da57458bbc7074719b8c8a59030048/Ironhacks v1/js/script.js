$(document).ready( function() {

  $('.button').on('click', function() {
    $(this).toggleClass('active');
  });

  $('.ui.dropdown').dropdown();

  $('.ui.rating').rating();

  $('.card').popup({inline: true});

});
