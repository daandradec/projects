$(function() {
  hideandshow($("#searchbox"),$("#search-bar"),300);
});

function hideandshow(e,n,a) {
  var c=!1;
  e.click(function(e) {
    c?n.slideUp(a):n.slideDown(a);
    c=!c;
    e.preventDefault();
  })
}