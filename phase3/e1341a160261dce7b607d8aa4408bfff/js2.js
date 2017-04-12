$(document).ready(function(){
  $("#id_btnt2").click(function(){
    $.ajax({
      type:"GET",
      url:"https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD",
      dataType:"jsonp",
      jsonpCallback:"resultHandler"
    });
  });
});

function resultHandler(){

}
