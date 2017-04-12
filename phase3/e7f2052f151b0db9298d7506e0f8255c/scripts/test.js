function funcion(){
 console.log("soy un boton :v");
  var xmlhttp = new XMLHttpRequest();
  var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqhq8duoln_3csw9&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";
  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader( 'Content-Type', 'application/json' );
  xmlhttp.header('Access-Control-Allow-Origin: *');
  xmlhttp.send();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      var info = JSON.parse(text);
      console.log(info);
    }

} 
}
