//Evaluations return 9 values, the high value returned, the better it is
//score for police stations
function evaluatePolice(){
  //console.log("police eval");
if(nearPoliceStations.length===1){
    return 50;
  }
  else if(nearPoliceStations.length===2){
    return 70;
  }
  else if(nearPoliceStations.length>2 && nearPoliceStations.length<=5){
    return 90;
  }
  else if(nearPoliceStations.length>5){
    return 100;
  }
  else{
    return 0;
  }
}
//score for fire stations
function evaluateFire(){
  //console.log("fire eval");
if(nearFireStations.length===1){
  return 50;
}
else if(nearFireStations.length===2){
  return 90;
}
else if(nearFireStations.length>2){
  return 100;
}
else {
  return 0;
}
}
//score for near clinics
function evaluateClinics(){
  //console.log("clinics eval");
if(nearClinics.length===1){
  return 50;
}
else if(nearClinics.length===2){
  return 90;
}
else if(nearClinics.length>2){
  return 100;
}
else {
  return 0;
}
}
//score for near produce carts
function evaluateCarts(){
  //console.log("carts eval");
if(nearCarts.length===1){
  return 50;
}
else if(nearCarts.length===2){
  return 90;
}
else if(nearCarts.length>2){
  return 100;
}
else {
  return 0;
}
}
//score for near libraries
function evaluateLibraries(){
  //console.log("libs eval");
if(nearLibraries.length>=1 || nearLibraries.length<=5){
  return 50;
}
else if(nearLibraries.length>5 || nearLibraries.length<=15){
  return 90;
}
else if(nearLibraries.length>15){
  return 100;
}
else {
  return 0;
}
}
//score for near parks
function evaluateParks(){
  //console.log("parks eval");
if(nearParks.length>=1 || nearParks.length<=5){
  return 50;
}
else if(nearParks.length>5 || nearParks.length<=25){
  return 90;
}
else if(nearParks.length>25){
  return 100;
}
else {
  return 0;
}
}
//score for near bici parks
function evaluateBici(){
  //console.log("bici eval");
if(nearBiciStations.length>=1 || nearBiciStations.length<=8){
  return 50;
}
else if(nearBiciStations.length>8 || nearBiciStations.length<=30){
  return 90;
}
else if(nearBiciStations.length>30){
  return 100;
}
else {
  return 0;
}
}
//score for near crimes
function evaluateCrimes(){
  //console.log("crimes eval");
if(nearCrimes.length<3){
  return 100;
}
else if(nearCrimes.length>=3 || nearCrimes.length<=5){
  return 70;
}
else if(nearCrimes.length>5 || nearCrimes.length<=10){
  return 20;
}
else {
  return 0;
}
}
//score for near traffic performance
function evaluateTraffic(){
  //console.log("traffic eval");
  if (nearTraffic[0]>=10 || nearTraffic[0]<=15){
    return 40;
  }
  else if (nearTraffic[0]>15 || nearTraffic[0]<=19){
    return 60;
  }
  else if(nearTraffic[0]>19 || nearTraffic[0]<=25){
    return 80;
  }
  else if(nearTraffic[0]>25 ){
    return 100;
  }
  else{
    return 0;
  }
}
//Average Score of rental house
function averageEval(){
  sum = Number(evaluateTraffic()+evaluateCrimes()+evaluateBici()+evaluateParks()
  +evaluateCarts()+evaluateFire()+evaluateLibraries()+evaluateClinics()
    +evaluatePolice());
  return Number(sum/9);
}



//code for draw evaluation bar chart
function drawChart(){
var data = [{"category":"Police Station","quantity":evaluatePolice()},
{"category":"Fire Station","quantity":evaluateFire()},
{"category":"Clinics","quantity":evaluateClinics()},
{"category":"Parks","quantity":evaluateParks()},
{"category":"Crimes","quantity":evaluateCrimes()},
{"category":"Traffic","quantity":evaluateTraffic()},
{"category":"Bici Park","quantity":evaluateBici()},
{"category":"Library","quantity":evaluateLibraries()},
{"category":"Food Carts","quantity":evaluateCarts()}];

//Bounds of chart

var margin = {top:10, right:10, bottom:50, left:10};
var width = 400 - margin.left - margin.right;
var height = 278 - margin.top - margin.bottom;
var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .03)
var yScale = d3.scale.linear().range([height, 0]);

//Declaration and setting orientation
var xAxis = d3.svg.axis()
.scale(xScale)
.orient("bottom");


var yAxis = d3.svg.axis()
.scale(yScale)
.orient("left");
//bar chart container
var svgContainer = d3.select("#dc3").append("svg")
.attr("width", width+margin.left + margin.right)
.attr("height",height+margin.top + margin.bottom)
.append("g").attr("class", "container")
.attr("transform", "translate("+ margin.left +","+ margin.top +")");
 //setting x and y scales
xScale.domain(data.map(function(d) { return d.category; }));
yScale.domain([0, d3.max(data, function(d) { return d.quantity; })]);


var xAxis_g = svgContainer.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + (height) + ")")
.call(xAxis)
.selectAll("text");

//Append the bar chart
svgContainer.selectAll(".bar")
.data(data)
.enter()
.append("rect")
.attr("class", "bar")
.attr("x", function(d) { return xScale(d.category); })
.attr("width", xScale.rangeBand())
.attr("height",0 )
.transition()
.duration(4000)
.attr("y", function(d) { return yScale(d.quantity); })
.attr("height", function(d) { return height - yScale(d.quantity);
})

// Controls the text labels at the top of each bar.
svgContainer.selectAll(".text")
.data(data)
.enter()
.append("text")
.attr("class","label")
.attr("x", (function(d) { return xScale(d.category) + xScale.rangeBand() / 2 ; }  ))
.attr("y", function(d) { return yScale(d.quantity) + 1;
})
.attr("dy", "0.75em")
.text(function(d) { return d.quantity;
});
 //control display of bottom description on each bar
svgContainer.select('.x.axis').call(xAxis.orient('bottom')).selectAll("text").attr("y",10).call(wrap, xScale.rangeBand());

}
//function to control the text display of bottom of each bar
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
    words = text.text().split(/\s+/).reverse(),
    word,
    line = [],
    lineNumber = 0,
    lineHeight = 1.1,
    y = text.attr("y"),
    dy = parseFloat(text.attr("dy")),
    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

//calculate rental cost based on Units and Chicago rental media of 1600 for 2017
function calculateRental(Units){
if (Number(Units-medianUnits)<Number(0-unit10)){
  return "Less than 1600";
}
else if(Number(Units-medianUnits)>=Number(0-unit10) && Number(Units-medianUnits)<=unit10){
  return "Close to 1600";
}
else return "More than 1600";
}

// tables
//table with information of clicked house
function mainTable(key){
  var dates = [];
  $('#table1').html("");
  var arrays = [];
  for (var i =0;i<9;i++){
  arrays.push(washedData[key][i]);
}
arrays.push(calculateRental(washedData[key][3]));
dates.push(arrays);
var thead = d3.select("#table1").selectAll("th")
.data(["House Name","Phone Number","Address","Units","Community Area Number","Managment Company","Latitude","longitude",
"Distance to the University (m)","Possible Rental Cost (US)"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table1").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}

//function to set the other information tables based on user's click
function setTable(theData,button){
  var dates = [];

  $('#table2').html("");

  for (var i  in theData){
    var arrays = [];
    if (button==='b1'){
    arrays.push(parksData[i][0]);
    arrays.push(parksData[i][1]);
    arrays.push(parksData[i][2]);
  }
    else if (button==='b2'){
    arrays.push(cartsData[i][0]);
    arrays.push(cartsData[i][1]);
    arrays.push(cartsData[i][2]);
    }
    else if (button==='b3'){
    arrays.push(crimesData[i][0]);
    arrays.push(crimesData[i][1]);
    arrays.push(crimesData[i][2]);
    arrays.push(crimesData[i][3]);
    }
    else if (button==='b4'){
    arrays.push(clinicsData[i][0]);
    arrays.push(clinicsData[i][1]);
    arrays.push(clinicsData[i][2]);
    arrays.push(clinicsData[i][3]);
    arrays.push(clinicsData[i][4]);
    }
    else if (button==='b5'){
    arrays.push(librariesData[i][0]);
    arrays.push(librariesData[i][1]);
    arrays.push(librariesData[i][2]);
    arrays.push(librariesData[i][3]);
    arrays.push(librariesData[i][4]);
    arrays.push(librariesData[i][5]);
    }
    else if (button==='b6'){
    arrays.push(fireStationsData[i][0]);
    arrays.push(fireStationsData[i][1]);
    arrays.push(fireStationsData[i][4]);
    arrays.push(fireStationsData[i][5]);
    arrays.push(fireStationsData[i][6]);
    }
    else if (button==='b7'){
    arrays.push(policeStationsData[i][0]);
    arrays.push(policeStationsData[i][1]);
    arrays.push(policeStationsData[i][2]);
    arrays.push(policeStationsData[i][3]);
    arrays.push(policeStationsData[i][4]);
    arrays.push(policeStationsData[i][5]);
    }
    else if (button==='b8'){
    arrays.push(biciStationsData[i][0]);
    arrays.push(biciStationsData[i][1]);
    arrays.push(biciStationsData[i][2]);
    arrays.push(biciStationsData[i][3]);
    arrays.push(biciStationsData[i][4]);
    arrays.push(biciStationsData[i][5]);
    arrays.push(biciStationsData[i][6]);
    }
    dates.push(arrays);
  }

  // create the table header
var thead;

if (button==='b1'){
  $('#infoTable').text("Near Parks Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["Latitude","Longitude","Name"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
else if (button==='b2'){
    $('#infoTable').text("Near Carts Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["Latitude","Longitude","Address"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
else if (button==='b3'){
    $('#infoTable').text("Near Crimes Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["IUCR","Description","Latitude","Longitude"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
else if (button==='b4'){
    $('#infoTable').text("Near Clinics Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["Latitude","Longitude","Availability","Type Of Clinic","Telephone"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
else if (button==='b5'){
    $('#infoTable').text("Near Libraries Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["Latitude","Longitude","Availability","Telephone","Name","Address"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
else if (button==='b6'){
    $('#infoTable').text("Near Fire Stations Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["Name","Address","ZipCode","Engine","Location"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
else if (button==='b7'){
    $('#infoTable').text("Near Police Stations Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["Latitude","Longitude","Site","Address","Telephone","Fax"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
else if (button==='b8'){
    $('#infoTable').text("Near Bici Stations Data");
  var thead = d3.select("#table2").selectAll("th")
.data(["Latitude","Longitude","Disponibility","Capacity","Docks Available","Name","Address"])
.enter().append("th").text(function(d) { return d; });
console.log(dates);
var tr = d3.select("#table2").selectAll("tr")
.data(dates).enter().append("tr");
tr.attr("class", function(d, i){ if (i++ % 2 === 0){return 'row-even'}else {return 'row-odd'}});
// cells
var td = tr.selectAll("td")
.data(function(d){return d3.values(d)})
.enter().append("td")
.text(function(d) {return d});
}
}


//Click listener to select and Fill tables with data
$('#b1').on('click',function(){
  setTable(nearParks,'b1');
});
$('#b2').on('click',function(){
  setTable(nearCarts,'b2');
});
$('#b3').on('click',function(){
  setTable(nearCrimes,'b3');
});
$('#b4').on('click',function(){
  setTable(nearClinics,'b4');
});
$('#b5').on('click',function(){
  setTable(nearLibraries,'b5');
});
$('#b6').on('click',function(){
  setTable(nearFireStations,'b6');
});
$('#b7').on('click',function(){
  setTable(nearPoliceStations,'b7');
});
$('#b8').on('click',function(){
  setTable(nearBiciStations,'b8');
});
