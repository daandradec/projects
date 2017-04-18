$.ajax({
  url: 'data/942548.csv',
  dataType: 'text',
}).done(successFunction);

function successFunction(data) {
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();		
  var allRows = data.split(/r?n|r/);
  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
    var rowCells = allRows[singleRow].split(',');
    for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {

        table += rowCells[rowCell];
    }
  } 
}