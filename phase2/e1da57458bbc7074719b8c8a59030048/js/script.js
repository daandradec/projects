var today = new Date();

$(document).on('ready', function() {

  $('.ui.sticky').sticky();
  $('.large.icon').popup();

});

$('.ui.map.button').on('click', function() {
  $(this).toggleClass('active');
});

$('.ui.visit.button').on('click', function() {
  $('#modal').modal('show');
  console.log('visit!');
});

$('.ui.card').on('click', function() {
  $('#modal').modal('show');
  console.log('card!');
});
