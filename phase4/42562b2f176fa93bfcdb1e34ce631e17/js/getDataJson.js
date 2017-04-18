var uLat = 41.8708;
var uLong = -87.6505;

// function to get data of nearby schools
function dispDataSchools(url, table) {
  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rowF = '<tr>';
      var cLat = x[17];
      var cLong = x[18];
      var d = calcCrow(uLat, uLong, cLat, cLong)
      if (d <= 3.11){
        rowF += '<td>' + x[9]+ '</td>';
        rowF += '<td>' + x[12]+ '</td>';
        rowF += '<td>' + Math.round(d)+'Km' + '</td>';
      } else {
        rowF = '';
      }
      rowF += '</tr>';
      $(table).append(rowF);
    });
  });
}

// function to get data of nearby fire stations
function dispDataFStation(url, table) {
  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rowF = '<tr>';
      var cLat = x[14][1];
      var cLong = x[14][2];
      var d = calcCrow(uLat, uLong, cLat, cLong)
      if (d <= 3.11){
        rowF += '<td>' + x[9]+ '</td>';
        rowF += '<td>' + Math.round(d)+'Km' + '</td>';
      } else {
        rowF = '';
      }
      rowF += '</tr>';
      $(table).append(rowF);
    });
  });
}

// function to get data of nearby public health clinics
function dispDataHClinics(url, table) {
  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rowF = '<tr>';
      var cLat = x[27];
      var cLong = x[28];
      var d = calcCrow(uLat, uLong, cLat, cLong)
      if (d <= 6.22){
        rowF += '<td>' + x[8]+ '</td>';
        rowF += '<td>' + x[9]+ '</td>';
        rowF += '<td>' + x[11]+ '</td>';
        rowF += '<td>' + x[12]+ '</td>';
        rowF += '<td>' + Math.round(d)+'Km' + '</td>';
      } else {
        rowF = '';
      }
      rowF += '</tr>';
      $(table).append(rowF);
    });
  });
}

// function to get data of nearby libraries
function dispDataLibs(url, table) {
  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rowF = '<tr>';
      var cLat = x[18][1];
      var cLong = x[18][2];
      var d = calcCrow(uLat, uLong, cLat, cLong)
      if (d <= 6.22){
        rowF += '<td>' + x[8]+ '</td>';
        rowF += '<td>' + x[12]+ '</td>';
        rowF += '<td>' + x[9]+ '</td>';
        rowF += '<td>' + Math.round(d)+'Km' + '</td>';
      } else {
        rowF = '';
      }
      rowF += '</tr>';
      $(table).append(rowF);
    });
  });
}

// function to get data of nearby police stations
function dispPolSt(url, table) {
  $.getJSON(url, function(result){
    $.each(result.data, function(i, x){
      var rowF = '<tr>';
      var cLat = x[20];
      var cLong = x[21];
      var d = calcCrow(uLat, uLong, cLat, cLong)
      if (d <= 6.22){
        rowF += '<td>' + x[9]+ '</td>';
        rowF += '<td>' + x[10]+ '</td>';
        rowF += '<td>' + Math.round(d)+'Km' + '</td>';
      } else {
        rowF = '';
      }
      rowF += '</tr>';
      $(table).append(rowF);
    });
  });
}
