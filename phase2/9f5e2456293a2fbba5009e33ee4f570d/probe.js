$(document).ready(function(){
  $.ajax({
    type:"GET",
    url:reqUrl,
    dataType:"jsonp",
    token:token,
    jsonpCallback:"resultHandler"
  });
});
function resultHandler(data){
  console.log(data.results);
}
