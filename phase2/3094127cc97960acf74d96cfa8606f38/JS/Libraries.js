var b = false;

function drawLibraries(){

  var libra = [];
		$.get("https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD", function ( data ){
			librariesObjects = data.data;

      for(var i = 0; i< librariesObjects.length;i++)
      {
        object = new objetcMarker(
          librariesObjects[i][18][1],librariesObjects[i][18][2],librariesObjects[i][8]
        );
        libra.push(object);
      }
      DrawMarkers(libra, "Images/library.png");

		} , "json");
}
