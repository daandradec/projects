var today = new Date();

$(document).on('ready', function() {

  $('.ui.sticky').sticky();
  $('.large.icon').popup();
  initMap();

});

$('.ui.map.button').on('click', function() {
  $(this).toggleClass('active');
});
